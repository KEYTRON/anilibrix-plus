// Lodash is used directly via import in Vue 3.
// For backwards compatibility with components using this.$__get,
// install it as a global property.
import __get from 'lodash/get'

export default {
  install (app) {
    app.config.globalProperties.$__get = __get
  }
}
