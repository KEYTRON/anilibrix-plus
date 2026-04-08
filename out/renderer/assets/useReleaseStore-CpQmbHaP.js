import { br as defineStore, bs as axios, bt as ReleaseProxy, bu as ReleaseTransformer, bv as EpisodesTransformer, bw as showAppError, bx as translate, by as getLocale } from "./index-BZ1Qg9LU.js";
let REQUEST = null;
const useReleaseStore = defineStore("release", {
  state: () => ({
    data: null,
    loading: false
  }),
  actions: {
    /**
     * Get release data
     */
    async getRelease(releaseId) {
      if (REQUEST !== null) REQUEST.cancel();
      this.data = null;
      this.loading = true;
      REQUEST = axios.CancelToken.source();
      try {
        const data = await new ReleaseProxy().getRelease(releaseId, { cancelToken: REQUEST.token });
        const release = await new ReleaseTransformer().fetchItem(data);
        release.poster = new ReleaseProxy().getReleasePosterPath(release.poster);
        release.episodes = await new EpisodesTransformer().fetchItem(release.episodes);
        this.data = release;
      } catch (error) {
        if (!axios.isCancel(error)) {
          showAppError(translate("errors.genericLoadRelease", {}, getLocale()));
        }
      } finally {
        this.loading = false;
      }
    }
  }
});
export {
  useReleaseStore
};
