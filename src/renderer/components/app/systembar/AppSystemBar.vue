<template>
  <div class="d-flex align-center black system-bar white--text px-2" v-if="is_fullscreen === false" : @dblclick="() => maximizeApp()">
    <template v-if="!this.isMac">
      <template v-for="(control, k) in controls" :key="k">
        <v-btn icon size="small" class="system-bar__button" @click="control.action">
          <v-icon size="small" color="grey">{{ control.icon }}</v-icon>
        </v-btn>
      </template>
    </template>
  </div>
</template>

<script>

import { AppPlatformMixin } from '@mixins/app'
import { useSettingsStore } from '@store/app/settings/useSettingsStore'

export default {
  mixins: [AppPlatformMixin],
  data () {
    return {
      minimize: {
        icon: 'mdi-minus',
        action: () => this.minimizeApp(),
      },
      maximize: {
        icon: 'mdi-window-maximize',
        action: () => this.maximizeApp(),
      },
      close: {
        icon: 'mdi-close',
        action: () => this.closeApp(),
      }
    }
  },
  computed: {
    appbarRight () {
      return useSettingsStore().appbar_right
    },
    controlsRight () {
      return !!(this.appbarRight || this.isWindows);
    },
    /**
     * Get controls
     *
     * @return Array
     */
    controls () {
      if (this.controlsRight) {
        return [this.close, this.maximize, this.minimize]
      } else {
        return [this.close, this.minimize, this.maximize]
      }
    },
  },

  methods: {
    /**
     * Close app
     *
     * @return void
     */
    closeApp () {
      require('@electron/remote').app.quit()
    },

    /**
     * Minimize app
     *
     * @return void
     */
    minimizeApp () {
      require('@electron/remote').getCurrentWindow().minimize()
    },

    /**
     * Maximize app
     *
     * @return void
     */
    maximizeApp () {

      const window = require('@electron/remote').getCurrentWindow()

      window.isMaximized()
        ? window.unmaximize()
        : window.maximize()
    }
  }

}
</script>

<style lang="scss" scoped>

.system-bar {
  top: 0;
  height: 40px;
  width: 100%;
  z-index: 10;
  position: fixed;
  display: flex;
  flex-direction: row;
  -webkit-app-region: drag;

  &__button {
    -webkit-app-region: no-drag;
  }

  &.is-mac--fullscreen {
    display: none;
  }

  &.right {
    flex-direction: row-reverse;
  }
}

</style>
