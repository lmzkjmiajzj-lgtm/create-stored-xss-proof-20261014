import { getStore } from '@netlify/blobs';

const STORE = 'create-page-load-proof-20261014-v1';
const KEY = 'latest';
const CREATE_ORIGIN = 'https://create.netlify.com';
const transparentGif = Uint8Array.from(
  Buffer.from('R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', 'base64')
);

const noStore = {
  'cache-control': 'no-store, max-age=0',
  'x-content-type-options': 'nosniff'
};

export default async (request) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get('mode') || 'status';
  const store = getStore(STORE);

  if (mode === 'status') {
    const record = await store.get(KEY, { type: 'json' });
    return Response.json(record || { seen: false }, {
      headers: {
        ...noStore,
        'access-control-allow-origin': '*'
      }
    });
  }

  if (mode !== 'mark') {
    return Response.json({ error: 'unsupported mode' }, { status: 400, headers: noStore });
  }

  // The marker is created in the top-level Create document by the injected
  // custom control. Persist only a fixed harmless proof record; no account
  // data, cookies, tokens, DOM text, or URL query values are collected.
  const referer = request.headers.get('referer') || '';
  let refererOrigin = '';
  try {
    refererOrigin = new URL(referer).origin;
  } catch {}
  if (refererOrigin !== CREATE_ORIGIN) {
    return new Response('forbidden', { status: 403, headers: noStore });
  }

  const executionId = url.searchParams.get('executionId') || '';
  const projectId = url.searchParams.get('projectId') || '';
  if (!/^[0-9a-f-]{36}$/i.test(executionId) || !/^[0-9a-f]{24}$/i.test(projectId)) {
    return new Response('invalid marker', { status: 400, headers: noStore });
  }

  const record = {
    seen: true,
    executionId,
    projectId,
    createOrigin: refererOrigin,
    fetchSite: request.headers.get('sec-fetch-site') || null,
    fetchDest: request.headers.get('sec-fetch-dest') || null,
    observedAt: new Date().toISOString()
  };
  await store.setJSON(KEY, record);

  return new Response(transparentGif, {
    headers: {
      ...noStore,
      'content-type': 'image/gif'
    }
  });
};
