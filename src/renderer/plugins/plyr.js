import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

// Plyr is used directly in components via import.
// Expose on globalProperties for backwards compatibility.
export default {
  install (app) {
    app.config.globalProperties.$plyr = Plyr
  }
}
