import { L as LibriaTyan01 } from "./LibriaTyan01-DlPDW3gN.js";
import { _ as _export_sfc, K as createBlock, L as withCtx, M as VLayout, N as openBlock, l as createVNode, O as VRow, P as VCol, Q as VImg, R as VCard, ac as VCardTitle, W as createTextVNode, T as toDisplayString, S as VCardText, n as createBaseVNode, t as VBtn, a7 as createElementBlock, ae as Fragment, af as renderList, a8 as VSkeletonLoader, q as normalizeClass, r as mergeProps, U as createCommentVNode, V as VIcon, ab as resolveComponent, aT as VSlideGroup, ag as VChip, b8 as toRelease, a9 as toVideo, bh as AppKeyboardHandlerMixin, bi as VFadeTransition, bj as useReleasesStore, bk as useAppStore } from "./index-BZ1Qg9LU.js";
import { R as ReleaseFavorite } from "./ReleaseFavorite-BSuv1n56.js";
const _sfc_main$9 = {
  data() {
    return {
      image: LibriaTyan01
    };
  },
  methods: {
    reload() {
      window.location.reload();
    }
  }
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VLayout, {
    "fill-height": "",
    "align-center": "",
    "justify-center": ""
  }, {
    default: withCtx(() => [
      createVNode(VRow, {
        justify: "center",
        align: "center"
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
                      createTextVNode(toDisplayString(_ctx.$t("releasesView.errorTitle")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, toDisplayString(_ctx.$t("releasesView.errorSubtitlePrimary")), 1),
                      createBaseVNode("div", null, toDisplayString(_ctx.$t("releasesView.errorSubtitleSecondary")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VLayout, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, { onClick: $options.reload }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("releasesView.retry")), 1)
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
const ReleasesError = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const _sfc_main$8 = {};
function _sfc_render$8(_ctx, _cache) {
  return openBlock(), createBlock(VLayout, { class: "shrink" }, {
    default: withCtx(() => [
      (openBlock(), createElementBlock(Fragment, null, renderList(14, (i) => {
        return createVNode(VSkeletonLoader, {
          boilerplate: "",
          type: "image",
          width: "14.5vw",
          height: "34.5vh",
          "min-width": "175",
          "min-height": "250",
          key: i
        });
      }), 64))
    ]),
    _: 1
  });
}
const SliderLoader = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const props$4 = {
  release: {
    type: Object,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  }
};
const _sfc_main$7 = {
  props: props$4,
  computed: {
    /**
     * Get get
     *
     * @return {string}
     */
    key() {
      return `poster:${this.release ? this.release.id : null}`;
    },
    /**
     * Get poster full src
     *
     * @return {string|null}
     */
    src() {
      return this.$__get(this.release, "poster");
    }
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "fill-height",
  style: { background: "black", opacity: 0.75 }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VCard, {
    class: normalizeClass(["black", { primary: _ctx.active }]),
    width: "14.5vw",
    height: "34.5vh",
    "min-width": "175",
    "min-height": "250",
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click")),
    onDblclick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("dblclick"))
  }, {
    default: withCtx(() => [
      $options.src ? (openBlock(), createBlock(VImg, mergeProps({
        key: 0,
        transition: false
      }, { key: $options.key, src: $options.src }, {
        eager: "",
        height: "100%",
        class: ["black", { "elevation-16": _ctx.active }]
      }), {
        default: withCtx(() => [
          !_ctx.active ? (openBlock(), createElementBlock("div", _hoisted_1$1)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 16, ["class"])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class"]);
}
const SliderPoster = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const props$3 = {
  loading: {
    type: Boolean,
    default: false
  },
  value: {
    type: Number,
    default: null
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  releases: {
    type: Array,
    default: null
  }
};
const _sfc_main$6 = {
  props: props$3,
  computed: {
    /**
     * Calculate direction
     *
     * @return {string|null}
     */
    direction() {
      if (this.left) return "left";
      if (this.right) return "right";
      return null;
    },
    /**
     * Check if control is disabled
     *
     * @return {boolean}
     */
    isDisabled() {
      const is_loading = this.loading;
      let is_extremum = false;
      if (this.left) is_extremum = this.value <= 0;
      if (this.right) is_extremum = this.value >= this.releases.length - 1;
      return is_loading || is_extremum;
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VLayout, {
    class: normalizeClass(["controls", `controls--${$options.direction}`])
  }, {
    default: withCtx(() => [
      createVNode(VBtn, {
        icon: "",
        disabled: $options.isDisabled,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
      }, {
        default: withCtx(() => [
          createVNode(VIcon, null, {
            default: withCtx(() => [
              createTextVNode("mdi-arrow-" + toDisplayString($options.direction), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["disabled"])
    ]),
    _: 1
  }, 8, ["class"]);
}
const SliderControl = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-24cf6ab1"]]);
const props$2 = {
  value: {
    type: Number,
    default: null
  },
  releases: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: true
  }
};
const _sfc_main$5 = {
  props: props$2,
  components: {
    Loader: SliderLoader,
    Poster: SliderPoster,
    Control: SliderControl
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_control = resolveComponent("control");
  const _component_loader = resolveComponent("loader");
  const _component_poster = resolveComponent("poster");
  const _component_v_slide_item = resolveComponent("v-slide-item");
  return _ctx.loading || _ctx.releases.length > 0 ? (openBlock(), createBlock(VLayout, {
    key: 0,
    "align-center": "",
    class: "shrink release__slider"
  }, {
    default: withCtx(() => [
      createVNode(_component_control, mergeProps({ loading: _ctx.loading, value: _ctx.value, releases: _ctx.releases }, {
        left: "",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("previous"))
      }), null, 16),
      createVNode(VSlideGroup, mergeProps({ value: _ctx.value }, {
        mandatory: "",
        "center-active": "",
        "show-arrows": false,
        onChange: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("input", $event))
      }), {
        default: withCtx(() => [
          _ctx.loading ? (openBlock(), createBlock(_component_loader, { key: 0 })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.releases, (release, k) => {
            return openBlock(), createBlock(_component_v_slide_item, { key: k }, {
              default: withCtx(({ active, toggle }) => [
                createVNode(_component_poster, mergeProps({ ref_for: true }, { release, active }, {
                  onClick: toggle,
                  onDblclick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("toVideo"))
                }), null, 16, ["onClick"])
              ]),
              _: 2
            }, 1024);
          }), 128))
        ]),
        _: 1
      }, 16),
      createVNode(_component_control, mergeProps({ loading: _ctx.loading, value: _ctx.value, releases: _ctx.releases }, {
        right: "",
        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("next"))
      }), null, 16)
    ]),
    _: 1
  })) : createCommentVNode("", true);
}
const ReleasesSlider = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-e93dcacd"]]);
const _sfc_main$4 = {};
function _sfc_render$4(_ctx, _cache) {
  return openBlock(), createBlock(VLayout, { column: "" }, {
    default: withCtx(() => [
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "heading",
        class: "mt-4"
      }),
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "text",
        class: "mt-4",
        width: "130"
      }),
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "text",
        class: "mt-1",
        width: "220"
      }),
      createVNode(VLayout, { class: "my-2" }, {
        default: withCtx(() => [
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "button",
            class: "mr-1",
            width: "64"
          }),
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "button",
            class: "mr-1",
            width: "75"
          }),
          createVNode(VSkeletonLoader, {
            boilerplate: "",
            type: "button",
            width: "160"
          })
        ]),
        _: 1
      }),
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "paragraph",
        class: "mt-4"
      })
    ]),
    _: 1
  });
}
const ReleasesReleaseLoader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const props$1 = {
  release: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: true
  },
  episode: {
    type: Object,
    default: null
  }
};
const _sfc_main$3 = {
  props: props$1,
  components: {
    Loader: ReleasesReleaseLoader,
    Favorite: ReleaseFavorite
  },
  computed: {
    /**
     * Get release title
     *
     * @return {string|null}
     */
    title() {
      return this.$__get(this.release, "names.ru");
    },
    /**
     * Get subtitle
     *
     * @return {string|null}
     */
    subtitle() {
      return this.$__get(this.release, "names.original");
    },
    /**
     * Get release genres
     *
     * @return {string|null}
     */
    genres() {
      return (this.$__get(this.release, "genres") || []).join(" | ");
    },
    /**
     * Get description
     *
     * @return {string|null}
     */
    description() {
      return this.$__get(this.release, "description");
    },
    /**
    * Get release type
    *
    * @return {*}
    */
    type() {
      return this.$__get(this.release, "type");
    }
  }
};
const _hoisted_1 = {
  key: 1,
  style: { maxWidth: "100%" }
};
const _hoisted_2 = { class: "allow-select display-2 font-weight-black text-truncate" };
const _hoisted_3 = { class: "allow-select subtitle-1" };
const _hoisted_4 = { class: "body-2" };
const _hoisted_5 = { class: "allow-select my-3 grey--text lighten-1 text-clamp" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_loader = resolveComponent("loader");
  const _component_favorite = resolveComponent("favorite");
  return openBlock(), createBlock(VLayout, { class: "release__data" }, {
    default: withCtx(() => [
      _ctx.loading ? (openBlock(), createBlock(_component_loader, { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, toDisplayString($options.title), 1),
        createBaseVNode("div", _hoisted_3, toDisplayString($options.subtitle), 1),
        createBaseVNode("div", _hoisted_4, toDisplayString($options.genres), 1),
        createVNode(VLayout, { class: "my-3" }, {
          default: withCtx(() => [
            createVNode(_component_favorite, mergeProps({ release: _ctx.release }, { class: "mr-1" }), null, 16),
            createVNode(VChip, {
              textContent: toDisplayString(_ctx.episode.title),
              label: "",
              color: "secondary",
              class: "font-weight-black mr-1",
              style: { height: "36px" }
            }, null, 8, ["textContent"]),
            createVNode(VChip, {
              textContent: toDisplayString($options.type),
              label: "",
              color: "grey darken-4",
              style: { height: "36px" }
            }, null, 8, ["textContent"])
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_5, toDisplayString($options.description), 1)
      ]))
    ]),
    _: 1
  });
}
const ReleasesRelease = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-2300a5d6"]]);
const _sfc_main$2 = {};
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createBlock(VLayout, { class: "shrink" }, {
    default: withCtx(() => [
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "button",
        width: "120",
        class: "mr-1"
      }),
      createVNode(VSkeletonLoader, {
        boilerplate: "",
        type: "button",
        width: "85"
      })
    ]),
    _: 1
  });
}
const ActionsLoader = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const props = {
  loading: {
    type: Boolean,
    default: false
  },
  release: {
    type: Object,
    default: null
  }
};
const _sfc_main$1 = {
  props,
  components: {
    Loader: ActionsLoader
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_loader = resolveComponent("loader");
  return _ctx.loading ? (openBlock(), createBlock(_component_loader, { key: 0 })) : (openBlock(), createBlock(VLayout, {
    key: 1,
    class: "shrink"
  }, {
    default: withCtx(() => [
      createVNode(VBtn, {
        class: "mr-1",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toVideo"))
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$t("releasesView.watch")), 1)
        ]),
        _: 1
      }),
      createVNode(VBtn, {
        class: "mr-1",
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("toRelease"))
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$t("common.release")), 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }));
}
const ReleasesActions = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "Releases.View",
  meta() {
    return { title: this.$t("releases.pageTitle") };
  },
  mixins: [AppKeyboardHandlerMixin],
  components: {
    Error: ReleasesError,
    Slider: ReleasesSlider,
    Release: ReleasesRelease,
    Actions: ReleasesActions
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    _drawer() {
      return useAppStore().drawer;
    },
    _is_searching() {
      return useAppStore().is_searching;
    },
    _index() {
      return useReleasesStore().index;
    },
    _loading() {
      return useReleasesStore().loading;
    },
    _releases() {
      return useReleasesStore().data || [];
    },
    _has_error() {
      return useReleasesStore().has_error;
    },
    index: {
      /**
       * Get release index using it's hash
       * If no releases with last saved hash -> get first
       *
       * @return number
       */
      get() {
        const releaseIndex = this._releases.findIndex((release) => this._index === release.id);
        return releaseIndex > -1 ? releaseIndex : 0;
      },
      /**
       * Get hash from release with provided index
       * Save hash to store
       *
       * @param index
       * @return void
       */
      set(index) {
        this._setIndex(this._releases[index] ? this._releases[index].id : null);
      }
    },
    /**
     * Get active release
     *
     * @return {*|null}
     */
    release() {
      return this._releases[this.index] || null;
    },
    /**
     * Get episode
     *
     * @return Object|null
     */
    episode() {
      return this.$__get(this.release, ["episodes", 0]) || null;
    }
  },
  methods: {
    _setIndex(index) {
      useReleasesStore().setIndex(index);
    },
    /**
     * Push to video
     *
     */
    toVideo,
    /**
     * Push to release
     *
     */
    toRelease,
    /**
     * Listen keyboard event
     *
     * @param e
     * @return void
     */
    handleKeyboardEvents(e) {
      const code = e.which || e.keyCode;
      if (code === 32 || code === 13) {
        if (this._drawer === false && this._is_searching === false) {
          this.toVideo();
        }
      }
      if (code === 37) this.previous();
      if (code === 39) this.next();
    },
    /**
     * Move to next slide
     *
     * @return void
     */
    next() {
      if (this.index < this._releases.length - 1) this.index = this.index + 1;
    },
    /**
     * Move to previous slide
     *
     * @return void
     */
    previous() {
      if (this.index > 0) this.index = this.index - 1;
    }
  },
  watch: {
    _loading: {
      immediate: true,
      handler(_loading) {
        if (_loading === false && this.loading === true) {
          this.loading = false;
        }
      }
    },
    _has_error: {
      handler() {
        this.loading = true;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_slider = resolveComponent("slider");
  const _component_release = resolveComponent("release");
  const _component_actions = resolveComponent("actions");
  const _component_error = resolveComponent("error");
  return openBlock(), createBlock(VFadeTransition, {
    appear: "",
    mode: "out-in"
  }, {
    default: withCtx(() => [
      $data.loading || !$options._has_error ? (openBlock(), createBlock(VLayout, {
        key: 0,
        column: "",
        "justify-center": "",
        class: "releases"
      }, {
        default: withCtx(() => [
          createVNode(_component_slider, mergeProps({ loading: $data.loading }, {
            modelValue: $options.index,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.index = $event),
            class: "mb-4",
            releases: $options._releases,
            onNext: $options.next,
            onPrevious: $options.previous,
            onToVideo: _cache[1] || (_cache[1] = ($event) => $options.toVideo($options.release, $options.episode))
          }), null, 16, ["modelValue", "releases", "onNext", "onPrevious"]),
          (openBlock(), createBlock(_component_release, mergeProps({ loading: $data.loading, release: $options.release, episode: $options.episode }, {
            class: "mb-4",
            key: $options.release ? $options.release.id : null
          }), null, 16)),
          createVNode(_component_actions, mergeProps({ loading: $data.loading, release: $options.release }, {
            onToVideo: _cache[2] || (_cache[2] = ($event) => $options.toVideo($options.release, $options.episode)),
            onToRelease: _cache[3] || (_cache[3] = ($event) => $options.toRelease($options.release))
          }), null, 16)
        ]),
        _: 1
      })) : !$data.loading && $options._has_error ? (openBlock(), createBlock(_component_error, { key: 1 })) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const ReleasesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-463f193f"]]);
export {
  ReleasesView as default
};
