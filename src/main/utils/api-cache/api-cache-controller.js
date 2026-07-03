import { APIResponseTransformer } from './api-release-transformer'
import store from '@store';
import FormData from 'form-data'
import { net } from 'electron'

// Use Electron's net.fetch (Chromium net stack) — same fingerprint as
// curl/browser, avoids Node undici TLS/HTTP2 quirks that cause ECONNRESET.
const catGirlFetch = (url, init) => net.fetch(url, init)

export class APIController {
  constructor(cacheService) {
    this.cacheService = cacheService;
    this.findEpisodes = (id) => {
      return this.cacheService.episodesByReleaseId.get(id) || [];
    };

    this.endpoint = 'https://' + global.upstreamDomainV1Tv;
  }

  async handleFavoritesProxy(action, id, sessionOverride = null) {
    const apiUrl = `${this.endpoint}/public/api/index.php`;
    const session = sessionOverride || store?.state?.app?.account?.session;

    const formData = this.createFormData({
      action,
      id,
      query: 'favorites'
    });
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await catGirlFetch(apiUrl, {
        method: 'POST',
        body: formData.getBuffer(),
        signal: controller.signal,
        headers: {
          ...formData.getHeaders(),
          Cookie: this.buildCookieHeader(session)
        }
      });

      const data = await response.json();

      if (response.ok) {
        return data
      } else {
        console.error(response);
        throw new Error(data.error)
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async handleProxyWithCache(query, extra, sessionOverride = null) {
    const apiUrl = `${this.endpoint}/public/api/index.php`;
    const session = sessionOverride || store?.state?.app?.account?.session;

    if (!query) {
      throw new Error('Query parameter is required');
    }

    try {
      console.log('[handleProxyWithCache] →', apiUrl, 'session=', session ? session.slice(0,8)+'...' : 'NONE')
      const response = await this.makeApiRequest(apiUrl, session, extra);
      console.log('[handleProxyWithCache] ← status=', response.status, 'ok=', response.ok)

      if (response.ok) {
        const data = await response.json();
        await this.cacheService.setCacheKey(query, data);
        return data;
      }

      await this.handleErrorResponse(response);
    } catch (error) {
      console.error('Request', query, 'failed:', error?.message || error)
      return this.handleFallbackToCache(query, error);
    }
  }

  async makeApiRequest(apiUrl, session, extra) {
    const formData = this.createFormData(extra);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      return await catGirlFetch(apiUrl, {
        method: 'POST',
        body: formData.getBuffer(),
        signal: controller.signal,
        headers: {
          ...formData.getHeaders(),
          Cookie: this.buildCookieHeader(session)
        }
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  createFormData(extra) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(extra || {})) {
      formData.append(key, value);
    }

    return formData;
  }

  buildCookieHeader(session) {
    if (!session) return '';
    // Request Cookie header — just name=value pairs, NO Path/Secure/HttpOnly
    // (those are Set-Cookie attributes only).
    return `PHPSESSID=${session}`;
  }

  async handleErrorResponse(response) {
    if (response.status === 401) {
      await this.clearUserData();
      throw new Error('Unauthorized');
    }

    throw new Error(`API request failed with status: ${response.status}`);
  }

  async clearUserData() {
    await this.cacheService.setCacheKey('user', null);
    await this.cacheService.setCacheKey('favorites', null);
  }

  async handleFallbackToCache(query, error) {
    const cachedValue = await this.cacheService.getCacheKey(query);

    if (cachedValue) {
      console.warn(`Using cached data for query "${query}" due to error:`, error.message);
      return cachedValue;
    }

    throw error;
  }

  async handleRequest(body, type) {
    await this.cacheService.ensureInitialized();

    try {
      let data = {};

      if (type === 'list') {
        data = await this.handleListRequest(body);
      } else if (type === 'release') {
        data = await this.handleReleaseRequest(body);
      } else if (type === 'catalog') {
        data = await this.handleCatalogRequest(body);
      } else if (type === 'random_release') {
        const releases = this.cacheService.releases
        const index = Math.floor(Math.random() * releases.size)
        data = await this.handleReleaseRequest({ id: [...releases.keys()][index] });
      } else if (type === 'search') {
        data = await this.handleSearchRequest(body);
      } else if (type === 'years') {
        data = this.cacheService.years;
      } else if (type === 'genres') {
        data = this.cacheService.genres;
      }

      return { data, error: null, status: true };
    } catch (error) {
      return { data: null, error: error.message, status: false };
    }
  }

  async handleListRequest({ perPage = 10, page = 1 }) {
    const validatedPerPage = this.validatePerPage(perPage);
    if (validatedPerPage.error) throw new Error(validatedPerPage.error);

    const sortedReleases = await this.cacheService.getList();

    const items = sortedReleases.slice(
      (page - 1) * validatedPerPage.value,
      page * validatedPerPage.value
    );

    return {
      items: items.map(
        x => APIResponseTransformer.transformRelease(
          x,
          this.findEpisodes(x.id),
          this.cacheService.franchiseByReleaseId.get(x.id),
          this.cacheService.torrents.get(x.id)
        )
      ),
      pagination: this.createPagination(validatedPerPage.value, page, sortedReleases.length)
    };
  }

  async handleReleaseRequest({ id }) {
    const release = this.cacheService.releases.get(id) ||
      this.cacheService.releases.get(Number(id));
    if (!release) throw new Error('Release not found');

    return APIResponseTransformer.transformRelease(
      release,
      this.findEpisodes(release.id),
      this.cacheService.franchiseByReleaseId.get(release.id),
      this.cacheService.torrents.get(release.id)
    );
  }

  async handleTorrentRequest({ id }) {
    const torrents = this.cacheService.torrents.get(id)
    if (!torrents) throw new Error('Torrents not found');

    return torrents;
  }

  async handleSearchRequest({ search }) {
    const sortedReleases = await this.cacheService.searchByQuery(search)

    return sortedReleases.map(
      x => APIResponseTransformer.transformRelease(
        x,
        this.findEpisodes(x.id),
        this.cacheService.franchiseByReleaseId.get(x.id),
        this.cacheService.torrents.get(x.id)
      )
    )
  }

  async handleCatalogRequest({ perPage = 10, page = 1, search, sort }) {
    const validatedPerPage = this.validatePerPage(perPage);
    if (validatedPerPage.error) throw new Error(validatedPerPage.error);

    const uniqueReleases = await this.cacheService.getUniqueSortedReleases();

    // By default getUniqueSortedReleases returns releases by freshness
    if (sort === '2') { // 2 - by fav, 1 - by freshness
      uniqueReleases.sort((a, b) => b.rating - a.rating)
    }

    let uniqueReleasesFiltered = uniqueReleases

    if (search) {
      try {
        let { year, genre } = JSON.parse(search)

        if (year) {
          year = year.split(',').map(x => {
            if (!x) return null
            x = x.trim()
            const parsed = parseInt(x, 10)
            return parsed > 1900 && parsed < 3000 ? parsed : null
          }).filter(Boolean)
          uniqueReleasesFiltered = uniqueReleases.filter(x => year.includes(+x.year))
        }

        if (genre) {
          genre = genre.split(',').map(x => x.trim()).filter(Boolean)
          uniqueReleasesFiltered = uniqueReleasesFiltered.filter(x => {
            if (!x.genres) return false

            const genres = x.genres.split(',').map(x => x.trim())
            return genre.some(g => genres.includes(g))
          })
        }
      } catch (e) {
        console.error(e)
      }
    }

    const items = uniqueReleasesFiltered.slice(
      (page - 1) * validatedPerPage.value,
      page * validatedPerPage.value
    );

    return {
      items: items.map(
        x => APIResponseTransformer.transformRelease(
          x,
          this.findEpisodes(x.id),
          this.cacheService.franchiseByReleaseId.get(x.id),
          this.cacheService.torrents.get(x.id)
        )
      ),
      pagination: this.createPagination(validatedPerPage.value, page, uniqueReleasesFiltered.length)
    };
  }

  validatePerPage(perPage) {
    const parsed = Number(perPage);
    return parsed > 0 ? { value: parsed } : { error: 'Invalid perPage' };
  }

  createPagination(perPage, currentPage, totalItems) {
    return {
      allItems: totalItems,
      allPages: Math.ceil(totalItems / perPage),
      page: currentPage,
      perPage
    };
  }
}
