import { bw as BaseProxy, bx as BaseTransformer, by as fe, ag as humanFormat, bz as requireCapitalize, bo as defineStore, bt as showAppError, bu as translate, bv as getLocale, bq as ReleaseProxy } from "./index-YF3Wcouz.js";
import { g as getDefaultExportFromCjs } from "./torrents-handler-CGJ0ERZQ.js";
class CatalogProxy extends BaseProxy {
  /**
   * Get catalog genres
   *
   * @return {Promise<*>}
   */
  async getCatalogGenres() {
    const data = this.getFormDataObject({ query: "genres" });
    const params = {
      data,
      headers: data.getHeaders()
    };
    const response = await this.submit("POST", this.getApiEndpoint(), params);
    return this.handleResponse(response.data);
  }
  /**
   * Get catalog years
   *
   * @return {Promise<*>}
   */
  async getCatalogYears() {
    const data = this.getFormDataObject({ query: "years" });
    const params = {
      data,
      headers: data.getHeaders()
    };
    const response = await this.submit("POST", this.getApiEndpoint(), params);
    return this.handleResponse(response.data);
  }
  /**
   * Get catalog data
   *
   * @param genres
   * @param years
   * @param page
   * @param perPage
   * @param sort
   * @param parameters
   * @return {Promise<*>}
   */
  async getCatalogReleases({
    genres = [],
    years = [],
    page = 1,
    perPage = 15,
    sort = 1
  }, parameters = {}) {
    const data = this.getFormDataObject({
      sort,
      page,
      perPage,
      query: "catalog",
      xpage: "catalog",
      search: {
        year: (years || []).join(","),
        genre: (genres || []).join(",")
      }
    });
    const params = {
      data,
      headers: data.getHeaders(),
      ...parameters
    };
    const response = await this.submit("POST", this.getApiEndpoint(), params);
    return this.handleResponse(response.data);
  }
}
class CatalogTransformer extends BaseTransformer {
  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  fetch(release) {
    return {
      id: this.get(release, "id"),
      year: this.get(release, "year"),
      type: this.get(release, "type"),
      names: {
        ru: this._stripHtml(this.get(release, "names.0")),
        original: this._stripHtml(this.get(release, "names.1"))
      },
      poster: this.get(release, "poster"),
      genres: this.get(release, "genres") || [],
      description: this._stripHtml(this.get(release, "description")),
      status: this.get(release, "status"),
      statusCode: this.get(release, "statusCode"),
      favoriteRating: this._getFavoriteRating(release),
      episodes: this.get(release, "playlist") || []
    };
  }
  /**
   * Strip html tags
   *
   * @param value
   * @return {*}
   * @private
   */
  _stripHtml(value) {
    return value ? fe(value).result : null;
  }
  _getFavoriteRating(release) {
    const rating = this.get(release, "favorite.rating");
    return { count: rating, text: humanFormat(rating) };
  }
}
var capitalizeExports = requireCapitalize();
const __capitalize = /* @__PURE__ */ getDefaultExportFromCjs(capitalizeExports);
const useCatalogStore = defineStore("catalog", {
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
    async getCatalogItems() {
      try {
        this.is_initialized = true;
        this.items.loading = true;
        const sort = this.filters.sort.value;
        const page = this.items.page;
        const years = this.filters.years.value;
        const genres = this.filters.genres.value;
        const perPage = this.items.perPage;
        const { items } = await new CatalogProxy().getCatalogReleases({ sort, genres, years, page, perPage });
        const releases = new CatalogTransformer().fetchCollection(items);
        const processedReleases = releases.map((release) => ({
          ...release,
          poster: new ReleaseProxy().getReleasePosterPath(release.poster)
        }));
        this.items.data = [...this.items.data, ...processedReleases];
        this.items.pagination = {
          page,
          lastItems: processedReleases ? processedReleases.length : 0
        };
      } catch (error) {
        showAppError(translate("errors.genericLoadReleases", {}, getLocale()));
      } finally {
        this.items.loading = false;
      }
    },
    /**
     * Get genres filter
     */
    async getCatalogGenresFilter() {
      const filter = "genres";
      try {
        this.filters[filter].loading = true;
        const data = (await new CatalogProxy().getCatalogGenres()).map((genre) => __capitalize(genre));
        this.filters[filter].items = data;
      } catch (error) {
        showAppError(translate("errors.genericLoadGenres", {}, getLocale()));
      } finally {
        this.filters[filter].loading = false;
      }
    },
    /**
     * Get years filter
     */
    async getCatalogYearsFilter() {
      const filter = "years";
      try {
        this.filters[filter].loading = true;
        const data = await new CatalogProxy().getCatalogYears();
        this.filters[filter].items = data;
      } catch (error) {
        showAppError(translate("errors.genericLoadYears", {}, getLocale()));
      } finally {
        this.filters[filter].loading = false;
      }
    },
    /**
     * Clear catalog releases
     */
    clearCatalogReleases() {
      this.items.data = [];
    },
    /**
     * Set filter value
     */
    setFilterValue({ filter, value }) {
      this.filters[filter].value = value;
    },
    /**
     * Set pagination page
     */
    setPaginationPage(page) {
      this.items.page = page;
    }
  },
  persist: {
    paths: ["filters"]
  }
});
export {
  useCatalogStore
};
