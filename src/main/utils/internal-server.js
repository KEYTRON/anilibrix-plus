import path from 'path';
import { app } from 'electron';

import express from 'express';
import expressProxy from 'express-http-proxy';
import multer from 'multer';
import getPort from 'get-port';

import { APICacheService } from './api-cache/api-cache-service';
import { APIController } from './api-cache/api-cache-controller';
import { CacheManager } from './api-cache/cache-manager';

import mainEndpoint from './api-cache/handlers/api-main-endpoint';
import lazyRutube from './api-cache/handlers/lazy-rutube';
import lazyVideo from './api-cache/handlers/lazy-video';
import proxyStatic from './api-cache/handlers/proxy-static';

const server = express()
server.disable('x-powered-by')

const mediaCachePath = path.join(app.getPath('userData'), 'media-cache')
const apiCachePath = path.join(app.getPath('userData'), 'api-cache')
const cacheManager = new CacheManager(mediaCachePath)
const cacheService = new APICacheService(apiCachePath);

global.apiCacheService = cacheService

export async function initInternalServer () {
  const apiController = new APIController(cacheService);
  server.get('/proxy-static', proxyStatic(cacheManager));
  server.post('/public/api/index.php', multer().none(), mainEndpoint(apiController, cacheService));
  server.get('/rutube/:id/*', lazyRutube)
  server.get('/hls/:url', lazyVideo)
  
  server.all('/', (req, res) => res.send('Hello from Anilibrix Plus!'))

  // Mirror Set-Cookie value into a regular header so the renderer (where browsers
  // hide Set-Cookie from JS even with webSecurity: false) can read PHPSESSID.
  // HTTP headers can't contain raw newlines, so base64-encode multi-cookie values.
  const exposeSetCookie = {
    userResHeaderDecorator (headers) {
      const sc = headers['set-cookie']
      if (sc && sc.length) {
        const joined = Array.isArray(sc) ? sc.join('\n') : String(sc)
        headers['x-set-cookie-b64'] = Buffer.from(joined, 'utf8').toString('base64')
        headers['access-control-expose-headers'] = 'x-set-cookie-b64'
      }
      return headers
    }
  }

  server.get('/public/torrent/download.php', expressProxy(apiController.endpoint))
  server.post('/public/login.php', expressProxy(apiController.endpoint, exposeSetCookie))
  server.post('/public/logout.php', expressProxy(apiController.endpoint, {
    ...exposeSetCookie,
    userResDecorator: function (proxyRes, proxyResData) {
      apiController.clearUserData()
      return proxyResData
    }
  }))

  await cacheManager.initialize()
  await cacheService.initialize()
  const port = await getPort()
  server.listen(port)

  return port
}
