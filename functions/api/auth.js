/*
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
*/

export async function onRequest(context) {
    const { request, env } = context;

    try {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');
        if (!code) throw new Error("No code");

        // Intercambia code por token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_CLIENT_SECRET,
                code
            })
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        if (!accessToken) throw new Error("No access token");

        // Consulta al usuario autenticado
        const userResponse = await fetch('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const userData = await userResponse.json();

        // ✅ Solo permitimos tu usuario específico
        const ALLOWED_USER = 'AlexGoodNews'; // <- reemplaza con tu login
        if (userData.login !== ALLOWED_USER) {
            return new Response('No autorizado', { status: 403 });
        }

        // Todo bien, devuelve lo que ya tenías configurado
        return new Response(JSON.stringify({ accessToken, user: userData.login }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error(err);
        return new Response(err.message, { status: 500 });
    }
}
