export default function (apiController, cacheService) {
  return async (req, res, next) => {
    try {
      const { query } = req.body;
      // Renderer can't set Cookie directly — it sends session via X-PHPSESSID.
      const sessionFromHeader = req.get('x-phpsessid') || null
      console.log('[api] query=', query, 'session=', sessionFromHeader ? sessionFromHeader.slice(0,8)+'...' : 'NONE', 'body keys=', Object.keys(req.body || {}))

      if (['user', 'favorites'].includes(query)) {
        let response = null
        if (query === 'favorites' && req.body.action) {
          console.log('Favorites action received', req.body)
          response = await apiController.handleFavoritesProxy(req.body.action, req.body.id, sessionFromHeader)
        } else {
          response = await apiController.handleProxyWithCache(query, {
            ...req.body
          }, sessionFromHeader)
        }

        if (query === 'favorites' && !response.error && !req.body.action) {
          await cacheService.ensureInitialized()
          response.data.items.forEach((v, i) => {
            v.total_series = cacheService.releases.get(v.id)?.series || '(0)'
          })
        }

        console.log('[api] response for', query, '→ keys:', Object.keys(response || {}), 'err?:', response?.error, 'sample:', JSON.stringify(response).slice(0, 300))

        if (response.error) {
          res.status(400).send(response);
        } else {
          res.send(response);
        }

        return
      }

      if (!['list', 'release', 'catalog', 'random_release', 'search', 'years', 'genres'].includes(query)) {
        res.status(404).send({
          error: 'Endpoint not found',
          status: false
        });

        return
      }

      const response = await apiController.handleRequest(req.body, query);

      if (response.error) {
        res.status(400).send(response);
      } else {
        res.send(response);
      }
    } catch (e) {
      console.error('[api] CATCH 400 — query:', req?.body?.query, '— err:', e?.message, '\n', e?.stack)
      res.status(400).send({
        error: 'Internal server error',
        status: false
      });
    }
  }
}
