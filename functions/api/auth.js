
export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    const client_id = env.GITHUB_CLIENT_ID;

    try {
        const url = new URL(request.url);
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        redirectUrl.searchParams.set(
            'state',
            crypto.getRandomValues(new Uint8Array(12)).join(''),
        );
        return Response.redirect(redirectUrl.href, 301);

    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
        });
    }
}

/*
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const client_id = env.GITHUB_CLIENT_ID;
  const client_secret = env.GITHUB_CLIENT_SECRET;

  // 1. Si NO hay "callback", redirigimos a GitHub
  if (!url.searchParams.has("callback")) {
    const redirectUrl = new URL("https://github.com/login/oauth/authorize");
    redirectUrl.searchParams.set("client_id", client_id);
    redirectUrl.searchParams.set("redirect_uri", url.origin + "/api/auth?callback=1");
    redirectUrl.searchParams.set("scope", "repo user");
    redirectUrl.searchParams.set(
      "state",
      crypto.getRandomValues(new Uint8Array(12)).join("")
    );

    return Response.redirect(redirectUrl.href, 302);
  }

  // 2. Si hay "callback", GitHub nos envía el "code"
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  // 3. Intercambiar code por access_token
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id,
      client_secret,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();
  const token = tokenData.access_token;

  if (!token) {
    return new Response("OAuth failed", { status: 401 });
  }

  // 4. Obtener datos del usuario autenticado
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "Cloudflare OAuth",
    },
  });

  const user = await userResponse.json();

  // 5. Validar usuario permitido
  const allowedUsers = ["AlexGoodNews"]; // <-- aquí pones tu GitHub o el del cliente

  if (!allowedUsers.includes(user.login)) {
    return new Response("Unauthorized", { status: 403 });
  }

  // 6. Devolver token a Decap CMS
  return new Response(
    `
    <html>
      <body>
        <script>
          (function () {
            const token = "${token}";
            const adminUrl = "${url.origin}/admin/#access_token=" + token + "&token_type=bearer";

            if (window.opener) {
              window.opener.location.href = adminUrl;
              window.close();
            } else {
              window.location.href = adminUrl;
            }
          })();
        </script>
      </body>
    </html>
    `,
    { headers: { "Content-Type": "text/html" } }
  );
}
*/
//creo que funciona