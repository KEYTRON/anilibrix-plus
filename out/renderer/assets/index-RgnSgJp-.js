import { g as genericComponent, u as useProxiedModel, X as useFocus, Y as useId, Z as useRender, $ as filterInputAttrs, a0 as VInput, a1 as VCheckboxBtn, l as createVNode, r as mergeProps, a2 as forwardRefs, a3 as ref, p as propsFactory, a4 as omit, a5 as makeVCheckboxBtnProps, a6 as makeVInputProps, _ as _export_sfc, a7 as createElementBlock, L as withCtx, M as VLayout, N as openBlock, a8 as VSkeletonLoader, a9 as toVideo, aa as __orderBy, K as createBlock, R as VCard, ab as resolveComponent, n as createBaseVNode, t as VBtn, W as createTextVNode, T as toDisplayString, U as createCommentVNode, ac as VCardTitle, ad as VCardSubtitle, ae as Fragment, af as renderList, ag as VChip, S as VCardText, ah as meta, ai as humanFormat, aj as VListItem, ak as VDivider, al as VListItemTitle, am as VListItemSubtitle, V as VIcon, an as VListItemAction, ao as withModifiers, ap as VList, aq as invokeTorrentParse, ar as dayjs, as as useSettingsStore, j as useTextColor, at as useBackgroundColor, o as normalizeStyle, q as normalizeClass, au as animate, av as standardEasing, a as computed, aw as makeVBtnProps, ax as keys, b as provideTheme, ay as useRtl, k as useLocale, az as useGroup, aA as watch, aB as withDirectives, aC as PREFERS_REDUCED_MOTION, aD as convertToUnit, aE as nextTick, z as makeThemeProps, A as makeTagProps, H as makeComponentProps, v as toRef, aF as IN_BROWSER, aG as getScrollParent, aH as shallowRef, aI as provide, aJ as inject, aK as useGroupItem, aL as useSsrBoot, aM as useLazy, aN as vShow, aO as MaybeTransition, aP as makeLazyProps, aQ as makeGroupItemProps, e as useDensity, aR as useScopeId, aS as provideDefaults, aT as VSlideGroup, G as makeDensityProps, aU as makeVSlideGroupProps, aV as pick, aW as isObject, aX as ReleaseEpisodes, aY as router, aZ as VCardActions, a_ as VMenu, a$ as VSelect, b0 as toHandlers, Q as VImg, b1 as resolveDynamicComponent, O as VRow, P as VCol } from "./index-BZ1Qg9LU.js";
import { R as ReleaseFavorite } from "./ReleaseFavorite-BSuv1n56.js";
import { useReleaseStore } from "./useReleaseStore-CpQmbHaP.js";
import { L as LibriaTyan01 } from "./LibriaTyan01-DlPDW3gN.js";
const makeVCheckboxProps = propsFactory({
  ...omit(makeVInputProps(), ["direction"]),
  ...omit(makeVCheckboxBtnProps(), ["inline"])
}, "VCheckbox");
const VCheckbox = genericComponent()({
  name: "VCheckbox",
  inheritAttrs: false,
  props: makeVCheckboxProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:focused": (focused) => true
  },
  setup(props2, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props2, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props2);
    const inputRef = ref();
    const uid = useId();
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props2);
      const checkboxProps = VCheckboxBtn.filterProps(props2);
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ["v-checkbox", props2.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": props2.id || `checkbox-${uid}`,
        "focused": isFocused.value,
        "style": props2.style
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "error": isValid.value === false,
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return forwardRefs({}, inputRef);
  }
});
const _sfc_main$5 = {};
const _hoisted_1$3 = { class: "ma-4" };
function _sfc_render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createVNode(VLayout, { "align-center": "" }, {
      default: withCtx(() => [
        createVNode(VSkeletonLoader, {
          boilerplate: "",
          type: "button",
          height: "285",
          width: "200",
          class: "mr-3"
        }),
        createVNode(VLayout, { column: "" }, {
          default: withCtx(() => [
            createVNode(VSkeletonLoader, {
              boilerplate: "",
              type: "heading",
              height: "40",
              width: "70%"
            }),
            createVNode(VSkeletonLoader, {
              boilerplate: "",
              type: "text",
              width: "140",
              class: "mt-5"
            }),
            createVNode(VSkeletonLoader, {
              boilerplate: "",
              type: "text",
              width: "260"
            }),
            createVNode(VLayout, { class: "shrink mt-4" }, {
              default: withCtx(() => [
                createVNode(VSkeletonLoader, {
                  boilerplate: "",
                  type: "button",
                  width: "65",
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
                  width: "65"
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(VSkeletonLoader, {
      boilerplate: "",
      type: "text@10",
      class: "mt-6"
    }),
    createVNode(VSkeletonLoader, {
      boilerplate: "",
      type: "heading",
      height: "200",
      width: "100%",
      class: "mt-6"
    })
  ]);
}
const ReleaseCardLoader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const props$3 = {
  loading: {
    type: Boolean,
    default: false
  },
  release: {
    type: Object,
    default: null
  }
};
const _sfc_main$4 = {
  props: props$3,
  components: {
    Loader: ReleaseCardLoader,
    Favorite: ReleaseFavorite
  },
  data() {
    return {
      teamProps: {
        voice: this.$t("release.voicedBy"),
        other: this.$t("release.creditsOther")
      }
    };
  },
  computed: {
    /**
     * Get watch data
     *
     * @return {*}
     */
    lastWatchedEpisode() {
      const { useWatchStore } = require("@store/app/watch/useWatchStore");
      let lastWatchedEpIndex = null;
      const episodes = this.$__get(this.release, "episodes");
      const ordered = __orderBy(episodes || [], ["id"], [(s) => s.episodes.order]);
      for (const i in ordered) {
        const { isSeen } = useWatchStore().getWatchedEpisode({
          release_id: this.release.id,
          episode_id: ordered[i].id
        }) || {};
        if (isSeen) {
          lastWatchedEpIndex = i;
        }
      }
      return {
        ep: ordered[lastWatchedEpIndex],
        first: ordered[0] || null,
        next: ordered[+lastWatchedEpIndex + 1]
      };
    },
    /**
     * Get title
     *
     * @return {string|null}
     */
    title() {
      return this.$__get(this.release, "names.ru");
    },
    /**
     * Get original title
     *
     * @return {string|null}
     */
    original() {
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
     * Get year
     *
     * @return {string|number|null}
     */
    year() {
      return this.$__get(this.release, "year");
    },
    /**
     * Get release type
     *
     * @return {string|null}
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
     * Get release poster
     *
     * @return {*}
     */
    poster() {
      return this.$__get(this.release, "poster");
    },
    /**
     * Get release status
     *
     * @return {*}
     */
    status() {
      return this.$__get(this.release, "status");
    },
    team() {
      return {
        voice: this.release.voices,
        other: this.release.team?.filter((t) => !this.release.voices.includes(t)) || []
      };
    }
  },
  methods: {
    toVideo
  }
};
const _hoisted_1$2 = { style: { "display": "flex", "flex-direction": "column" } };
const _hoisted_2$2 = ["src"];
const _hoisted_3$2 = {
  class: "subtitle-2",
  style: { "color": "rgb(184 184 184)" }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_loader = resolveComponent("loader");
  const _component_favorite = resolveComponent("favorite");
  return openBlock(), createBlock(VCard, {
    flat: "",
    color: "transparent"
  }, {
    default: withCtx(() => [
      _ctx.loading ? (openBlock(), createBlock(_component_loader, { key: 0 })) : (openBlock(), createBlock(VLayout, {
        key: 1,
        column: ""
      }, {
        default: withCtx(() => [
          createVNode(VLayout, {
            "align-center": "",
            class: "my-4"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$2, [
                createBaseVNode("img", {
                  class: "mx-4 rounded-lg",
                  src: $options.poster,
                  style: { "width": "230px" }
                }, null, 8, _hoisted_2$2),
                !$options.lastWatchedEpisode.ep || $options.lastWatchedEpisode.ep && !$options.lastWatchedEpisode.next ? (openBlock(), createBlock(VBtn, {
                  key: 0,
                  label: "",
                  color: "secondary",
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.toVideo(_ctx.release, $options.lastWatchedEpisode.first)),
                  class: "mx-4 my-2 font-weight-black",
                  style: { "width": "230px" }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("release.startWatching")), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                $options.lastWatchedEpisode.ep && $options.lastWatchedEpisode.next ? (openBlock(), createBlock(VBtn, {
                  key: 1,
                  label: "",
                  color: "secondary",
                  onClick: _cache[1] || (_cache[1] = ($event) => $options.toVideo(_ctx.release, $options.lastWatchedEpisode.next)),
                  class: "mx-4 my-2 font-weight-black",
                  style: { "width": "230px" }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("release.continueWatching", { episode: $options.lastWatchedEpisode.next.id })), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", null, [
                createVNode(VCardTitle, {
                  textContent: toDisplayString($options.title),
                  class: "allow-select display-1 mb-2 font-weight-black",
                  style: { wordBreak: "break-word" }
                }, null, 8, ["textContent"]),
                createVNode(VCardSubtitle, {
                  textContent: toDisplayString($options.original),
                  class: "allow-select pb-0"
                }, null, 8, ["textContent"]),
                createVNode(VCardSubtitle, {
                  textContent: toDisplayString($options.genres),
                  class: "allow-select pt-1"
                }, null, 8, ["textContent"]),
                $options.type.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($options.team, (type, prop) => {
                  return openBlock(), createElementBlock("div", {
                    style: { "margin-bottom": "-10px" },
                    key: prop,
                    class: "pl-4"
                  }, [
                    createBaseVNode("span", _hoisted_3$2, toDisplayString($data.teamProps[prop]) + ":", 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(type, (name) => {
                      return openBlock(), createBlock(VChip, {
                        key: name,
                        class: "ma-2",
                        small: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(name), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]);
                }), 128)) : createCommentVNode("", true),
                createVNode(VCardText, { class: "mb-1" }, {
                  default: withCtx(() => [
                    createVNode(_component_favorite, mergeProps({ release: _ctx.release }, { color: "grey darken-3" }), null, 16),
                    $options.year ? (openBlock(), createBlock(VChip, {
                      key: 0,
                      textContent: toDisplayString($options.year),
                      label: "",
                      color: "grey darken-3",
                      style: { height: "36px" }
                    }, null, 8, ["textContent"])) : createCommentVNode("", true),
                    $options.type ? (openBlock(), createBlock(VChip, {
                      key: 1,
                      textContent: toDisplayString($options.type),
                      label: "",
                      color: "grey darken-3",
                      style: { height: "36px" }
                    }, null, 8, ["textContent"])) : createCommentVNode("", true),
                    $options.status ? (openBlock(), createBlock(VChip, {
                      key: 2,
                      textContent: toDisplayString($options.status),
                      label: "",
                      color: "grey darken-3",
                      style: { height: "36px" }
                    }, null, 8, ["textContent"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }),
          createVNode(VCardText, {
            textContent: toDisplayString($options.description),
            class: "white--text"
          }, null, 8, ["textContent"])
        ]),
        _: 1
      }))
    ]),
    _: 1
  });
}
const ReleaseCard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const preloadScript = "(() => {\n  return {\n    width: document.getElementsByTagName('body')[0].clientWidth,\n    height: document.getElementsByTagName('body')[0].clientHeight\n  }\n})()\n";
const darkThemeStyle = ":root {\n  --text-link: #bd636c !important;\n}\n\n\nhtml, body {\n  height: auto !important;\n  overflow: hidden !important;\n  background: #121212 !important;\n}\n\n* a {\n  color: #bd636c !important;\n}\n\n.wcomments_page {\n  width: 100% !important;\n}\n\n.wcomments_head {\n  background: #1E1E1E !important;\n}\n\n.wcomments_form {\n  background: #313131 !important;\n  margin-bottom: 14px !important;\n  border: 0 !important;\n}\n\n#post_field {\n  background: transparent !important;\n  border-color: #1E1E1E !important;\n  color: white !important;\n}\n\ndiv#wcomments_export {\n  color: #868686 !important;\n}\n\n#page_wrap {\n  background: transparent !important;\n}\n\n.wall_post_text, .wall_reply_text {\n  color: #bdbdbd !important;\n}\n\n.reply_fakebox {\n  background: #121212 !important;\n  border-color: #404040 !important;\n}\n\n.reply_fakebox_wrap {\n  background: transparent !important;\n}\n\n.page_block, .post {\n  color: #bdbdbd !important;\n  background: #2f2f2f !important;\n  box-shadow: none !important;\n}\n\n.reply_highlighted {\n  background: #2f2f2f !important;\n}\n\n.post {\n  line-height: 20px !important;\n}\n\n.wr_header, ._wcomments_more {\n  background: #2f2f2f !important;\n  color: #a9a6a6 !important;\n}\n\n._wcomments_more {\n  margin-top: 6px !important;\n  margin-left: -15px !important;\n  width: calc(100% + 30px) !important;\n}\n\n#send_post {\n  background: #191919 !important;\n}\n\n.addpost_button {\n  background: #333333 !important;\n}\n\n.reply_box {\n  background: #23232366 !important;\n  border: 0 !important;\n}\n\n.reply_form {\n  background-color: transparent !important;\n  border-color: #1E1E1E !important;\n  color: white !important;\n}\n\n.reply_field {\n  color: white !important;\n  background: transparent !important;\n  border-color: #636262 !important;\n}\n\n.submit_post {\n  background: transparent !important;\n}\n";
var define_process_env_default = {};
const props$2 = {
  release: {
    type: Object,
    default: null
  }
};
const _sfc_main$3 = {
  props: props$2,
  data() {
    return {
      width: "100%",
      height: "100%",
      visible: false,
      interval: null
    };
  },
  computed: {
    /**
     * Get anilibria host
     *
     * @return {string}
     */
    anilibria() {
      return meta.links.anilibria;
    },
    /**
     * Get webview configuration
     *
     * @return {*}
     */
    configuration() {
      return {
        src: this.src,
        partition: "persist:release:comments",
        allowpopups: true,
        httpreferrer: this.anilibria,
        disablewebsecurity: true
      };
    },
    /**
     * Get comments src
     *
     * @return {string}
     */
    src() {
      const code = this.$__get(this.release, "code");
      const url = `${this.anilibria}/release/${code}.html`;
      const appId = define_process_env_default.VK_APP_ID;
      return `https://vk.com/widget_comments.php?app=${appId}&url=${url}&limit=10`;
    }
  },
  mounted() {
    const webview = this.$refs.comments;
    webview.addEventListener("did-navigate", this.didloadedEvent);
    webview.addEventListener("certificate-error", this.certError);
    webview.addEventListener("did-fail-load", this.didFailLoad);
    webview.addEventListener("dom-ready", () => {
      this.visible = false;
      webview.insertCSS(darkThemeStyle);
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        webview.executeJavaScript(preloadScript).then(({
          width,
          height
        }) => {
          this.width = width + "px";
          this.height = height + "px";
        });
      }, 50);
      setTimeout(() => this.visible = true, 1e3);
    });
  },
  methods: {
    didloadedEvent() {
      this.visible = false;
      console.log();
    },
    didFailLoad() {
      this.$toasted.error(this.$t("notifications.commentsLoadError"));
    },
    certError() {
      this.$toasted.error(this.$t("notifications.commentsLoadCertError"));
    }
  },
  beforeUnmount() {
    const webview = this.$refs.comments;
    webview.removeEventListener("did-navigate", this.didloadedEvent);
    webview.removeEventListener("certificate-error", this.certError);
    webview.removeEventListener("did-fail-load", this.didFailLoad);
    if (this.interval) clearInterval(this.interval);
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_webview = resolveComponent("webview");
  return openBlock(), createBlock(VLayout, { column: "" }, {
    default: withCtx(() => [
      $data.visible === false ? (openBlock(), createBlock(VSkeletonLoader, {
        key: 0,
        type: "list-item-avatar-three-line@19"
      })) : createCommentVNode("", true),
      createVNode(_component_webview, mergeProps($options.configuration, {
        ref: "comments",
        class: ["comments", { visible: $data.visible }],
        style: { height: $data.height }
      }), null, 16, ["class", "style"])
    ]),
    _: 1
  });
}
const ReleaseComments = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {};
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, [
    createVNode(VSkeletonLoader, {
      boilerplate: "",
      type: "list-item-two-line@2"
    })
  ]);
}
const TorrentsLoader = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const props$1 = {
  loading: {
    type: Boolean,
    default: false
  },
  torrents: {
    type: Array,
    default: []
  }
};
const _sfc_main$1 = {
  props: props$1,
  components: {
    Loader: TorrentsLoader
  },
  computed: {
    _torrentType: {
      get() {
        return useSettingsStore().torrentType;
      },
      set(v) {
        useSettingsStore().setTorrentType(v);
      }
    }
  },
  data() {
    return {
      torrentsList: [],
      parseLoading: false,
      copiedIndex: null,
      copyTimeout: null
    };
  },
  methods: {
    async copyToClipboard(link, index) {
      try {
        await navigator.clipboard.writeText(link);
        if (this.copyTimeout) {
          clearTimeout(this.copyTimeout);
        }
        this.copiedIndex = index;
        this.copyTimeout = setTimeout(() => {
          this.copiedIndex = null;
        }, 2e3);
      } catch (err) {
        console.error(err);
        this.$toasted.error(this.$t("release.torrentCopyError"));
      }
    },
    humanFormat,
    download(torrent) {
      if (this._torrentType === "magnet") {
        window.open(torrent.magnet, "_blank");
      } else {
        if (torrent.filename === "fuckyou") {
          this.$toasted.show(this.$t("release.torrentFetchError"), { type: "error" });
          return;
        }
        let downloadLink = document.createElement("a");
        downloadLink.href = "data:application/x-bittorrent;base64," + torrent.file;
        downloadLink.download = torrent.filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    },
    formatSize(size) {
      const units = this.$locale === "ru" ? ["б", "Кб", "Мб", "Гб", "Тб"] : ["B", "KB", "MB", "GB", "TB"];
      return humanFormat(size, { scale: humanFormat.Scale.create(units, 1024) });
    },
    formatTimestamp(time) {
      return dayjs.unix(time).format("DD.MM.YYYY HH:mm:ss");
    },
    async parseTorrents() {
      this.parseLoading = true;
      const torrents = this.torrents;
      for (let torrent of torrents) {
        const { file, name, magnet, url } = await invokeTorrentParse(torrent.url);
        this.torrentsList.push({
          ...torrent,
          url,
          magnet,
          file,
          filename: name
        });
      }
      this.parseLoading = false;
    }
  },
  async mounted() {
    await this.parseTorrents();
  },
  watch: {
    torrents: function() {
      this.parseTorrents();
    }
  },
  beforeUnmount() {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }
};
const _hoisted_1$1 = {
  key: 1,
  id: "torrents"
};
const _hoisted_2$1 = { class: "d-flex justify-center align-center" };
const _hoisted_3$1 = { class: "d-flex justify-center align-center mr-1" };
const _hoisted_4$1 = { class: "d-flex justify-center align-center mr-1" };
const _hoisted_5 = { class: "d-flex justify-center align-center" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_loader = resolveComponent("loader");
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  return _ctx.loading || $data.parseLoading ? (openBlock(), createBlock(_component_loader, { key: 0 })) : !_ctx.loading && !$data.parseLoading && $data.torrentsList ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
    $data.torrentsList.length > 0 ? (openBlock(), createBlock(VList, {
      key: 0,
      dense: "",
      dark: ""
    }, {
      default: withCtx(() => [
        createVNode(VListItem, null, {
          default: withCtx(() => [
            createVNode(VCheckbox, {
              modelValue: $options._torrentType,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options._torrentType = $event),
              "true-value": "magnet",
              "false-value": "file",
              label: _ctx.$t("release.torrentMagnet")
            }, null, 8, ["modelValue", "label"])
          ]),
          _: 1
        }),
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.torrentsList, (torrent, k) => {
          return openBlock(), createElementBlock(Fragment, { key: k }, [
            k > 0 ? (openBlock(), createBlock(VDivider, { key: 0 })) : createCommentVNode("", true),
            createVNode(VListItem, {
              "two-line": "",
              onClick: ($event) => $options.download(torrent)
            }, {
              default: withCtx(() => [
                createVNode(_component_v_list_item_content, null, {
                  default: withCtx(() => [
                    createVNode(VListItemTitle, { class: "d-flex justify-space-between" }, {
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(_ctx.$t("release.torrentSeries", { series: torrent.series })), 1),
                        createBaseVNode("span", null, toDisplayString($options.formatTimestamp(torrent.ctime)), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(VListItemSubtitle, { class: "d-flex justify-space-between caption grey--text text--darken-1" }, {
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString($options.formatSize(torrent.size)) + " | " + toDisplayString(torrent.quality), 1),
                        createBaseVNode("div", _hoisted_2$1, [
                          createBaseVNode("span", _hoisted_3$1, [
                            createBaseVNode("span", null, toDisplayString($options.humanFormat(torrent.seeders)), 1),
                            createVNode(VIcon, {
                              dark: "",
                              small: "",
                              color: "green"
                            }, {
                              default: withCtx(() => [..._cache[1] || (_cache[1] = [
                                createTextVNode("mdi-arrow-up", -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          createBaseVNode("span", _hoisted_4$1, [
                            createBaseVNode("span", null, toDisplayString($options.humanFormat(torrent.leechers)), 1),
                            createVNode(VIcon, {
                              dark: "",
                              small: "",
                              color: "red"
                            }, {
                              default: withCtx(() => [..._cache[2] || (_cache[2] = [
                                createTextVNode("mdi-arrow-down", -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          createBaseVNode("span", _hoisted_5, [
                            createBaseVNode("span", null, toDisplayString($options.humanFormat(torrent.completed)), 1),
                            createVNode(VIcon, {
                              dark: "",
                              small: "",
                              color: "blue"
                            }, {
                              default: withCtx(() => [..._cache[3] || (_cache[3] = [
                                createTextVNode("mdi-download", -1)
                              ])]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024),
                createVNode(VListItemAction, {
                  onClick: withModifiers(($event) => $options.copyToClipboard(torrent.magnet, k), ["stop"])
                }, {
                  default: withCtx(() => [
                    createVNode(VBtn, { icon: "" }, {
                      default: withCtx(() => [
                        $data.copiedIndex === k ? (openBlock(), createBlock(VIcon, {
                          key: 0,
                          color: "success"
                        }, {
                          default: withCtx(() => [..._cache[4] || (_cache[4] = [
                            createTextVNode("mdi-check", -1)
                          ])]),
                          _: 1
                        })) : (openBlock(), createBlock(VIcon, { key: 1 }, {
                          default: withCtx(() => [..._cache[5] || (_cache[5] = [
                            createTextVNode("mdi-content-copy", -1)
                          ])]),
                          _: 1
                        }))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ]),
              _: 2
            }, 1032, ["onClick"])
          ], 64);
        }), 128))
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ])) : createCommentVNode("", true);
}
const ReleaseTorrents = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  sliderTransition: String,
  sliderTransitionDuration: [String, Number],
  hideSlider: Boolean,
  inset: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props2, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(() => props2.sliderColor);
    const {
      backgroundColorClasses: insetColorClasses,
      backgroundColorStyles: insetColorStyles
    } = useBackgroundColor(() => props2.sliderColor);
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props2.direction === "horizontal");
    const isSelected = computed(() => rootEl.value?.group?.isSelected.value ?? false);
    function fade(nextEl, prevEl) {
      return {
        opacity: [0, 1]
      };
    }
    function grow(nextEl, prevEl) {
      return props2.direction === "vertical" ? {
        transform: ["scaleY(0)", "scaleY(1)"]
      } : {
        transform: ["scaleX(0)", "scaleX(1)"]
      };
    }
    function shift(nextEl, prevEl) {
      const prevBox = prevEl.getBoundingClientRect();
      const nextBox = nextEl.getBoundingClientRect();
      const xy = isHorizontal.value ? "x" : "y";
      const XY = isHorizontal.value ? "X" : "Y";
      const rightBottom = isHorizontal.value ? "right" : "bottom";
      const widthHeight = isHorizontal.value ? "width" : "height";
      const prevPos = prevBox[xy];
      const nextPos = nextBox[xy];
      const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
      const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
      const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
      const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
      const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
      const sigma = 1.5;
      return {
        transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
        transformOrigin: Array(3).fill(origin)
      };
    }
    function updateSlider(_ref2) {
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = rootEl.value?.$el.parentElement?.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).backgroundColor;
        const keyframes = {
          fade,
          grow,
          shift
        }[props2.sliderTransition ?? "shift"] ?? shift;
        const duration = Number(props2.sliderTransitionDuration) || ({
          fade: 400,
          grow: 350,
          shift: 225
        }[props2.sliderTransition ?? "shift"] ?? 225);
        animate(nextEl, {
          backgroundColor: [color, color],
          ...keyframes(nextEl, prevEl)
        }, {
          duration,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props2);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props2.class, isSelected.value && props2.inset ? insetColorClasses.value : []],
        "style": [props2.style, isSelected.value && props2.inset ? insetColorStyles.value : [], {
          backgroundColor: isSelected.value && props2.inset ? "transparent !important" : void 0
        }],
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props2.fixed,
        "maxWidth": props2.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => createBaseVNode(Fragment, null, [slots.default?.() ?? props2.text, !props2.hideSlider && createBaseVNode("div", {
          "ref": sliderEl,
          "class": normalizeClass(["v-tab__slider", props2.inset ? insetColorClasses.value : sliderColorClasses.value]),
          "style": normalizeStyle([sliderColorStyles.value, props2.inset ? insetColorStyles.value : sliderColorClasses.value])
        }, null)])
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start?.({
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end?.({
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move?.({
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  const value = binding.value;
  const target = value?.parent ? el.parentElement : el;
  const options = value?.options ?? {
    passive: true
  };
  const uid = binding.instance?.$.uid;
  if (!target || uid === void 0) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  const target = binding.value?.parent ? el.parentElement : el;
  const uid = binding.instance?.$.uid;
  if (!target?._touchHandlers || uid === void 0) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  crossfade: Boolean,
  transitionDuration: Number,
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props2, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props2);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props2, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props2.reverse : props2.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      if (props2.crossfade) {
        return "v-window-crossfade-transition";
      }
      const axis = props2.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      let scrollableParent;
      const savedScrollPosition = {
        left: 0,
        top: 0
      };
      if (IN_BROWSER && oldVal >= 0) {
        scrollableParent = getScrollParent(rootRef.value);
        savedScrollPosition.left = scrollableParent?.scrollLeft;
        savedScrollPosition.top = scrollableParent?.scrollTop;
      }
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = false;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = true;
      } else {
        isReversed.value = newVal < oldVal;
      }
      nextTick(() => {
        if (!IN_BROWSER || !scrollableParent) return;
        const currentScrollY = scrollableParent.scrollTop;
        if (currentScrollY !== savedScrollPosition.top) {
          scrollableParent.scrollTo({
            ...savedScrollPosition,
            behavior: "instant"
          });
        }
        requestAnimationFrame(() => {
          if (!scrollableParent) return;
          const rafScrollY = scrollableParent.scrollTop;
          if (rafScrollY !== savedScrollPosition.top) {
            scrollableParent.scrollTo({
              ...savedScrollPosition,
              behavior: "instant"
            });
          }
        });
      });
    }, {
      flush: "sync"
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = toRef(() => props2.continuous || activeIndex.value !== 0);
    const canMoveForward = toRef(() => props2.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props2.nextIcon : props2.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createBaseVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props2.prevIcon : props2.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createBaseVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props2.touch === false) return props2.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props2.touch === true ? {} : props2.touch
      };
    });
    function onKeyDown(e) {
      if (props2.direction === "horizontal" && e.key === "ArrowLeft" || props2.direction === "vertical" && e.key === "ArrowUp") {
        e.preventDefault();
        prev();
        nextTick(() => {
          canMoveBack.value ? focusArrow(0) : focusArrow(1);
        });
      }
      if (props2.direction === "horizontal" && e.key === "ArrowRight" || props2.direction === "vertical" && e.key === "ArrowDown") {
        e.preventDefault();
        next();
        nextTick(() => {
          canMoveForward.value ? focusArrow(1) : focusArrow(0);
        });
      }
    }
    function focusArrow(index) {
      const arrow = arrows.value[index];
      if (!arrow) return;
      const arrowEl = Array.isArray(arrow) ? arrow[0] : arrow;
      arrowEl.el?.focus();
    }
    useRender(() => withDirectives(createVNode(props2.tag, {
      "ref": rootRef,
      "class": normalizeClass(["v-window", {
        "v-window--show-arrows-on-hover": props2.showArrows === "hover",
        "v-window--vertical-arrows": !!props2.verticalArrows,
        "v-window--crossfade": !!props2.crossfade
      }, themeClasses.value, props2.class]),
      "style": normalizeStyle([props2.style, {
        "--v-window-transition-duration": !PREFERS_REDUCED_MOTION() ? convertToUnit(props2.transitionDuration, "ms") : null
      }])
    }, {
      default: () => [createBaseVNode("div", {
        "class": "v-window__container",
        "style": {
          height: transitionHeight.value
        }
      }, [slots.default?.({
        group
      }), props2.showArrows !== false && createBaseVNode("div", {
        "class": normalizeClass(["v-window__controls", {
          "v-window__controls--left": props2.verticalArrows === "left" || props2.verticalArrows === true
        }, {
          "v-window__controls--right": props2.verticalArrows === "right"
        }]),
        "onKeydown": onKeyDown
      }, [arrows.value])]), slots.additional?.({
        group
      })]
    }), [[Touch, touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props2, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props2, "modelValue");
    const model = computed({
      get() {
        if (_model.value != null || !group) return _model.value;
        return group.items.value.find((item) => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props2);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props2.class],
        "style": props2.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props2, _ref) {
    let {
      slots
    } = _ref;
    const window2 = inject(VWindowSymbol);
    const groupItem = useGroupItem(props2, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window2 || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window2.isReversed.value ? props2.reverseTransition !== false : props2.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = false;
      if (window2.transitionCount.value > 0) {
        window2.transitionCount.value -= 1;
        if (window2.transitionCount.value === 0) {
          window2.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window2) {
        return;
      }
      isTransitioning.value = true;
      if (window2.transitionCount.value === 0) {
        window2.transitionHeight.value = convertToUnit(window2.rootRef.value?.clientHeight);
      }
      window2.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window2) {
          return;
        }
        window2.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window2.isReversed.value ? props2.reverseTransition : props2.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window2.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props2, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => [withDirectives(createBaseVNode("div", {
        "class": normalizeClass(["v-window-item", groupItem.selectedClass.value, props2.class]),
        "style": normalizeStyle(props2.style)
      }, [hasContent.value && slots.default?.()]), [[vShow, groupItem.isSelected.value]])]
    }));
    return {
      groupItem
    };
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props2, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props2);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props2.class],
        "style": props2.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items) return [];
  return items.map((item) => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  inset: Boolean,
  insetPadding: [String, Number],
  insetRadius: [String, Number],
  sliderColor: String,
  ...pick(makeVTabProps(), ["spaced", "sliderTransition", "sliderTransitionDuration"]),
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props2, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props2, "modelValue");
    const items = computed(() => parseItems(props2.items));
    const {
      densityClasses
    } = useDensity(props2);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props2.bgColor);
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props2, "color"),
        direction: toRef(props2, "direction"),
        stacked: toRef(props2, "stacked"),
        fixed: toRef(props2, "fixedTabs"),
        inset: toRef(props2, "inset"),
        sliderColor: toRef(props2, "sliderColor"),
        sliderTransition: toRef(props2, "sliderTransition"),
        sliderTransitionDuration: toRef(props2, "sliderTransitionDuration"),
        hideSlider: toRef(props2, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props2);
      const hasWindow = !!(slots.window || props2.items.length > 0);
      return createBaseVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props2.direction}`, `v-tabs--align-tabs-${props2.alignTabs}`, {
          "v-tabs--fixed-tabs": props2.fixedTabs,
          "v-tabs--grow": props2.grow,
          "v-tabs--inset": props2.inset,
          "v-tabs--stacked": props2.stacked
        }, densityClasses.value, backgroundColorClasses.value, props2.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props2.height),
          "--v-tabs-inset-padding": props2.inset ? convertToUnit(props2.insetPadding) : void 0,
          "--v-tabs-inset-radius": props2.inset ? convertToUnit(props2.insetRadius) : void 0
        }, backgroundColorStyles.value, props2.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: slots.default ?? (() => items.value.map((item) => slots.tab?.({
          item
        }) ?? createVNode(VTab, mergeProps(item, {
          "key": item.text,
          "value": item.value,
          "spaced": props2.spaced
        }), {
          default: slots[`tab.${item.value}`] ? () => slots[`tab.${item.value}`]?.({
            item
          }) : void 0
        }))),
        prev: slots.prev,
        next: slots.next
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => [items.value.map((item) => slots.item?.({
          item
        }) ?? createVNode(VTabsWindowItem, {
          "value": item.value
        }, {
          default: () => slots[`item.${item.value}`]?.({
            item
          })
        })), slots.window?.()]
      })]);
    });
    return {};
  }
});
const props = {
  releaseId: {
    type: [String, Number],
    default: null
  },
  releaseName: {
    type: String,
    default: null
  }
};
const _sfc_main = {
  props,
  name: "Release.View",
  meta() {
    return { title: `${this.$t("common.release")} [${this.releaseId}]: ${this.releaseName}` };
  },
  components: {
    Card: ReleaseCard,
    Episodes: ReleaseEpisodes,
    Comments: ReleaseComments
  },
  data() {
    return {
      image: LibriaTyan01,
      tab: 0,
      loading: false,
      dates: {},
      selectedDomain: "anilibria.tv/release/",
      availableDomains: [
        { text: "anilibria.tv", value: "anilibria.tv/release/" },
        { text: "anilibria.top", value: "anilibria.top/anime/releases/release/" },
        { text: "anilibria.wtf", value: "anilibria.wtf/anime/releases/release/" }
      ],
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
      ]
    };
  },
  computed: {
    _release() {
      return useReleaseStore().data;
    },
    __release() {
      return {
        ...this._release
      };
    },
    franchises() {
      return this._release?.franchises?.length ? [{
        releases: this._release.franchises
      }] : [];
    },
    /**
     * Get release episodes
     *
     * @return {array}
     */
    episodes() {
      if (!this._release) return [];
      return this.$__get(this._release, "episodes", []);
    },
    /**
     * Get release torrents
     *
     * @return {array}
     */
    torrents() {
      if (!this._release) return [];
      return this.$__get(this._release, "torrents", []);
    },
    /**
     * Get available components
     *
     * @return {array}
     */
    components() {
      return [
        {
          is: ReleaseEpisodes,
          props: {
            loading: this.loading,
            release: this._release,
            episodes: this.episodes
          },
          events: { episode: (episode) => toVideo(this._release, episode) }
        },
        {
          is: ReleaseComments,
          props: { release: this._release }
        },
        {
          is: ReleaseTorrents,
          props: { torrents: this.torrents }
        }
      ];
    },
    /**
     * Get active component
     *
     * @return {*}
     */
    component() {
      return this.components[this.tab] || null;
    }
  },
  methods: {
    router() {
      return router;
    },
    /**
     * Generate complete share URL based on selected domain and release code
     * @returns {string}
     */
    generateShareUrl() {
      if (!this._release?.code) return "";
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
      return `${config.base}${this._release.code}${config.suffix}`;
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
      const { ru, en } = this._release?.names || {};
      const domain = this.selectedDomain.split("/")[0];
      return this.$t("release.shareText", { title: ru || en || this.$t("generated.shareThisRelease"), domain });
    },
    /**
     * Update all share links
     */
    updateShareLinks() {
      if (!this._release) return;
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
  watch: {
    releaseId: {
      immediate: true,
      async handler(releaseId) {
        if (this._release === null || this._release.id !== parseInt(releaseId)) {
          this.loading = true;
          await useReleaseStore().getRelease(releaseId);
          this.updateShareLinks();
          this.loading = false;
        }
      }
    },
    _release: {
      deep: true,
      handler() {
        this.updateShareLinks();
      }
    }
  }
};
const _hoisted_1 = { class: "text-body-1 mb-2" };
const _hoisted_2 = { class: "text-caption" };
const _hoisted_3 = { class: "error-details" };
const _hoisted_4 = { class: "mt-3 d-flex justify-space-between" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_card = resolveComponent("card");
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  const _component_v_list_item_icon = resolveComponent("v-list-item-icon");
  const _component_v_list_item_avatar = resolveComponent("v-list-item-avatar");
  return openBlock(), createElementBlock("div", null, [
    $data.loading || $options._release ? (openBlock(), createBlock(VLayout, {
      key: 0,
      column: ""
    }, {
      default: withCtx(() => [
        createVNode(VCard, {
          class: "mb-2",
          color: "transparent",
          flat: ""
        }, {
          default: withCtx(() => [
            createVNode(VCardActions, { class: "pa-0" }, {
              default: withCtx(() => [
                createVNode(_component_card, mergeProps({ loading: $data.loading }, {
                  class: "flex-grow-1",
                  release: $options.__release
                }), null, 16, ["release"]),
                createVNode(VMenu, {
                  "offset-y": "",
                  "close-on-content-click": false
                }, {
                  activator: withCtx(({ on, attrs }) => [
                    createVNode(VBtn, mergeProps({
                      icon: "",
                      color: "primary"
                    }, attrs, toHandlers(on)), {
                      default: withCtx(() => [
                        createVNode(VIcon, null, {
                          default: withCtx(() => [..._cache[4] || (_cache[4] = [
                            createTextVNode("mdi-share-variant", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 16)
                  ]),
                  default: withCtx(() => [
                    createVNode(VList, null, {
                      default: withCtx(() => [
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
                                  label: _ctx.$t("catalog.releaseDomain"),
                                  onChange: $options.updateShareLinks,
                                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                                  }, ["stop"]))
                                }, null, 8, ["modelValue", "items", "label", "onChange"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider),
                        (openBlock(true), createElementBlock(Fragment, null, renderList($data.shareLinks, (item, index) => {
                          return openBlock(), createBlock(VListItem, {
                            key: index,
                            onClick: ($event) => $options.handleShareClick(item)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_list_item_icon, null, {
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
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        $options.franchises.length ? (openBlock(), createBlock(VCard, {
          key: 0,
          flat: "",
          color: "transparent",
          class: "mb-6"
        }, {
          default: withCtx(() => [
            createVNode(VCardTitle, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t("common.linked")), 1)
              ]),
              _: 1
            }),
            createVNode(VList, { "three-line": "" }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($options.franchises, (item, index) => {
                  return openBlock(), createElementBlock(Fragment, { key: index }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.releases, (release, index2) => {
                      return openBlock(), createBlock(VListItem, {
                        link: true,
                        onClick: ($event) => $options.router().push("/release/" + release.id + "/" + encodeURIComponent(release.names.en)),
                        disabled: release.id == _ctx.releaseId,
                        key: release.id
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_list_item_avatar, null, {
                            default: withCtx(() => [
                              createVNode(VImg, {
                                transition: false,
                                src: release.poster
                              }, null, 8, ["src"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_v_list_item_content, null, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createBaseVNode("span", null, toDisplayString(release.names.ru), 1),
                                  release.status ? (openBlock(), createBlock(VChip, {
                                    key: 0,
                                    class: "ma-2",
                                    color: "secondary",
                                    "text-color": "white"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(release.status), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1024),
                              release.type && release.type !== "null" ? (openBlock(), createBlock(VListItemSubtitle, {
                                key: 0,
                                textContent: toDisplayString(release.type)
                              }, null, 8, ["textContent"])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "disabled"]);
                    }), 128))
                  ], 64);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : createCommentVNode("", true),
        !$data.loading ? (openBlock(), createBlock(VTabs, {
          key: 1,
          modelValue: $data.tab,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.tab = $event),
          class: "shrink mb-4",
          "background-color": "transparent"
        }, {
          default: withCtx(() => [
            createVNode(VTab, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t("common.episodes")), 1)
              ]),
              _: 1
            }),
            createVNode(VTab, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t("common.comments")), 1)
              ]),
              _: 1
            }),
            $options.torrents.length > 0 ? (openBlock(), createBlock(VTab, { key: 0 }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t("common.torrents")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue"])) : createCommentVNode("", true),
        $options.component ? (openBlock(), createBlock(resolveDynamicComponent($options.component.is), mergeProps({ key: 2 }, toHandlers($options.component.events), $options.component.props), null, 16)) : createCommentVNode("", true)
      ]),
      _: 1
    })) : !$data.loading && !$options._release ? (openBlock(), createBlock(VLayout, {
      key: 1,
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
                    createVNode(VCardText, { class: "error-message-container" }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          outlined: "",
                          color: "red",
                          class: "pa-4"
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_1, [
                              createVNode(VIcon, {
                                small: "",
                                class: "mr-2"
                              }, {
                                default: withCtx(() => [..._cache[8] || (_cache[8] = [
                                  createTextVNode("mdi-help-circle", -1)
                                ])]),
                                _: 1
                              }),
                              createBaseVNode("strong", null, toDisplayString(_ctx.$t("release.whatHappened")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_2, [
                              createBaseVNode("h3", null, toDisplayString(_ctx.$t("release.missingTitle")), 1),
                              createBaseVNode("p", null, toDisplayString(_ctx.$t("release.missingBody")), 1),
                              createBaseVNode("div", _hoisted_3, [
                                createBaseVNode("strong", null, toDisplayString(_ctx.$t("release.missingReasons")), 1),
                                createBaseVNode("ul", null, [
                                  createBaseVNode("li", null, toDisplayString(_ctx.$t("release.missingReasonCache")), 1),
                                  createBaseVNode("li", null, toDisplayString(_ctx.$t("release.missingReasonSync")), 1),
                                  createBaseVNode("li", null, toDisplayString(_ctx.$t("release.missingReasonTemporary")), 1)
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_4, [
                              createVNode(VBtn, {
                                small: "",
                                text: "",
                                color: "primary",
                                to: "/"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    left: "",
                                    small: ""
                                  }, {
                                    default: withCtx(() => [..._cache[9] || (_cache[9] = [
                                      createTextVNode("mdi-home", -1)
                                    ])]),
                                    _: 1
                                  }),
                                  createTextVNode(" " + toDisplayString(_ctx.$t("common.home")), 1)
                                ]),
                                _: 1
                              })
                            ])
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
        })
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ]);
}
const ReleaseView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2879229d"]]);
export {
  ReleaseView as default
};
