// Supabase Proxy Client
// Drop-in replacement that routes through Cloudflare Function
// Credentials stay server-side

const createProxyClient = () => {
    const baseUrl = '/api';

    const buildQuery = (params) => {
        const query = new URLSearchParams();
        if (params.select) query.set('select', params.select);
        if (params.order) query.set('order', params.order);
        if (params.limit) query.set('limit', params.limit);
        if (params.filters) {
            params.filters.forEach(f => query.set(f.column, `${f.op}.${f.value}`));
        }
        return query.toString();
    };

    const request = async (path, options = {}) => {
        const res = await fetch(`${baseUrl}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Prefer': options.prefer || '',
                ...options.headers
            }
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
            return { data: null, error: { message: data?.message || res.statusText } };
        }
        return { data, error: null };
    };

    const from = (table) => {
        let params = { select: '*', filters: [], order: null, limit: null };
        let method = 'GET';
        let body = null;

        const chain = {
            select: (columns = '*') => {
                params.select = columns;
                return chain;
            },
            insert: (rows) => {
                method = 'POST';
                body = Array.isArray(rows) ? rows : [rows];
                return chain;
            },
            update: (data) => {
                method = 'PATCH';
                body = data;
                return chain;
            },
            delete: () => {
                method = 'DELETE';
                return chain;
            },
            eq: (column, value) => {
                params.filters.push({ column, op: 'eq', value });
                return chain;
            },
            neq: (column, value) => {
                params.filters.push({ column, op: 'neq', value });
                return chain;
            },
            order: (column, { ascending = true } = {}) => {
                params.order = `${column}.${ascending ? 'asc' : 'desc'}`;
                return chain;
            },
            limit: (count) => {
                params.limit = count;
                return chain;
            },
            single: () => {
                params.limit = 1;
                chain._single = true;
                return chain;
            },
            then: async (resolve, reject) => {
                try {
                    let path = `/${table}`;
                    const queryParts = [];

                    if (params.select) queryParts.push(`select=${params.select}`);
                    if (params.order) queryParts.push(`order=${params.order}`);
                    if (params.limit) queryParts.push(`limit=${params.limit}`);
                    params.filters.forEach(f => {
                        queryParts.push(`${f.column}=${f.op}.${f.value}`);
                    });

                    if (queryParts.length) path += '?' + queryParts.join('&');

                    const options = { method };
                    if (body) options.body = JSON.stringify(body);
                    if (method === 'POST') options.headers = { 'Prefer': 'return=representation' };
                    if (method === 'PATCH' || method === 'DELETE') {
                        options.headers = { 'Prefer': 'return=representation' };
                    }

                    const result = await request(path, options);

                    if (chain._single && result.data) {
                        result.data = result.data[0] || null;
                    }

                    resolve(result);
                } catch (err) {
                    reject ? reject(err) : resolve({ data: null, error: err });
                }
            }
        };
        return chain;
    };

    return { from };
};

// Create global instance
const supabaseClient = createProxyClient();
