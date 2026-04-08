import { ba as unref, _ as _export_sfc, K as createBlock, L as withCtx, bb as withKeys, M as VLayout, bc as useAccountStore, bd as invokeSafeStorageEncrypt, be as useFavoritesStore, bf as electronExports, N as openBlock, l as createVNode, O as VRow, P as VCol, Q as VImg, R as VCard, ac as VCardTitle, W as createTextVNode, T as toDisplayString, S as VCardText, n as createBaseVNode, bg as VTextField, t as VBtn, r as mergeProps, ak as VDivider } from "./index-BZ1Qg9LU.js";
const LibriaTyan03 = "" + new URL("LibriaTyan03-B2NpaqxW.svg", import.meta.url).href;
const req = (value) => {
  value = unref(value);
  if (Array.isArray(value)) return !!value.length;
  if (value === void 0 || value === null) {
    return false;
  }
  if (value === false) {
    return true;
  }
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === "object") {
    for (let _ in value) return true;
    return false;
  }
  return !!String(value).length;
};
function regex() {
  for (var _len = arguments.length, expr = new Array(_len), _key = 0; _key < _len; _key++) {
    expr[_key] = arguments[_key];
  }
  return (value) => {
    value = unref(value);
    return !req(value) || expr.every((reg) => {
      reg.lastIndex = 0;
      return reg.test(value);
    });
  };
}
regex(/^[a-zA-Z]*$/);
regex(/^[a-zA-Z0-9]*$/);
regex(/^\d*(\.\d+)?$/);
const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
regex(emailRegex);
function required$1(value) {
  if (typeof value === "string") {
    value = value.trim();
  }
  return req(value);
}
var required = {
  $validator: required$1,
  $message: "Value is required",
  $params: {
    type: "required"
  }
};
const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
regex(urlRegex);
regex(/(^[0-9]*$)|(^-[0-9]+$)/);
regex(/^[-]?\d*(\.\d+)?$/);
const BackViewMixin = {
  data() {
    return {
      from: null
    };
  },
  methods: {
    /**
     * Go to back view
     *
     * @return {void}
     */
    async toBack() {
      await this.$router.replace(this.from || { name: "releases" });
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.from = from || null);
  }
};
const _sfc_main = {
  name: "Account.Login.View",
  mixins: [BackViewMixin],
  data() {
    return {
      tab: 0,
      from: null,
      login: null,
      image: LibriaTyan03,
      loading: false,
      password: null
    };
  },
  validations: {
    login: { required },
    password: { required }
  },
  mounted() {
    electronExports.ipcRenderer.on("VK_CODE", async (event, session) => {
      try {
        this.loading = true;
        await useAccountStore().setSession(session);
        await useAccountStore().getProfile();
        await this.toBack();
        useFavoritesStore().getFavorites();
        this.loading = false;
      } catch (e) {
        console.error(e);
        if (e.response.status === 401) {
          this.$toasted.error(this.$t("login.userNotRegistered"));
        }
        this.loading = false;
      }
    });
  },
  beforeUnmount() {
    electronExports.ipcRenderer.removeAllListeners("VK_CODE");
  },
  methods: {
    authorizeWithVK() {
      window.open(
        "https://oauth.vk.com/authorize?client_id=5315207&redirect_uri=https://www.anilibria.tv/public/vk.php",
        "targetWindow",
        `toolbar=no,
                location=no,
                status=no,
                menubar=no,
                scrollbars=yes,
                resizable=yes,
                width=SomeSize,
                height=SomeSize`
      );
    },
    /**
     * Authorize
     *
     * @return {Promise<void>}
     */
    async authorize() {
      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          const payload = {
            login: this.login,
            password: this.password
          };
          const session = await useAccountStore().login(payload);
          if (!session) {
            return;
          }
          await Promise.allSettled([
            await invokeSafeStorageEncrypt("user.login", this.login),
            await invokeSafeStorageEncrypt("user.password", this.password)
          ]);
          await useAccountStore().setSession(session);
          await useAccountStore().getProfile();
          await this.toBack();
          useFavoritesStore().getFavorites();
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(VLayout, {
    "fill-height": "",
    "align-center": "",
    "justify-center": "",
    onKeyup: withKeys($options.authorize, ["enter"])
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
                      createTextVNode(toDisplayString(_ctx.$t("login.title")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, toDisplayString(_ctx.$t("login.subtitle")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VLayout, { class: "py-6 pt-2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: $data.login,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.login = $event),
                        outlined: "",
                        "hide-details": "",
                        class: "mr-1",
                        color: "grey",
                        placeholder: _ctx.$t("login.emailPlaceholder"),
                        "prepend-inner-icon": "mdi-account"
                      }, null, 8, ["modelValue", "placeholder"]),
                      createVNode(VTextField, {
                        modelValue: $data.password,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event),
                        outlined: "",
                        "hide-details": "",
                        class: "ml-1",
                        type: "password",
                        placeholder: _ctx.$t("login.passwordPlaceholder"),
                        "prepend-inner-icon": "mdi-lock"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  createVNode(VLayout, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, mergeProps({ loading: $data.loading }, {
                        class: "mr-1",
                        disabled: _ctx.$v.$invalid,
                        onClick: $options.authorize
                      }), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("login.title")), 1)
                        ]),
                        _: 1
                      }, 16, ["disabled", "onClick"]),
                      createVNode(VBtn, mergeProps({ loading: $data.loading }, {
                        text: "",
                        onClick: _ctx.toBack
                      }), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("common.back")), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider, { class: "my-6" }),
                  createVNode(VLayout, { "justify-center": "" }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        color: "blue darken-1",
                        onClick: $options.authorizeWithVK
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("login.vkLogin")), 1)
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
  }, 8, ["onKeyup"]);
}
const AccountAuthorizationView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  AccountAuthorizationView as default
};
