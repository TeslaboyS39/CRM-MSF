// Cloudflare Pages Function - Supabase Proxy
// Credentials are read from environment variables (hidden from client)

export async function onRequest(context) {
    const { request, env } = context;

    // Get credentials from Cloudflare environment variables
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        return new Response(JSON.stringify({ error: 'Server configuration error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get the path after /api/
    const url = new URL(request.url);
    const supabasePath = url.pathname.replace('/api', '') || '/';
    const supabaseUrl = `${SUPABASE_URL}/rest/v1${supabasePath}${url.search}`;

    // Forward the request to Supabase
    const headers = new Headers(request.headers);
    headers.set('apikey', SUPABASE_ANON_KEY);
    headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`);

    try {
        const response = await fetch(supabaseUrl, {
            method: request.method,
            headers: headers,
            body: request.method !== 'GET' && request.method !== 'HEAD'
                ? await request.text()
                : undefined
        });

        const data = await response.text();

        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Prefer'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Proxy error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Handle CORS preflight
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Prefer'
        }
    });
}
