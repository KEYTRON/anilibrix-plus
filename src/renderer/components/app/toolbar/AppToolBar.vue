<template>
  <div v-if="!hideToolbar" class="toolbar">
    <!-- Navigation buttons -->
    <div class="d-flex align-center mr-2 toolbar__nav">
      <v-btn :ripple="false" icon size="default" class="mr-1 toolbar__icon-button" @click="goback" :disabled="!canGoBack">
        <v-icon size="24">mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn :ripple="false" icon size="default" class="toolbar__icon-button" @click="goforward" :disabled="!canGoForward">
        <v-icon size="24">mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <!-- Releases -->
    <v-btn :ripple="false" variant="text" rounded="pill" size="large" class="mr-2 toolbar__link" :class="{ 'toolbar__link--active': isCurrentRoute('releases') }" :to="{name: 'releases'}">
      <span class="toolbar__link-inner">
        <v-icon size="18" class="toolbar__link-icon">mdi-view-column</v-icon>
        <span class="toolbar__link-label">{{ $t('toolbar.releases') }}</span>
      </span>
    </v-btn>

    <!-- Catalog-->
    <v-btn :ripple="false" variant="text" rounded="pill" size="large" class="mr-2 toolbar__link" :class="{ 'toolbar__link--active': isCurrentRoute('catalog') }" :to="{name: 'catalog'}">
      <span class="toolbar__link-inner">
        <v-icon size="18" class="toolbar__link-icon">mdi-folder-text-outline</v-icon>
        <span class="toolbar__link-label">{{ $t('toolbar.catalog') }}</span>
      </span>
    </v-btn>

    <!-- Favorite -->
    <v-btn :ripple="false" variant="text" rounded="pill" size="large" class="mr-4 toolbar__link" :class="{ 'toolbar__link--active': isCurrentRoute('favorites') }" :to="{name: 'favorites'}">
      <span class="toolbar__link-inner">
        <v-icon size="18" class="toolbar__link-icon">mdi-star</v-icon>
        <span class="toolbar__link-label">{{ $t('toolbar.favorites') }}</span>
      </span>
    </v-btn>

    <!-- Search-->
    <div class="toolbar__search mr-3">
      <search/>
    </div>

    <!-- Right side buttons -->
    <div class="d-flex align-center toolbar__actions">
      <!-- Random release -->
      <div class="mr-1">
        <v-btn :ripple="false" :disabled="diceIntervalId !== null" icon size="default" class="toolbar__icon-button" id="toolbar__rand" v-on:click="randomRelease">
          <v-icon size="26">mdi-dice-{{ dice }}</v-icon>
        </v-btn>
        <v-tooltip location="left" activator="#toolbar__rand">{{ $t('toolbar.randomRelease') }}</v-tooltip>
      </div>

      <update/>
      <notifications/>
      <settings/>
      <account/>
    </div>
  </div>
</template>

<script>

import Update from './components/update'
import Search from './components/search'
import Account from './components/account'
import Settings from './components/settings'
import Notifications from './components/notifications'
import { invokeRand } from '@main/handlers/app/app-handlers'
import { showAppError } from '@utils/notifications'

export default {
  components: {
    Update,
    Search,
    Account,
    Settings,
    Notifications
  },
  methods: {
    isCurrentRoute (name) {
      return this.$route.name === name
    },
    goback() {
      this.$router.go(-1)
    },
    goforward() {
      this.$router.go(1)
    },
    refreshNavState() {
      this.canGoBack = window.history.state?.back !== null
      this.canGoForward = window.history.state?.forward !== null
    },
    async randomRelease() {
      this.diceIntervalId = setInterval(() => {
        if (this.direction) {
          this.dice--
        } else {
          this.dice++
        }

        if (this.dice === 6) {
          this.direction = 1
        } else if (this.dice === 0) {
          this.direction = 0
        }
      }, 200)
      try {
        const {id, name} = await invokeRand()
        if (id === -1) {
          this.$toast.error(this.$t('releases.refreshUnsupported'))
          return
        }
        await this.$router.push('/release/' + id + '/' + name)
        clearInterval(this.diceIntervalId)
        this.dice = 5
        this.diceIntervalId = null
      } catch (e) {
        clearInterval(this.diceIntervalId)
        this.dice = 5
        this.diceIntervalId = null
        console.log(e)
        showAppError(e)
      }
    }
  },
  data () {
    return {
      dice: 5,
      diceIntervalId: null,
      direction: 0,
      // window.history.state isn't a Vue-reactive source, so canGoBack/
      // canGoForward can't be computed — they'd only ever evaluate once and
      // never update as the user navigates. Tracked as plain data instead,
      // refreshed on every route change (see watch.$route below).
      canGoBack: false,
      canGoForward: false,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.$nextTick(this.refreshNavState)
      }
    }
  },
  computed: {
    /**
     * Check if should hide toolbar
     *
     * @return {*|boolean}
     */
    hideToolbar () {
      return this.$__get(this.$route, 'meta.layout.hide_toolbar') || false
    }

  }
}

</script>

<style lang="scss" scoped>

.toolbar {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
  gap: 0;
  flex: 0 0 auto;
  white-space: nowrap;
  margin: 0 0 10px;
  padding: 0 12px;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    background:
      linear-gradient(180deg, rgba(18, 18, 18, 0.45) 0%, rgba(18, 18, 18, 0.35) 100%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 18px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.10),
      inset 0 -1px 0 rgba(0, 0, 0, 0.20),
      0 12px 28px rgba(0, 0, 0, 0.14);
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  :deep(.v-btn) {
    text-transform: none;
    text-decoration: none !important;
  }

  :deep(.v-btn--icon) {
    width: 34px;
    height: 34px;
  }

  :deep(.v-btn__content) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    line-height: 1;
    text-decoration: none !important;
  }

  :deep(.v-btn__overlay),
  :deep(.v-btn__underlay),
  :deep(.v-ripple__container) {
    display: none !important;
  }

  :deep(a) {
    text-decoration: none !important;
  }

  :deep(.v-btn--disabled) {
    opacity: 0.32;
  }

  &__nav {
    flex: 0 0 auto;
  }

  &__icon-button {
    opacity: 0.9;
    color: rgba(255, 255, 255, 0.82);
  }

  &__link {
    flex: 0 0 auto;
    opacity: 0.88;
    color: rgba(255, 255, 255, 0.76) !important;
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none !important;
    height: 34px !important;
    min-height: 34px !important;
    padding: 0 16px !important;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.22);
    transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;

    &--active {
      opacity: 1;
      color: rgba(255, 255, 255, 0.96) !important;
      background: rgba(255, 255, 255, 0.13);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
  }

  &__link-icon {
    display: block;
    align-self: center;
    line-height: 1;
    opacity: 0.95;
  }

  &__link-inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 7px;
    line-height: 1;
    transform: translateY(1px);
  }

  &__link-label {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  &__actions {
    flex: 0 0 auto;
    white-space: nowrap;
    gap: 2px;
  }

  &__search {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
  }
}

</style>
