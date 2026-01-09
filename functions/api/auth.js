export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Paso 1: redirigir a GitHub
  if (url.pathname.endsWith("/auth")) {
    const redirectUri = `${url.origin}/api/auth/callback`;

    const githubAuthUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${env.GITHUB_CLIENT_ID}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=repo`;

    return Response.redirect(githubAuthUrl, 302);
  }

  // Paso 2: callback de GitHub
  if (url.pathname.endsWith("/callback")) {
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("No code provided", { status: 400 });
    }

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return new Response("OAuth failed", { status: 401 });
    }

    // Decap espera el token en el hash
    return new Response(
    `
    <html>
        <body>
        <script>
            (function () {
            const token = "${tokenData.access_token}";
            const url = "/admin/#access_token=" + token + "&token_type=bearer";

            if (window.opener) {
                window.opener.location.href = url;
                window.close();
            } else {
                window.location.href = url;
            }
            })();
        </script>
        </body>
    </html>
    `,
    {
        headers: {
        "Content-Type": "text/html",
        },
    }
    );

  }

  return new Response("Not found", { status: 404 });
}