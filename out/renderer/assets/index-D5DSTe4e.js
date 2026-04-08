import { L as LibriaTyan01 } from "./LibriaTyan01-DlPDW3gN.js";
import { c as createSimpleFunctional, p as propsFactory, a as computed, g as genericComponent, u as useProxiedModel, b as provideTheme, d as useVariant, e as useDensity, f as useLocation, h as usePosition, i as useRounded, j as useTextColor, k as useLocale, l as createVNode, m as genOverlays, n as createBaseVNode, o as normalizeStyle, q as normalizeClass, V as VIcon, r as mergeProps, s as VDefaultsProvider, t as VBtn, v as toRef, w as useDimension, x as useElevation, I as IconValue, y as makeVariantProps, z as makeThemeProps, A as makeTagProps, B as makeRoundedProps, C as makePositionProps, D as makeLocationProps, E as makeElevationProps, F as makeDimensionProps, G as makeDensityProps, H as makeComponentProps, _ as _export_sfc, J as toReleases, K as createBlock, L as withCtx, M as VLayout, N as openBlock, O as VRow, P as VCol, Q as VImg, R as VCard, S as VCardText, T as toDisplayString, U as createCommentVNode, W as createTextVNode } from "./index-BZ1Qg9LU.js";
const VAlertTitle = createSimpleFunctional("v-alert-title");
const makeIconSizeProps = propsFactory({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function useIconSizes(props, fallback) {
  const iconSize = computed(() => {
    const iconSizeMap = new Map(props.iconSizes);
    const _iconSize = props.iconSize ?? fallback() ?? "default";
    return iconSizeMap.has(_iconSize) ? iconSizeMap.get(_iconSize) : _iconSize;
  });
  return {
    iconSize
  };
}
const allowedTypes = ["success", "info", "warning", "error"];
const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String],
    validator: (val) => {
      return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
    }
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (val) => allowedTypes.includes(val)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeIconSizeProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAlert");
const VAlert = genericComponent()({
  name: "VAlert",
  props: makeVAlertProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = toRef(() => {
      if (props.icon === false) return void 0;
      if (!props.type) return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const {
      iconSize
    } = useIconSizes(props, () => props.prominent ? 44 : void 0);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.borderColor);
    const {
      t
    } = useLocale();
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasClose = !!(slots.close || props.closable);
      const iconProps = {
        density: props.density,
        icon: icon.value,
        size: props.iconSize || props.prominent ? iconSize.value : void 0
      };
      return isActive.value && createVNode(props.tag, {
        "class": normalizeClass(["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class]),
        "style": normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, props.style]),
        "role": "alert"
      }, {
        default: () => [genOverlays(false, "v-alert"), props.border && createBaseVNode("div", {
          "key": "border",
          "class": normalizeClass(["v-alert__border", textColorClasses.value]),
          "style": normalizeStyle(textColorStyles.value)
        }, null), hasPrepend && createBaseVNode("div", {
          "key": "prepend",
          "class": "v-alert__prepend"
        }, [!slots.prepend ? createVNode(VIcon, mergeProps({
          "key": "prepend-icon"
        }, iconProps), null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !icon.value,
          "defaults": {
            VIcon: {
              ...iconProps
            }
          }
        }, slots.prepend)]), createBaseVNode("div", {
          "class": "v-alert__content"
        }, [hasTitle && createVNode(VAlertTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? props.title]
        }), slots.text?.() ?? props.text, slots.default?.()]), slots.append && createBaseVNode("div", {
          "key": "append",
          "class": "v-alert__append"
        }, [slots.append()]), hasClose && createBaseVNode("div", {
          "key": "close",
          "class": "v-alert__close"
        }, [!slots.close ? createVNode(VBtn, mergeProps({
          "key": "close-btn",
          "icon": props.closeIcon,
          "size": "x-small",
          "variant": "text"
        }, closeProps.value), null) : createVNode(VDefaultsProvider, {
          "key": "close-defaults",
          "defaults": {
            VBtn: {
              icon: props.closeIcon,
              size: "x-small",
              variant: "text"
            }
          }
        }, {
          default: () => [slots.close?.({
            props: closeProps.value
          })]
        })])]
      });
    };
  }
});
const _sfc_main = {
  props: {
    message: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      image: LibriaTyan01
    };
  },
  computed: {
    /**
     * Get blank message
     *
     * @return {string}
     */
    text() {
      return this.message || this.$t("blank.defaultError");
    }
  },
  methods: {
    /**
     * Go back
     *
     * @return void
     */
    toReleases
  }
};
const _hoisted_1 = { class: "d-flex align-center" };
const _hoisted_2 = { class: "d-flex align-center" };
const _hoisted_3 = { class: "text-body-1 mb-2" };
const _hoisted_4 = { class: "text-caption" };
const _hoisted_5 = { class: "mb-2" };
const _hoisted_6 = { class: "mt-3 d-flex justify-space-between" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
                  createVNode(VCardText, { class: "error-message-container" }, {
                    default: withCtx(() => [
                      $props.message ? (openBlock(), createBlock(VAlert, {
                        key: 0,
                        type: "error",
                        dense: "",
                        outlined: "",
                        class: "mb-4",
                        transition: "scale-transition"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_1, [
                            createBaseVNode("span", null, toDisplayString($props.message), 1)
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      $props.error ? (openBlock(), createBlock(VAlert, {
                        key: 1,
                        type: "error",
                        dense: "",
                        outlined: "",
                        class: "mb-4",
                        transition: "scale-transition"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_2, [
                            createVNode(VIcon, { left: "" }, {
                              default: withCtx(() => [..._cache[0] || (_cache[0] = [
                                createTextVNode("mdi-alert", -1)
                              ])]),
                              _: 1
                            }),
                            createBaseVNode("span", null, toDisplayString($props.error), 1)
                          ])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VCard, {
                        outlined: "",
                        color: "red",
                        class: "pa-4"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_3, [
                            createVNode(VIcon, {
                              small: "",
                              class: "mr-2"
                            }, {
                              default: withCtx(() => [..._cache[1] || (_cache[1] = [
                                createTextVNode("mdi-help-circle", -1)
                              ])]),
                              _: 1
                            }),
                            createBaseVNode("strong", null, toDisplayString(_ctx.$t("blank.title")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_4, [
                            createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("blank.subtitle")), 1),
                            createBaseVNode("p", null, toDisplayString(_ctx.$t("blank.backBug")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_6, [
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
                                  default: withCtx(() => [..._cache[2] || (_cache[2] = [
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
  });
}
const BlankView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-275bd74c"]]);
export {
  BlankView as default
};
