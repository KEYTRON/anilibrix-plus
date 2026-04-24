import { _ as _export_sfc, bc as useFavoritesStore, ba as useAccountStore, S as createBlock, L as withCtx, aZ as withModifiers, t as VBtn, U as createCommentVNode, N as openBlock, V as VIcon, W as createTextVNode, K as createElementBlock, T as toDisplayString } from "./index-YF3Wcouz.js";
const props = {
  release: {
    type: Object,
    default: null
  },
  color: {
    type: String,
    default: null
  }
};
const _sfc_main = {
  props,
  computed: {
    _loading() {
      return useFavoritesStore().loading;
    },
    _isAuthorized() {
      return useAccountStore().isAuthorized;
    },
    /**
     * Check if provided release is in favorite
     *
     * @return {*}
     */
    isInFavorite() {
      return useFavoritesStore().isInFavorite(this.release);
    },
    /**
    * Get release favorite rating
    *
    * @return {*}
    */
    favoriteRating() {
      return this.$__get(this.release, "favoriteRating.text");
    }
  },
  methods: {
    _addToFavorites(release) {
      return useFavoritesStore().addToFavorites(release);
    },
    _removeFromFavorites(release) {
      return useFavoritesStore().removeFromFavorites(release);
    }
  }
};
const _hoisted_1 = {
  key: 2,
  class: "ml-1"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $options._isAuthorized ? (openBlock(), createBlock(VBtn, {
    key: 0,
    color: $options.isInFavorite ? "secondary" : _ctx.color,
    loading: $options._loading,
    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options.isInFavorite ? $options._removeFromFavorites(_ctx.release) : $options._addToFavorites(_ctx.release), ["stop"]))
  }, {
    default: withCtx(() => [
      $options.isInFavorite ? (openBlock(), createBlock(VIcon, { key: 0 }, {
        default: withCtx(() => [..._cache[1] || (_cache[1] = [
          createTextVNode("mdi-star", -1)
        ])]),
        _: 1
      })) : (openBlock(), createBlock(VIcon, { key: 1 }, {
        default: withCtx(() => [..._cache[2] || (_cache[2] = [
          createTextVNode("mdi-star-outline", -1)
        ])]),
        _: 1
      })),
      $options.favoriteRating ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString($options.favoriteRating), 1)) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["color", "loading"])) : createCommentVNode("", true);
}
const ReleaseFavorite = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ReleaseFavorite as R
};
