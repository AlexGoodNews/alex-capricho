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
        const adminUrl = '${url.origin}/admin/#access_token=${tokenData.access_token}&token_type=bearer';

        if (window.opener) {
            console.log("Tengo un window.opener:", window.opener);
            console.log("Redirigiendo al admin con token:", adminUrl);

            window.opener.location.href = adminUrl;
            console.log("Intentando cerrar el popup...");
            window.close();
        } else {
            console.log("No hay window.opener, redirigiendo el mismo popup al admin");
            window.location.href = adminUrl;
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