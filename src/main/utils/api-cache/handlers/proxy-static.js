import store from "@store";

const DEFAULT_STATIC_ENDPOINT = 'https://anilibriaqt.anilib.top'

export default function (cacheManager) {
  return async (req, res) => {
    try {
      if (!req.query.url) {
        return res.status(400)
          .json({ error: 'URL parameter is required' });
      }

      let parsedUrl;
      const configuredStaticEndpoint = store.getters['app/settings/system/staticEndpoint']?.trim?.()
      const staticEndpoint = configuredStaticEndpoint || DEFAULT_STATIC_ENDPOINT

      try {
        parsedUrl = new URL(staticEndpoint + req.query.url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          return res
            .status(400)
            .json({ error: 'Only HTTP/HTTPS URLs are allowed' });
        }
      } catch (e) {
        return res
          .status(400)
          .json({ error: 'Invalid URL format' });
      }

      const cacheName = await cacheManager.getCacheKey(parsedUrl.toString());
      const { meta, buf, fromCache } = await cacheManager.getCache(cacheName, parsedUrl.toString());

      const headers = new Headers({
        'content-type': meta.headers['content-type'],
        'x-cache-hit': fromCache ? 'true' : 'false',
        'x-cache-age': fromCache ? `${Date.now() - meta.timestamp}ms` : '0'
      })

      res
        .set(Object.fromEntries(headers.entries()))
        .status(meta.status)
        .send(buf);
    } catch (e) {
      console.error('Proxy error:', e);
      res
        .status(500)
        .json({
          error: 'Internal Server Error',
          details: e.message
        });
    }
  }
}
