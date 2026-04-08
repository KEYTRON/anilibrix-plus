import { _ as _export_sfc, K as createBlock, L as withCtx, M as VLayout, N as openBlock, l as createVNode, a8 as VSkeletonLoader, t as VBtn, r as mergeProps, V as VIcon, W as createTextVNode, n as createBaseVNode, T as toDisplayString, b2 as VBadge, a$ as VSelect, b3 as VAutocomplete, a7 as createElementBlock, ae as Fragment, af as renderList, ab as resolveComponent, aj as VListItem, al as VListItemTitle, am as VListItemSubtitle, b1 as resolveDynamicComponent, q as normalizeClass, R as VCard, b4 as ReleaseProgress, b5 as useWatchStore, a_ as VMenu, ap as VList, ao as withModifiers, U as createCommentVNode, an as VListItemAction, Q as VImg, ac as VCardTitle, ad as VCardSubtitle, S as VCardText, b6 as normalizeProps, b7 as guardReactiveProps, ag as VChip, b8 as toRelease, aE as nextTick, b9 as VExpandTransition } from "./index-BZ1Qg9LU.js";
import { useCatalogStore } from "./useCatalogStore-BDR0nl1X.js";
import { R as ReleaseFavorite } from "./ReleaseFavorite-BSuv1n56.js";
const _sfc_main$7 = {};
function _sfc_render$7(_ctx, _cache) {
  return openBlock(), createBlock(VLayout, { "align-start": "" }, {
    default: withCtx(() => [
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "image",
        width: "160",
        height: "240"
      }),
      createVNode(VLayout, {
        column: "",
        class: "ma-4"
      }, {
        default: withCtx(() => [
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "heading",
            width: "400px",
            height: "24px"
          }),
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "text",
            class: "mt-3",
            width: "140"
          }),
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "text",
            class: "mt-1",
            width: "240"
          }),
          createVNode(VLayout, { class: "mt-3" }, {
            default: withCtx(() => [
              createVNode(VSkeletonLoader, {
                boilerplate: "",
                type: "button",
                width: "100",
                class: "mr-1"
              }),
              createVNode(VSkeletonLoader, {
                boilerplate: "",
                type: "button",
                width: "65",
                class: "mr-1"
              }),
              createVNode(VSkeletonLoader, {
                boilerplate: "",
                type: "button",
                width: "160",
                class: "mr-1"
              }),
              createVNode(VSkeletonLoader, {
                boilerplate: "",
                type: "button",
                width: "125"
              })
            ]),
            _: 1
          }),
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "text@3",
            width: "100%",
            class: "mt-5"
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const CatalogLoader = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const props$1 = {
  settings: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$6 = {
  props: props$1,
  computed: {
    _genres() {
      return useCatalogStore().filters.genres.value;
    },
    _years() {
      return useCatalogStore().filters.years.value;
    },
    /**
     * Check if have active filters
     *
     * @return {boolean}
     */
    hasFilters() {
      const years = this._years || [];
      const genres = this._genres || [];
      return years.length + genres.length > 0;
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VLayout, { class: "shrink" }, {
    default: withCtx(() => [
      createVNode(VBtn, mergeProps({ loading: _ctx.loading }, {
        class: "mr-2",
        height: "48",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("reload"))
      }), {
        default: withCtx(() => [
          createVNode(VIcon, {
            small: "",
            class: "mr-2"
          }, {
            default: withCtx(() => [..._cache[2] || (_cache[2] = [
              createTextVNode("mdi-refresh", -1)
            ])]),
            _: 1
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("common.reload")), 1)
        ]),
        _: 1
      }, 16),
      createVNode(VBadge, {
        dot: "",
        overlap: "",
        "offset-x": "10",
        "offset-y": "10",
        value: $options.hasFilters
      }, {
        default: withCtx(() => [
          createVNode(VBtn, mergeProps({ loading: _ctx.loading }, {
            height: "48",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:settings", !_ctx.settings))
          }), {
            default: withCtx(() => [
              createVNode(VIcon, {
                small: "",
                class: "mr-2"
              }, {
                default: withCtx(() => [..._cache[3] || (_cache[3] = [
                  createTextVNode("mdi-filter", -1)
                ])]),
                _: 1
              }),
              createBaseVNode("span", null, toDisplayString(_ctx.$t("common.filters")), 1)
            ]),
            _: 1
          }, 16)
        ]),
        _: 1
      }, 8, ["value"])
    ]),
    _: 1
  });
}
const CatalogToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = {
  data() {
    return {
      items: [
        {
          title: this.$t("catalog.sortNew"),
          value: 1
        },
        {
          title: this.$t("catalog.sortPopular"),
          value: 2
        }
      ]
    };
  },
  computed: {
    _value() {
      return useCatalogStore().filters.sort.value;
    }
  },
  methods: {
    _setFilterValue(payload) {
      useCatalogStore().setFilterValue(payload);
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VSelect, mergeProps({ items: $data.items }, {
    outlined: "",
    "hide-details": "",
    "item-text": "title",
    "item-value": "value",
    placeholder: _ctx.$t("catalog.sort"),
    value: $options._value,
    onInput: _cache[0] || (_cache[0] = ($event) => $options._setFilterValue({ filter: "sort", value: $event }))
  }), null, 16, ["placeholder", "value"]);
}
const CatalogFiltersSort = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = {
  computed: {
    _items() {
      return useCatalogStore().filters.years.items;
    },
    _value() {
      return useCatalogStore().filters.years.value;
    },
    _loading() {
      return useCatalogStore().filters.years.loading;
    }
  },
  methods: {
    _setFilterValue(payload) {
      useCatalogStore().setFilterValue(payload);
    },
    _getCatalogYearsFilter() {
      return useCatalogStore().getCatalogYearsFilter();
    }
  },
  created() {
    this._getCatalogYearsFilter();
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    chips: "",
    outlined: "",
    multiple: "",
    clearable: "",
    "hide-details": "",
    "hide-no-data": "",
    "deletable-chips": "",
    class: "filter",
    placeholder: _ctx.$t("catalog.yearsPlaceholder"),
    value: $options._value,
    items: $options._items,
    loading: $options._loading,
    onInput: _cache[0] || (_cache[0] = ($event) => $options._setFilterValue({ filter: "years", value: $event }))
  }, null, 8, ["placeholder", "value", "items", "loading"]);
}
const CatalogFiltersYears = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-7374b12c"]]);
const _sfc_main$3 = {
  computed: {
    _items() {
      return useCatalogStore().filters.genres.items;
    },
    _value() {
      return useCatalogStore().filters.genres.value;
    },
    _loading() {
      return useCatalogStore().filters.genres.loading;
    }
  },
  methods: {
    _setFilterValue(payload) {
      useCatalogStore().setFilterValue(payload);
    },
    _getCatalogGenresFilter() {
      return useCatalogStore().getCatalogGenresFilter();
    }
  },
  created() {
    this._getCatalogGenresFilter();
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VAutocomplete, {
    chips: "",
    outlined: "",
    multiple: "",
    clearable: "",
    "hide-details": "",
    "hide-no-data": "",
    "deletable-chips": "",
    class: "filter",
    placeholder: _ctx.$t("catalog.genresPlaceholder"),
    value: $options._value,
    items: $options._items,
    loading: $options._loading,
    onInput: _cache[0] || (_cache[0] = ($event) => $options._setFilterValue({ filter: "genres", value: $event }))
  }, null, 8, ["placeholder", "value", "items", "loading"]);
}
const CatalogFiltersGenres = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-c52d93fe"]]);
const _sfc_main$2 = {
  computed: {
    /**
     * Get filters
     *
     * @return {array}
     */
    filters() {
      return [
        {
          is: CatalogFiltersGenres,
          title: this.$t("catalog.genres"),
          subtitle: this.$t("catalog.genresSubtitle")
        },
        {
          is: CatalogFiltersYears,
          title: this.$t("catalog.years"),
          subtitle: this.$t("catalog.yearsSubtitle")
        },
        {
          is: CatalogFiltersSort,
          title: this.$t("catalog.sort"),
          subtitle: this.$t("catalog.sortSubtitle")
        }
      ];
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.filters, (filter, k) => {
      return openBlock(), createBlock(VCard, {
        key: k,
        class: normalizeClass({ "mt-2": k > 0 })
      }, {
        default: withCtx(() => [
          createVNode(VListItem, { class: "py-2" }, {
            default: withCtx(() => [
              createVNode(_component_v_list_item_content, null, {
                default: withCtx(() => [
                  createVNode(VListItemTitle, {
                    textContent: toDisplayString(filter.title)
                  }, null, 8, ["textContent"]),
                  createVNode(VListItemSubtitle, {
                    textContent: toDisplayString(filter.subtitle)
                  }, null, 8, ["textContent"]),
                  (openBlock(), createBlock(resolveDynamicComponent(filter.is), { class: "mt-4" }))
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024)
        ]),
        _: 2
      }, 1032, ["class"]);
    }), 128))
  ]);
}
const CatalogFilters = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const props = {
  release: {
    type: Object,
    default: null
  }
};
const _sfc_main$1 = {
  props,
  components: {
    Favorite: ReleaseFavorite,
    RProgress: ReleaseProgress
  },
  mounted() {
    this.updateShareLinks();
  },
  methods: {
    show(e) {
      if (window.__ctxMenuClose) {
        window.__ctxMenuClose();
        window.__ctxMenuClose = null;
      }
      if (this.lockShow) return;
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        window.__ctxMenuClose = () => {
          this.showMenu = false;
        };
        this.showMenu = true;
      });
    },
    /**
     * Set watch package data
     *
     * @return {Promise<void>}
     */
    async setWatched() {
      this.lockShow = true;
      this.loading = true;
      const release_id = this.release.id;
      const episodes = this.release.episodes || [];
      const payload = {
        release_id,
        episodes
      };
      this.$nextTick(async () => {
        try {
          await useWatchStore().setWatchedEpisodes(payload);
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
          this.lockShow = false;
        }
      });
    },
    /**
     * Remove watch package data
     *
     * @return {Promise<void>}
     */
    async removeWatched() {
      this.lockShow = true;
      this.loading = true;
      const release_id = this.release.id;
      const episodes = this.release.episodes || [];
      const payload = {
        release_id,
        episodes
      };
      this.$nextTick(async () => {
        try {
          await useWatchStore().removeWatchedEpisodes(payload);
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
          this.lockShow = false;
        }
      });
    },
    /**
     * Generate complete share URL based on selected domain and release code
     * @returns {string}
     */
    generateShareUrl() {
      if (!this.release?.code) return "";
      const domainConfig = {
        "anilibria.tv": {
          base: "https://anilibria.tv/release/",
          suffix: ".html"
        },
        "anilibria.top": {
          base: "https://anilibria.top/anime/releases/release/",
          suffix: "/"
        },
        "anilibria.wtf": {
          base: "https://anilibria.wtf/anime/releases/release/",
          suffix: "/"
        }
      };
      const domain = this.selectedDomain.split("/")[0];
      const config = domainConfig[domain] || domainConfig["anilibria.tv"];
      return `${config.base}${this.release.code}${config.suffix}`;
    },
    /**
     * Generate social share URL
     * @param {string} platform - Social platform (vk, telegram, twitter)
     * @param {string} url - URL to share
     * @param {string} text - Share text
     * @returns {string}
     */
    generateSocialShareUrl(platform, url, text) {
      const encodedUrl = encodeURIComponent(url);
      const encodedText = encodeURIComponent(text);
      const platforms = {
        vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedText}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
      };
      return platforms[platform] || "";
    },
    /**
     * Get share text for social media
     * @returns {string}
     */
    getShareText() {
      const { ru, en } = this.release?.names || {};
      const domain = this.selectedDomain.split("/")[0];
      return this.$t("release.shareText", { title: ru || en || this.$t("generated.shareThisRelease"), domain });
    },
    /**
     * Update all share links
     */
    updateShareLinks() {
      if (!this.release) return;
      const shareUrl = this.generateShareUrl();
      const shareText = this.getShareText();
      this.shareLinks = [
        this.createShareLink(this.$t("common.releaseLink"), "mdi-link", shareUrl),
        this.createShareLink(
          this.$t("common.shareVk"),
          "mdi-vk",
          this.generateSocialShareUrl("vk", shareUrl, shareText),
          true
        ),
        this.createShareLink(
          this.$t("common.shareTelegram"),
          "mdi-telegram",
          this.generateSocialShareUrl("telegram", shareUrl, shareText),
          true
        ),
        this.createShareLink(
          this.$t("common.shareTwitter"),
          "mdi-twitter",
          this.generateSocialShareUrl("twitter", shareUrl, shareText),
          true
        )
      ];
    },
    /**
     * Create share link object
     * @param {string} title
     * @param {string} icon
     * @param {string} link
     * @param {boolean} isExternal
     * @returns {Object}
     */
    createShareLink(title, icon, link, isExternal = false) {
      return {
        title,
        icon,
        link,
        copied: false,
        isExternal
      };
    },
    handleShareClick(item) {
      item.isExternal ? window.open(item.link, "_blank") : this.copyToClipboard(item.link);
    },
    async copyToClipboard(link) {
      try {
        await navigator.clipboard.writeText(link);
        this.shareLinks = this.shareLinks.map((item) => {
          return {
            ...item,
            copied: item.link === link
          };
        });
        setTimeout(() => {
          this.shareLinks = this.shareLinks.map((item) => {
            return {
              ...item,
              copied: false
            };
          });
        }, 2e3);
        this.$toasted.success(this.$t("release.copySuccess"));
      } catch (err) {
        console.error(err);
        this.$toasted.error(this.$t("release.copyError"));
      }
    }
  },
  data() {
    return {
      lockShow: false,
      actions: [
        {
          icon: "mdi-check",
          title: this.$t("release.markAllSeen"),
          action: this.setWatched
        },
        {
          icon: "mdi-close",
          title: this.$t("release.unmarkAllSeen"),
          action: this.removeWatched
        }
      ],
      selectedDomain: "anilibria.tv/release/",
      shareLinks: [
        {
          title: this.$t("common.releaseLink"),
          icon: "mdi-link",
          link: "",
          copied: false,
          isExternal: false
        },
        {
          title: this.$t("common.shareVk"),
          icon: "mdi-vk",
          link: "",
          copied: false,
          isExternal: true
        },
        {
          title: this.$t("common.shareTelegram"),
          icon: "mdi-telegram",
          link: "",
          copied: false,
          isExternal: true
        },
        {
          title: this.$t("common.shareTwitter"),
          icon: "mdi-twitter",
          link: "",
          copied: false,
          isExternal: true
        }
      ],
      availableDomains: [
        { text: "anilibria.tv", value: "anilibria.tv/release/" },
        { text: "anilibria.top", value: "anilibria.top/anime/releases/release/" },
        { text: "anilibria.wtf", value: "anilibria.wtf/anime/releases/release/" }
      ],
      showMenu: false,
      x: 0,
      y: 0,
      totalEpisodes: this.release.total_series
    };
  },
  computed: {
    total() {
      return this.episodes.length;
    },
    /**
     * Get watched episodes
     *
     * @return {*}
     */
    watched() {
      const release_id = this.$__get(this.release, "id");
      const episodes = (this.episodes || []).map((x) => x.id);
      const payload = {
        release_id,
        episodes
      };
      const watched_episodes = useWatchStore().getWatchedEpisodes(payload);
      return watched_episodes.length;
    },
    /**
     * Get image
     *
     * @return {*}
     */
    src() {
      return this.$__get(this.release, "poster");
    },
    /**
     * Get title
     *
     * @return {string}
     */
    title() {
      return this.$__get(this.release, "names.ru");
    },
    /**
     * Get subtitle
     *
     * @return {string}
     */
    subtitle() {
      return this.$__get(this.release, "names.original");
    },
    /**
     * Get release genres
     *
     * @return {string}
     */
    genres() {
      return (this.$__get(this.release, "genres") || []).join(" | ");
    },
    /**
     * Get release year
     *
     * @return {*}
     */
    year() {
      return this.$__get(this.release, "year");
    },
    /**
     * Get release type
     *
     * @return {*}
     */
    type() {
      return this.$__get(this.release, "type");
    },
    /**
     * Get release description
     *
     * @return {*}
     */
    description() {
      return this.$__get(this.release, "description");
    },
    /**
     * Get release episodes
     *
     * @return {*|*[]}
     */
    episodes() {
      return this.$__get(this.release, "episodes") || [];
    },
    /**
     * Get release status
     *
     * @return {*}
     */
    status() {
      return this.$__get(this.release, "status");
    }
  }
};
const _hoisted_1$1 = { class: "text-clamp text-clamp--5" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  const _component_v_list_item_icon = resolveComponent("v-list-item-icon");
  const _component_favorite = resolveComponent("favorite");
  return openBlock(), createBlock(VCard, {
    flat: "",
    color: "transparent",
    onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("click"))
  }, {
    default: withCtx(() => [
      createVNode(VMenu, {
        modelValue: $data.showMenu,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.showMenu = $event),
        "position-x": $data.x,
        "position-y": $data.y,
        absolute: "",
        "offset-y": ""
      }, {
        default: withCtx(() => [
          createVNode(VList, {
            dense: "",
            class: "grey darken-4"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.actions, (item, k) => {
                return openBlock(), createBlock(VListItem, {
                  key: item.icon,
                  onClick: item.action
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon, { class: "mr-2" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.icon), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_list_item_content, null, {
                      default: withCtx(() => [
                        createVNode(VListItemTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.title) + " (" + toDisplayString($options.watched) + " / " + toDisplayString($options.total) + ")", 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 128)),
              createVNode(VListItem, {
                onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["stop"]))
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_list_item_content, null, {
                    default: withCtx(() => [
                      createVNode(VSelect, {
                        modelValue: $data.selectedDomain,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedDomain = $event),
                        items: $data.availableDomains,
                        onChange: $options.updateShareLinks,
                        dense: "",
                        outlined: "",
                        "hide-details": "",
                        label: _ctx.$t("catalog.releaseDomain"),
                        onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                        }, ["stop"]))
                      }, null, 8, ["modelValue", "items", "onChange", "label"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.shareLinks, (item, index) => {
                return openBlock(), createBlock(VListItem, {
                  key: index,
                  onClick: ($event) => $options.handleShareClick(item)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_list_item_icon, { class: "mt-4" }, {
                      default: withCtx(() => [
                        createVNode(VIcon, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.icon), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_v_list_item_content, null, {
                      default: withCtx(() => [
                        createVNode(VListItemTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.title), 1)
                          ]),
                          _: 2
                        }, 1024),
                        !item.isExternal ? (openBlock(), createBlock(VListItemSubtitle, {
                          key: 0,
                          class: "text-truncate",
                          style: { "max-width": "200px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.link), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(VListItemAction, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          icon: "",
                          small: ""
                        }, {
                          default: withCtx(() => [
                            item.copied ? (openBlock(), createBlock(VIcon, {
                              key: 0,
                              color: "success"
                            }, {
                              default: withCtx(() => [..._cache[5] || (_cache[5] = [
                                createTextVNode("mdi-check", -1)
                              ])]),
                              _: 1
                            })) : createCommentVNode("", true),
                            !item.copied && item.isExternal ? (openBlock(), createBlock(VIcon, { key: 1 }, {
                              default: withCtx(() => [..._cache[6] || (_cache[6] = [
                                createTextVNode("mdi-open-in-new", -1)
                              ])]),
                              _: 1
                            })) : createCommentVNode("", true),
                            !item.copied && !item.isExternal ? (openBlock(), createBlock(VIcon, { key: 2 }, {
                              default: withCtx(() => [..._cache[7] || (_cache[7] = [
                                createTextVNode("mdi-content-copy", -1)
                              ])]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "position-x", "position-y"]),
      createVNode(VLayout, {
        onContextmenu: $options.show,
        "align-start": ""
      }, {
        default: withCtx(() => [
          createVNode(VCard, {
            width: "160",
            height: "240",
            "min-width": "160",
            "min-height": "240",
            style: { position: "relative" }
          }, {
            default: withCtx(() => [
              createVNode(VImg, mergeProps({ transition: false }, { src: $options.src }, {
                width: "160",
                height: "240"
              }), null, 16)
            ]),
            _: 1
          }),
          createBaseVNode("div", null, [
            createVNode(VCardTitle, {
              textContent: toDisplayString($options.title)
            }, null, 8, ["textContent"]),
            $options.subtitle ? (openBlock(), createBlock(VCardSubtitle, {
              key: 0,
              textContent: toDisplayString($options.subtitle),
              class: "pb-0"
            }, null, 8, ["textContent"])) : createCommentVNode("", true),
            $options.genres ? (openBlock(), createBlock(VCardSubtitle, {
              key: 1,
              textContent: toDisplayString($options.genres),
              class: "pt-0"
            }, null, 8, ["textContent"])) : createCommentVNode("", true),
            createVNode(VCardText, null, {
              default: withCtx(() => [
                createVNode(_component_favorite, normalizeProps(guardReactiveProps({ release: _ctx.release })), null, 16),
                createVNode(VChip, {
                  textContent: toDisplayString($options.year),
                  label: "",
                  color: "grey darken-4",
                  style: { height: "36px" }
                }, null, 8, ["textContent"]),
                createVNode(VChip, {
                  textContent: toDisplayString($options.type),
                  label: "",
                  color: "grey darken-4",
                  style: { height: "36px" }
                }, null, 8, ["textContent"]),
                $options.status ? (openBlock(), createBlock(VChip, {
                  key: 0,
                  textContent: toDisplayString($options.status),
                  label: "",
                  color: "grey darken-4",
                  style: { height: "36px" }
                }, null, 8, ["textContent"])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            $options.description ? (openBlock(), createBlock(VCardText, {
              key: 2,
              class: "pt-0 grey--text"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1$1, toDisplayString($options.description), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["onContextmenu"])
    ]),
    _: 1
  });
}
const CatalogRelease = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "Catalog.View",
  meta() {
    return { title: this.$t("catalog.pageTitle") };
  },
  components: {
    Loader: CatalogLoader,
    Toolbar: CatalogToolbar,
    Filters: CatalogFilters,
    Release: CatalogRelease
  },
  data() {
    return {
      settings: false
    };
  },
  computed: {
    _page() {
      return useCatalogStore().items.page;
    },
    _items() {
      return useCatalogStore().items.data;
    },
    _loading() {
      return useCatalogStore().items.loading;
    },
    _perPage() {
      return useCatalogStore().items.perPage;
    },
    _pagination() {
      return useCatalogStore().items.pagination;
    },
    _is_initialized() {
      return useCatalogStore().is_initialized;
    },
    /**
     * Check if last items from server is equals to pet page items
     * That means that there are more items on server
     *
     * @return {boolean}
     */
    hasMoreItems() {
      return this.$__get(this._pagination, "lastItems", 0) === this._perPage;
    }
  },
  methods: {
    _getCatalogItems() {
      return useCatalogStore().getCatalogItems();
    },
    _setPaginationPage(page) {
      return useCatalogStore().setPaginationPage(page);
    },
    _clearCatalogReleases() {
      return useCatalogStore().clearCatalogReleases();
    },
    /**
     * Go to release
     *
     * @return void
     */
    toRelease,
    /**
     * Show releases
     * Reset releases
     *
     */
    async showReleases() {
      await this._clearCatalogReleases();
      await this._setPaginationPage(1);
      await this._getCatalogItems();
    },
    /**
     * Load more releases from next page
     *
     * @return void
     */
    async loadReleases() {
      await this._setPaginationPage(this._page + 1);
      await this._getCatalogItems();
    }
  },
  created() {
    if (this._is_initialized === false) this.showReleases();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      nextTick(() => {
        if (from && from.name === "release") {
          const fromReleaseId = vm.$__get(from, "params.releaseId");
          const releaseContainer = vm.$refs[fromReleaseId];
          console.log(fromReleaseId, releaseContainer, releaseContainer[0].scrollIntoView);
          if (releaseContainer && releaseContainer[0]) {
            releaseContainer[0].$el.scrollIntoView({ block: "center" });
          }
        }
      });
    });
  }
};
const _hoisted_1 = { class: "my-2" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_filters = resolveComponent("filters");
  const _component_toolbar = resolveComponent("toolbar");
  const _component_release = resolveComponent("release");
  const _component_loader = resolveComponent("loader");
  return openBlock(), createBlock(VLayout, { column: "" }, {
    default: withCtx(() => [
      createVNode(VCard, {
        flat: "",
        color: "transparent"
      }, {
        default: withCtx(() => [
          createVNode(VCardTitle, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$t("catalog.title")), 1)
            ]),
            _: 1
          }),
          createVNode(VCardSubtitle, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$t("catalog.subtitle")), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VExpandTransition, null, {
        default: withCtx(() => [
          $data.settings ? (openBlock(), createBlock(_component_filters, {
            key: 0,
            class: "mb-2"
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(_component_toolbar, {
        class: "mb-2",
        settings: $data.settings,
        onReload: $options.showReleases
      }, null, 8, ["settings", "onReload"]),
      createBaseVNode("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options._items, (release) => {
          return openBlock(), createBlock(_component_release, mergeProps({
            key: release.id,
            ref_for: true
          }, { release, episodes: release.episodes }, {
            class: "mb-2",
            ref_for: true,
            ref: release.id,
            onClick: ($event) => $options.toRelease(release)
          }), null, 16, ["onClick"]);
        }), 128)),
        $options._loading ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($options._perPage, (i) => {
          return openBlock(), createBlock(_component_loader, {
            class: "mb-2",
            key: i
          });
        }), 128)) : createCommentVNode("", true)
      ]),
      $options._items && $options._items.length > 0 && $options.hasMoreItems ? (openBlock(), createBlock(VBtn, {
        key: 0,
        block: "",
        text: "",
        class: "grey darken-4 shrink",
        onClick: $options.loadReleases
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$t("common.showMore")), 1)
        ]),
        _: 1
      }, 8, ["onClick"])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const CatalogView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  CatalogView as default
};
