<template>
  <div v-if="!hideToolbar" class="toolbar">
    <!-- Navigation buttons -->
    <div class="d-flex align-center mr-2 toolbar__nav">
      <v-btn icon size="default" class="mr-1" @click="goback" :disabled="!canGoBack">
        <v-icon size="24">mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn icon size="default" @click="goforward" :disabled="!canGoForward">
        <v-icon size="24">mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <!-- Releases -->
    <v-btn variant="text" rounded="pill" size="large" class="mr-2 toolbar__link" :class="{ 'toolbar__link--active': isCurrentRoute('releases') }" :to="{name: 'releases'}">
      <v-icon start size="22">mdi-view-column</v-icon>
      {{ $t('toolbar.releases') }}
    </v-btn>

    <!-- Catalog-->
    <v-btn variant="text" rounded="pill" size="large" class="mr-2 toolbar__link" :class="{ 'toolbar__link--active': isCurrentRoute('catalog') }" :to="{name: 'catalog'}">
      <v-icon start size="22">mdi-folder-text-outline</v-icon>
      {{ $t('toolbar.catalog') }}
    </v-btn>

    <!-- Favorite -->
    <v-btn variant="text" rounded="pill" size="large" class="mr-4 toolbar__link" :class="{ 'toolbar__link--active': isCurrentRoute('favorites') }" :to="{name: 'favorites'}">
      <v-icon start size="22">mdi-star</v-icon>
      {{ $t('toolbar.favorites') }}
    </v-btn>

    <!-- Search-->
    <div class="toolbar__search mr-3">
      <search/>
    </div>

    <!-- Right side buttons -->
    <div class="d-flex align-center toolbar__actions">
      <!-- Random release -->
      <div class="mr-1">
        <v-btn :disabled="diceIntervalId !== null" icon size="default" id="toolbar__rand" v-on:click="randomRelease">
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
      direction: 0
    }
  },
  computed: {
    canGoBack() {
      return window.history.state?.back !== null
    },
    canGoForward() {
      return window.history.state?.forward !== null
    },
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
  min-height: 54px;
  gap: 0;
  flex: 0 0 auto;
  white-space: nowrap;
  margin: 0 0 10px;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    backdrop-filter: blur(20px) saturate(1.8) brightness(1.05);
    -webkit-backdrop-filter: blur(20px) saturate(1.8) brightness(1.05);
    filter: url(#glass-distortion);
    background:
      linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -1px 0 rgba(0, 0, 0, 0.25),
      inset 1px 0 0 rgba(255, 255, 255, 0.06),
      inset -1px 0 0 rgba(255, 255, 255, 0.06);
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
    width: 40px;
    height: 40px;
  }

  :deep(.v-btn__content) {
    text-decoration: none !important;
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

  &__link {
    flex: 0 0 auto;
    opacity: 0.74;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none !important;
    padding: 0 20px !important;
    transition: opacity 0.2s ease, color 0.2s ease, background-color 0.2s ease;

    &--active {
      opacity: 1;
      color: rgb(var(--v-theme-primary)) !important;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &__actions {
    flex: 0 0 auto;
    white-space: nowrap;
    gap: 4px;
  }

  &__search {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
  }
}

</style>
