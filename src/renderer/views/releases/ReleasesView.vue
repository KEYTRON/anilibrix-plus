<template>
  <v-fade-transition appear mode="out-in">
    <div class="releases" v-if="loading || !_has_error">
      <div class="releases__hero">
        <transition name="releases-backdrop">
          <img
            v-if="release && !loading"
            :key="release.id"
            :src="release.poster"
            class="releases__backdrop"
            alt=""
          />
        </transition>

        <slider
          v-bind="{loading}"
          v-model="index"
          class="releases__slider"
          :releases="_releases"
          @next="next"
          @previous="previous"
          @toVideo="toVideo(release, episode)">
        </slider>

        <release
          v-bind="{loading, release, episode}"
          class="releases__release"
          :key="release ? release.id : null"/>

        <actions
          v-bind="{loading, release}"
          class="releases__actions"
          @toVideo="toVideo(release, episode)"
          @toRelease="toRelease(release)"/>
      </div>
    </div>
    <error v-else-if="!loading && _has_error"/>
  </v-fade-transition>
</template>

<script>

import Error from './components/error'
import Slider from './components/slider'
import Release from './components/release'
import Actions from './components/actions'

import { toRelease, toVideo } from '@utils/router/views/routerViews'
import { useAppStore } from '@store/app/useAppStore'
import { useReleasesStore } from '@store/releases/useReleasesStore'
import { AppKeyboardHandlerMixin } from '@mixins/app'

export default {
  name: 'Releases.View',
  meta () {
    return { title: this.$t('releases.pageTitle') }
  },
  mixins: [AppKeyboardHandlerMixin],
  components: {
    Error,
    Slider,
    Release,
    Actions,
  },

  data () {
    return {
      loading: true,
    }
  },

  computed: {
    _drawer () { return useAppStore().drawer },
    _is_searching () { return useAppStore().is_searching },
    _index () { return useReleasesStore().index },
    _loading () { return useReleasesStore().loading },
    _releases () { return useReleasesStore().data || [] },
    _has_error () { return useReleasesStore().has_error },

    index: {

      /**
       * Get release index using it's hash
       * If no releases with last saved hash -> get first
       *
       * @return number
       */
      get () {
        const releaseIndex = this._releases.findIndex(release => this._index === release.id)
        return releaseIndex > -1
          ? releaseIndex
          : 0
      },

      /**
       * Get hash from release with provided index
       * Save hash to store
       *
       * @param index
       * @return void
       */
      set (index) {
        this._setIndex(this._releases[index] ? this._releases[index].id : null)
      }
    },

    /**
     * Get active release
     *
     * @return {*|null}
     */
    release () {
      return this._releases[this.index] || null
    },

    /**
     * Get episode
     *
     * @return Object|null
     */
    episode () {
      return this.$__get(this.release, ['episodes', 0]) || null
    }

  },

  methods: {
    _setIndex (index) { useReleasesStore().setIndex(index) },

    toVideo (release, episode) { toVideo(release, episode) },
    toRelease (release) { toRelease(release) },

    /**
     * Listen keyboard event
     *
     * @param e
     * @return void
     */
    handleKeyboardEvents (e) {
      const code = e.which || e.keyCode

      // space || enter
      if (code === 32 || code === 13) {
        if (this._drawer === false && this._is_searching === false) {
          this.toVideo()
        }
      }

      // left and right arrows
      if (code === 37) this.previous()
      if (code === 39) this.next()

    },

    /**
     * Move to next slide
     *
     * @return void
     */
    next () {
      if (this.index < this._releases.length - 1) this.index = this.index + 1
    },

    /**
     * Move to previous slide
     *
     * @return void
     */
    previous () {
      if (this.index > 0) this.index = this.index - 1
    },

  },

  watch: {

    _loading: {
      immediate: true,
      handler (_loading) {
        if (_loading === false && this.loading === true) {
          this.loading = false
        }
      }
    },

    _has_error: {
      handler () {
        this.loading = true
      }
    }

  }

}
</script>

<style lang="scss" scoped>

.releases {
  display: flex;
  width: 100%;
  flex: 1 1 auto;
  padding-top: 8px;

  &__hero {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }

  &__backdrop {
    position: absolute;
    top: 0;
    right: 0;
    width: 58%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 18%,
      rgba(0, 0, 0, 0.7) 45%,
      #000 75%
    );
    z-index: 0;
    pointer-events: none;
    user-select: none;
  }

  &__slider,
  &__release,
  &__actions {
    position: relative;
    z-index: 1;
  }
}

.releases-backdrop-enter-active,
.releases-backdrop-leave-active {
  transition: opacity 0.4s ease;
}
.releases-backdrop-enter-from,
.releases-backdrop-leave-to {
  opacity: 0;
}

@media (max-width: 960px) {
  .releases {
    padding-top: 4px;

    &__hero {
      gap: 12px;
    }

    &__backdrop {
      width: 70%;
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 0, 0, 0.2) 12%,
        rgba(0, 0, 0, 0.65) 40%,
        #000 70%
      );
    }
  }
}

</style>
