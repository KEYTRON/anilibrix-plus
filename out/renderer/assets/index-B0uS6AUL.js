import { g as genericComponent, u as useProxiedModel, bl as useDelay, p as propsFactory, bm as makeDelayProps, _ as _export_sfc, b4 as ReleaseProgress, b5 as useWatchStore, N as openBlock, K as createBlock, L as withCtx, l as createVNode, Q as VImg, a_ as VMenu, ap as VList, a7 as createElementBlock, af as renderList, aj as VListItem, V as VIcon, W as createTextVNode, T as toDisplayString, al as VListItemTitle, ae as Fragment, ao as withModifiers, a$ as VSelect, am as VListItemSubtitle, U as createCommentVNode, an as VListItemAction, t as VBtn, bi as VFadeTransition, n as createBaseVNode, ag as VChip, r as mergeProps, R as VCard, ab as resolveComponent, P as VCol, O as VRow, be as useFavoritesStore, bn as stringsPluralize, ak as VDivider, ac as VCardTitle, ad as VCardSubtitle, a8 as VSkeletonLoader, M as VLayout, bg as VTextField, bo as VSwitch, bp as toLogin, S as VCardText, b8 as toRelease, bq as Fuse, bc as useAccountStore, b9 as VExpandTransition, b1 as resolveDynamicComponent } from "./index-BZ1Qg9LU.js";
const makeVHoverProps = propsFactory({
  disabled: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  ...makeDelayProps()
}, "VHover");
const VHover = genericComponent()({
  name: "VHover",
  props: makeVHoverProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props2, _ref) {
    let {
      slots
    } = _ref;
    const isHovering = useProxiedModel(props2, "modelValue");
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props2, (value) => !props2.disabled && (isHovering.value = value));
    return () => slots.default?.({
      isHovering: isHovering.value,
      props: {
        onMouseenter: runOpenDelay,
        onMouseleave: runCloseDelay
      }
    });
  }
});
const props$4 = {
  release: {
    type: Object,
    default: null
  },
  showSeen: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$8 = {
  props: props$4,
  components: {
    ReleaseProgress
  },
  mounted() {
    this.updateShareLinks();
  },
  data() {
    return {
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
  methods: {
    show(e) {
      if (window.__ctxMenuClose) {
        window.__ctxMenuClose();
        window.__ctxMenuClose = null;
      }
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
      this.loading = true;
      const release_id = this.release.id;
      const episodes = this.release.episodes || [];
      const payload = {
        release_id,
        episodes
      };
      await useWatchStore().setWatchedEpisodes(payload);
      this.loading = false;
    },
    /**
     * Remove watch package data
     *
     * @return {Promise<void>}
     */
    async removeWatched() {
      this.loading = true;
      const release_id = this.release.id;
      const episodes = this.release.episodes || [];
      const payload = {
        release_id,
        episodes
      };
      await useWatchStore().removeWatchedEpisodes(payload);
      this.loading = false;
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
  computed: {
    /**
     * Get release poster image
     *
     * @return {string}
     */
    poster() {
      return this.$__get(this.release, "poster") || "";
    },
    /**
     * Get release title
     *
     * @return {string}
     */
    title() {
      return this.$__get(this.release, "names.ru");
    },
    /**
     * Get episodes
     *
     * @return {array}
     */
    episodes() {
      return this.$__get(this.release, "episodes") || [];
    },
    /**
     * Get description
     *
     * @return {string}
     */
    description() {
      return this.$__get(this.release, "description");
    },
    /**
     * Get release status
     *
     * @return {string}
     */
    status() {
      return this.$__get(this.release, "status");
    },
    /**
     * Get release rating
     *
     * @return {string}
     */
    rating() {
      return this.$__get(this.release, "favoriteRating.text");
    }
  }
};
const _hoisted_1 = { class: "body-2 font-weight-bold mb-2" };
const _hoisted_2 = { class: "flex-grow-1 overflow-hidden" };
const _hoisted_3 = {
  class: "caption text-clamp",
  style: { "hyphens": "auto" }
};
const _hoisted_4 = {
  key: 0,
  class: "d-flex justify-space-between mt-auto py-2"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  const _component_v_list_item_icon = resolveComponent("v-list-item-icon");
  const _component_release_progress = resolveComponent("release-progress");
  return openBlock(), createBlock(VHover, null, {
    default: withCtx(({ hover }) => [
      createVNode(VCard, {
        class: "grey darken-3 release-card",
        onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("click"))
      }, {
        default: withCtx(() => [
          createVNode(VImg, {
            transition: false,
            "aspect-ratio": ".7",
            src: $options.poster
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
                                    createTextVNode(toDisplayString(item.title), 1)
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
                                dense: "",
                                outlined: "",
                                "hide-details": "",
                                label: _ctx.$t("favorites.releaseDomain"),
                                onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                                }, ["stop"]))
                              }, null, 8, ["modelValue", "items", "label"])
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
                                      default: withCtx(() => [..._cache[6] || (_cache[6] = [
                                        createTextVNode("mdi-check", -1)
                                      ])]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    !item.copied && item.isExternal ? (openBlock(), createBlock(VIcon, { key: 1 }, {
                                      default: withCtx(() => [..._cache[7] || (_cache[7] = [
                                        createTextVNode("mdi-open-in-new", -1)
                                      ])]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    !item.copied && !item.isExternal ? (openBlock(), createBlock(VIcon, { key: 2 }, {
                                      default: withCtx(() => [..._cache[8] || (_cache[8] = [
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
              createVNode(VFadeTransition, { mode: "out-in" }, {
                default: withCtx(() => [
                  hover || $data.showMenu ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    onContextmenu: _cache[4] || (_cache[4] = (...args) => $options.show && $options.show(...args)),
                    class: "d-flex flex-column release-card--reveal grey darken-4 pa-4",
                    style: { "padding-bottom": "25px !important" }
                  }, [
                    createBaseVNode("div", _hoisted_1, toDisplayString($options.title), 1),
                    createBaseVNode("div", _hoisted_2, [
                      createBaseVNode("div", _hoisted_3, toDisplayString($options.description), 1)
                    ]),
                    $options.status || $options.rating ? (openBlock(), createElementBlock("div", _hoisted_4, [
                      $options.rating ? (openBlock(), createBlock(VChip, {
                        key: 0,
                        color: "secondary",
                        "text-color": "white",
                        small: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($options.rating), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      $options.status ? (openBlock(), createBlock(VChip, {
                        key: 1,
                        color: "gray",
                        "text-color": "white",
                        small: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($options.status), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ], 32)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_release_progress, mergeProps({ release: _ctx.release, episodes: $options.episodes, totalEpisodes: $data.totalEpisodes }, {
                transition: false,
                dense: "",
                center: "",
                square: "",
                class: "release-card--progress",
                height: "25"
              }), null, 16)
            ]),
            _: 2
          }, 1032, ["src"])
        ]),
        _: 2
      }, 1024)
    ]),
    _: 1
  });
}
const FavoritesRelease = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-674885ae"]]);
const props$3 = {
  releases: {
    type: Array,
    default: null
  }
};
const _sfc_main$7 = {
  props: props$3,
  components: {
    Release: FavoritesRelease
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_release = resolveComponent("release");
  return openBlock(), createBlock(VRow, { dense: "" }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.releases, (release) => {
        return openBlock(), createBlock(VCol, {
          key: release.id,
          cols: "3",
          lg: "2"
        }, {
          default: withCtx(() => [
            createVNode(_component_release, mergeProps({ ref_for: true }, { release }, {
              onClick: ($event) => _ctx.$emit("toRelease", release)
            }), null, 16, ["onClick"])
          ]),
          _: 2
        }, 1024);
      }), 128))
    ]),
    _: 1
  });
}
const FavoritesFlowView = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const props$2 = {
  year: {
    type: String,
    default: null
  },
  releases: {
    type: Array,
    default: null
  }
};
const _sfc_main$6 = {
  props: props$2,
  components: {
    Release: FavoritesRelease
  },
  computed: {
    _years() {
      return useFavoritesStore().settings.years_collapsed;
    },
    /**
     * Check if year is collapsed
     *
     * @return {boolean}
     */
    collapsed() {
      return (this._years || []).findIndex((year) => year === this.year) > -1;
    },
    /**
     * Get subtitle string
     *
     * @return {string}
     */
    subtitle() {
      return [this.items, this.episodes].join(", ");
    },
    /**
     * Get releases number
     *
     * @return {string}
     */
    items() {
      return stringsPluralize((this.releases || []).length, this.$t("units.release"));
    },
    /**
     * Get episodes number
     *
     * @return {T | *}
     */
    episodes() {
      const episodes = (this.releases || []).reduce((storage, release) => storage + (this.$__get(release, "episodes") || []).length, 0);
      return stringsPluralize(episodes, this.$t("units.episode"));
    },
    /**
     * Get genres
     *
     * @return {string}
     */
    genres() {
      const genres = (this.releases || []).reduce((storage, release) => [...storage, ...this.$__get(release, "genres") || []], []);
      return [...new Set(genres)].sort((a, b) => a.localeCompare(b)).join(", ");
    }
  },
  methods: {
    _setSettingsYearsCollapsed(year) {
      useFavoritesStore().setSettingsYearsCollapsed(year);
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_release = resolveComponent("release");
  return openBlock(), createBlock(VCard, {
    flat: "",
    color: "transparent"
  }, {
    default: withCtx(() => [
      createVNode(VCardTitle, {
        style: { cursor: "pointer" },
        onClick: _cache[1] || (_cache[1] = ($event) => $options._setSettingsYearsCollapsed(_ctx.year))
      }, {
        default: withCtx(() => [
          createBaseVNode("span", null, toDisplayString(_ctx.year), 1),
          createVNode(VDivider, { class: "mx-6" }),
          createVNode(VBtn, {
            icon: "",
            color: "grey",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $options._setSettingsYearsCollapsed(_ctx.year), ["stop"]))
          }, {
            default: withCtx(() => [
              createVNode(VIcon, null, {
                default: withCtx(() => [
                  createTextVNode("mdi-arrow-" + toDisplayString($options.collapsed ? "down" : "up"), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VCardSubtitle, {
        textContent: toDisplayString($options.subtitle),
        class: "pb-0"
      }, null, 8, ["textContent"]),
      createVNode(VCardSubtitle, {
        textContent: toDisplayString($options.genres),
        class: "pt-0"
      }, null, 8, ["textContent"]),
      !$options.collapsed ? (openBlock(), createBlock(VRow, {
        key: 0,
        dense: ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.releases, (release) => {
            return openBlock(), createBlock(VCol, {
              key: release.id,
              cols: "3",
              lg: "2"
            }, {
              default: withCtx(() => [
                createVNode(_component_release, mergeProps({ ref_for: true }, { release }, {
                  onClick: ($event) => _ctx.$emit("toRelease", release)
                }), null, 16, ["onClick"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const YearsViewYear = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const props$1 = {
  releases: {
    type: Array,
    default: null
  }
};
const _sfc_main$5 = {
  props: props$1,
  components: {
    Year: YearsViewYear
  },
  computed: {
    /**
     * Get years groups
     *
     * @return {array}
     */
    years() {
      const years = {};
      (this.releases || []).forEach((release) => {
        const year = release.year;
        years[year] = { ...years[year] };
        years[year].year = year;
        years[year].releases = [...years[year].releases || [], ...[release]];
      });
      return Object.values(years).sort((a, b) => b.year - a.year);
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_year = resolveComponent("year");
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.years, (item, k) => {
      return openBlock(), createBlock(_component_year, mergeProps({ ref_for: true }, item, {
        class: "mb-2",
        key: k,
        onToRelease: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toRelease", $event))
      }), null, 16);
    }), 128))
  ]);
}
const FavoritesYearsView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = {};
function _sfc_render$4(_ctx, _cache) {
  return openBlock(), createBlock(VRow, { dense: "" }, {
    default: withCtx(() => [
      (openBlock(), createElementBlock(Fragment, null, renderList(18, (k) => {
        return createVNode(VCol, {
          key: k,
          cols: "3",
          lg: "2"
        }, {
          default: withCtx(() => [
            createVNode(VImg, {
              transition: false,
              "aspect-ratio": ".7"
            }, {
              default: withCtx(() => [
                createVNode(VSkeletonLoader, {
                  boilerplate: "",
                  type: "image",
                  height: "100%",
                  width: "100%"
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        });
      }), 64))
    ]),
    _: 1
  });
}
const FavoritesLoader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const props = {
  search: {
    type: String,
    default: null
  },
  settings: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$3 = {
  props
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VLayout, { class: "shrink" }, {
    default: withCtx(() => [
      createVNode(VTextField, {
        solo: "",
        clearable: "",
        "hide-details": "",
        class: "mr-2",
        placeholder: _ctx.$t("favorites.searchPlaceholder"),
        "prepend-inner-icon": "mdi-magnify",
        value: _ctx.search,
        onInput: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:search", $event))
      }, null, 8, ["placeholder", "value"]),
      createVNode(VBtn, mergeProps({ loading: _ctx.loading }, {
        class: "mr-2",
        height: "48",
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("reload"))
      }), {
        default: withCtx(() => [
          createVNode(VIcon, {
            small: "",
            class: "mr-2"
          }, {
            default: withCtx(() => [..._cache[3] || (_cache[3] = [
              createTextVNode("mdi-refresh", -1)
            ])]),
            _: 1
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("common.reload")), 1)
        ]),
        _: 1
      }, 16),
      createVNode(VBtn, mergeProps({ loading: _ctx.loading }, {
        height: "48",
        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("update:settings", !_ctx.settings))
      }), {
        default: withCtx(() => [
          createVNode(VIcon, {
            small: "",
            class: "mr-2"
          }, {
            default: withCtx(() => [..._cache[4] || (_cache[4] = [
              createTextVNode("mdi-settings", -1)
            ])]),
            _: 1
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("common.settings")), 1)
        ]),
        _: 1
      }, 16)
    ]),
    _: 1
  });
}
const FavoritesToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  data() {
    return {
      sort: [
        {
          title: this.$t("favorites.sortTitle"),
          value: "title"
        },
        {
          title: this.$t("favorites.sortPopularity"),
          value: "rating"
        },
        {
          title: this.$t("favorites.sortFavoriteDate"),
          value: "original"
        },
        {
          title: this.$t("favorites.sortUpdates"),
          value: "updates"
        }
      ],
      group: [
        {
          title: this.$t("favorites.noGrouping"),
          value: "original"
        },
        {
          title: this.$t("favorites.yearsGrouping"),
          value: "years"
        }
      ]
    };
  },
  computed: {
    _sort() {
      return useFavoritesStore().settings.sort;
    },
    _group() {
      return useFavoritesStore().settings.group;
    },
    _show_seen() {
      return useFavoritesStore().settings.show_seen;
    },
    _show_completed() {
      return useFavoritesStore().settings.show_completed;
    }
  },
  methods: {
    _setSettingsSort(v) {
      useFavoritesStore().setSettingsSort(v);
    },
    _setSettingsGroup(v) {
      useFavoritesStore().setSettingsGroup(v);
    },
    _setSettingsShowSeen(v) {
      useFavoritesStore().setSettingsShowSeen(v);
    },
    _setSettingsShowCompleted(v) {
      useFavoritesStore().setSettingsShowCompleted(v);
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  return openBlock(), createElementBlock("div", null, [
    createVNode(VCard, { class: "mb-2" }, {
      default: withCtx(() => [
        createVNode(VListItem, {
          class: "py-2",
          onClick: _cache[0] || (_cache[0] = ($event) => $options._setSettingsShowSeen(!$options._show_seen))
        }, {
          default: withCtx(() => [
            createVNode(_component_v_list_item_content, null, {
              default: withCtx(() => [
                createVNode(VListItemTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.watchedReleases")), 1)
                  ]),
                  _: 1
                }),
                createVNode(VListItemSubtitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.watchedReleasesHint")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(VListItemAction, null, {
              default: withCtx(() => [
                createVNode(VSwitch, {
                  "input-value": $options._show_seen,
                  onClick: $options._setSettingsShowSeen
                }, null, 8, ["input-value", "onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(VCard, { class: "mb-2" }, {
      default: withCtx(() => [
        createVNode(VListItem, {
          class: "py-2",
          onClick: _cache[1] || (_cache[1] = ($event) => $options._setSettingsShowCompleted(!$options._show_completed))
        }, {
          default: withCtx(() => [
            createVNode(_component_v_list_item_content, null, {
              default: withCtx(() => [
                createVNode(VListItemTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.completedOnly")), 1)
                  ]),
                  _: 1
                }),
                createVNode(VListItemSubtitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.completedOnlyHint")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(VListItemAction, null, {
              default: withCtx(() => [
                createVNode(VSwitch, {
                  "input-value": $options._show_completed,
                  onClick: $options._setSettingsShowCompleted
                }, null, 8, ["input-value", "onClick"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(VCard, { class: "mb-2" }, {
      default: withCtx(() => [
        createVNode(VListItem, { class: "py-2" }, {
          default: withCtx(() => [
            createVNode(_component_v_list_item_content, null, {
              default: withCtx(() => [
                createVNode(VListItemTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.sorting")), 1)
                  ]),
                  _: 1
                }),
                createVNode(VListItemSubtitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.sortingHint")), 1)
                  ]),
                  _: 1
                }),
                createVNode(VSelect, {
                  outlined: "",
                  "hide-details": "",
                  class: "mt-4",
                  "item-text": "title",
                  "item-value": "value",
                  placeholder: _ctx.$t("favorites.sorting"),
                  items: $data.sort,
                  value: $options._sort,
                  onInput: $options._setSettingsSort
                }, null, 8, ["placeholder", "items", "value", "onInput"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(VCard, null, {
      default: withCtx(() => [
        createVNode(VListItem, { class: "py-2" }, {
          default: withCtx(() => [
            createVNode(_component_v_list_item_content, null, {
              default: withCtx(() => [
                createVNode(VListItemTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.grouping")), 1)
                  ]),
                  _: 1
                }),
                createVNode(VListItemSubtitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("favorites.groupingHint")), 1)
                  ]),
                  _: 1
                }),
                createVNode(VSelect, {
                  outlined: "",
                  "hide-details": "",
                  class: "mt-4",
                  "item-text": "title",
                  "item-value": "value",
                  placeholder: _ctx.$t("favorites.grouping"),
                  items: $data.group,
                  value: $options._group,
                  onInput: $options._setSettingsGroup
                }, null, 8, ["placeholder", "items", "value", "onInput"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
const FavoritesSettings = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const LibriaTyan02 = "" + new URL("LibriaTyan02-BBmiEKBQ.svg", import.meta.url).href;
const _sfc_main$1 = {
  data() {
    return {
      image: LibriaTyan02
    };
  },
  methods: {
    toLogin
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VLayout, {
    "fill-height": "",
    "align-center": "",
    "justify-center": ""
  }, {
    default: withCtx(() => [
      createVNode(VLayout, {
        "align-center": "",
        "justify-center": ""
      }, {
        default: withCtx(() => [
          createVNode(VCol, {
            cols: "12",
            sm: "3",
            "align-self": "center"
          }, {
            default: withCtx(() => [
              createVNode(VImg, {
                transition: false,
                class: "image",
                contain: "",
                src: $data.image
              }, null, 8, ["src"])
            ]),
            _: 1
          }),
          createVNode(VCol, {
            cols: "12",
            sm: "6",
            "align-self": "center"
          }, {
            default: withCtx(() => [
              createVNode(VCard, {
                flat: "",
                color: "transparent"
              }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("favorites.title")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, toDisplayString(_ctx.$t("favorites.subtitle")), 1),
                      createBaseVNode("div", null, toDisplayString(_ctx.$t("favorites.authorizationHint")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VLayout, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, { onClick: $options.toLogin }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("favorites.authorize")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FavoritesAuthorization = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "Favorites.View",
  meta() {
    return { title: this.$t("favorites.pageTitle") };
  },
  components: {
    Loader: FavoritesLoader,
    Toolbar: FavoritesToolbar,
    Settings: FavoritesSettings,
    Authorization: FavoritesAuthorization
  },
  data() {
    return {
      search: null,
      settings: false,
      l: false
    };
  },
  computed: {
    _isAuthorized() {
      return useAccountStore().isAuthorized;
    },
    _items() {
      return useFavoritesStore().items;
    },
    _loading() {
      return useFavoritesStore().loading;
    },
    _settings() {
      return useFavoritesStore().settings;
    },
    /**
     * Get view
     *
     * @return {*}
     */
    view() {
      const group = this.$__get(this._settings, "group");
      if (group === "original") return FavoritesFlowView;
      if (group === "years") return FavoritesYearsView;
    },
    /**
     * Create searchable entity
     *
     * @return {*}
     */
    releasesSearchable() {
      const options = {
        keys: ["names.ru", "names.original"],
        threshold: 0.2
      };
      return new Fuse(this._items, options);
    },
    /**
     * Get releases
     * Sort with provided type
     * Check seen releases
     * Check search
     *
     * @return {array}
     */
    releases() {
      const sort = this.$__get(this._settings, "sort");
      const search = this.search;
      const show_seen = this.$__get(this._settings, "show_seen") || false;
      const show_completed = this.$__get(this._settings, "show_completed");
      let releases = [...this._items || []];
      if (sort === "title") releases = releases.sort((a, b) => a.names.ru.localeCompare(b.names.ru));
      if (sort === "updates") releases = releases.sort((a, b) => b.datetime.system - a.datetime.system);
      if (sort === "rating") releases = releases.sort((a, b) => b.favoriteRating.count - a.favoriteRating.count);
      if (search) releases = this.releasesSearchable.search(search);
      releases = releases.filter((release) => {
        const release_id = release.id;
        const episodes = (this.$__get(release, "episodes") || []).map((x) => x.id);
        const statusCode = this.$__get(release, "statusCode");
        const payload = {
          release_id,
          episodes
        };
        const progress = useWatchStore().getReleaseProgress(payload);
        return (progress < 100 || progress === 100 && show_seen === true) && (Number(statusCode) !== 1 || Number(statusCode) === 1 && show_completed === false);
      });
      return releases;
    }
  },
  methods: {
    _getFavorites() {
      return useFavoritesStore().getFavorites();
    },
    toLogin,
    toRelease
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_settings = resolveComponent("settings");
  const _component_toolbar = resolveComponent("toolbar");
  const _component_loader = resolveComponent("loader");
  const _component_authorization = resolveComponent("authorization");
  return $options._isAuthorized ? (openBlock(), createBlock(VLayout, {
    key: 0,
    column: ""
  }, {
    default: withCtx(() => [
      createVNode(VCard, {
        flat: "",
        color: "transparent"
      }, {
        default: withCtx(() => [
          createVNode(VCardTitle, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$t("favorites.title")), 1)
            ]),
            _: 1
          }),
          createVNode(VCardSubtitle, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$t("favorites.subtitle")), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(VExpandTransition, null, {
        default: withCtx(() => [
          $data.settings ? (openBlock(), createBlock(_component_settings, {
            key: 0,
            class: "mb-2"
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(_component_toolbar, {
        class: "mb-2",
        loading: $options._loading,
        search: $data.search,
        settings: $data.settings,
        onReload: $options._getFavorites
      }, null, 8, ["loading", "search", "settings", "onReload"]),
      $options._loading && !$options.releases.length ? (openBlock(), createBlock(_component_loader, {
        key: 0,
        class: "my-2"
      })) : createCommentVNode("", true),
      !$options._loading || $options.releases.length ? (openBlock(), createBlock(resolveDynamicComponent($options.view), mergeProps({ key: 1 }, { releases: $options.releases }, {
        class: "my-2",
        onToRelease: $options.toRelease
      }), null, 16, ["onToRelease"])) : createCommentVNode("", true)
    ]),
    _: 1
  })) : (openBlock(), createBlock(_component_authorization, { key: 1 }));
}
const FavoritesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FavoritesView as default
};
