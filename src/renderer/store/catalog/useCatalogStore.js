// Proxy
import CatalogProxy from '@proxies/catalog'
import ReleaseProxy from '@proxies/release'

// Transformer
import CatalogTransformer from '@transformers/catalog'

// Utils
import __capitalize from 'lodash/capitalize'
import { getLocale, translate } from '@/i18n'

// Handlers
import { showAppError } from '@main/handlers/notifications/notifications-handler'

import { defineStore } from 'pinia'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    items: {
      data: [],
      page: 1,
      perPage: 12,
      loading: true,
      pagination: null
    },
    filters: {
      genres: {
        items: [],
        value: [],
        loading: true
      },
      years: {
        items: [],
        value: [],
        loading: true
      },
      sort: {
        value: 1
      }
    },
    is_initialized: false
  }),

  actions: {
    /**
     * Get catalog items
     */
    async getCatalogItems () {
      try {
        this.is_initialized = true
        this.items.loading = true

        const sort = this.filters.sort.value
        const page = this.items.page
        const years = this.filters.years.value
        const genres = this.filters.genres.value
        const perPage = this.items.perPage

        const { items } = await new CatalogProxy().getCatalogReleases({ sort, genres, years, page, perPage })
        const releases = new CatalogTransformer().fetchCollection(items)

        const processedReleases = releases.map(release => ({
          ...release,
          poster: new ReleaseProxy().getReleasePosterPath(release.poster)
        }))

        this.items.data = [...this.items.data, ...processedReleases]
        this.items.pagination = {
          page,
          lastItems: processedReleases ? processedReleases.length : 0
        }
      } catch (error) {
        showAppError(translate('errors.genericLoadReleases', {}, getLocale()))
      } finally {
        this.items.loading = false
      }
    },

    /**
     * Get genres filter
     */
    async getCatalogGenresFilter () {
      const filter = 'genres'
      try {
        this.filters[filter].loading = true

        const data = (await new CatalogProxy().getCatalogGenres()).map(genre => __capitalize(genre))
        this.filters[filter].items = data
      } catch (error) {
        showAppError(translate('errors.genericLoadGenres', {}, getLocale()))
      } finally {
        this.filters[filter].loading = false
      }
    },

    /**
     * Get years filter
     */
    async getCatalogYearsFilter () {
      const filter = 'years'
      try {
        this.filters[filter].loading = true

        const data = await new CatalogProxy().getCatalogYears()
        this.filters[filter].items = data
      } catch (error) {
        showAppError(translate('errors.genericLoadYears', {}, getLocale()))
      } finally {
        this.filters[filter].loading = false
      }
    },

    /**
     * Clear catalog releases
     */
    clearCatalogReleases () {
      this.items.data = []
    },

    /**
     * Set filter value
     */
    setFilterValue ({ filter, value }) {
      this.filters[filter].value = value
    },

    /**
     * Set pagination page
     */
    setPaginationPage (page) {
      this.items.page = page
    }
  },

  persist: {
    paths: ['filters']
  }
})
