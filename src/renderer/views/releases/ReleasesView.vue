<template>
  <v-fade-transition appear mode="out-in">
    <div class="d-flex flex-column justify-center releases" v-if="loading || !_has_error">

      <slider
        v-bind="{loading}"
        v-model="index"
        class="mb-4"
        :releases="_releases"
        @next="next"
        @previous="previous"
        @toVideo="toVideo(release, episode)">
      </slider>

      <release v-bind="{loading, release, episode}" class="mb-4" :key="release ? release.id : null"/>
      <actions v-bind="{loading, release}" @toVideo="toVideo(release, episode)" @toRelease="toRelease(release)"/>

    </div>
    <error v-else-if="!loading && _has_error"/>
  </v-fade-transition>
</template>

<script>

import Error from './components/error'
import Slider from './components/slider'
import Release from './components/release'
import Actions from './components/actions'

import { toRelease, toVideo } from '@utils/router/views'
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
  &::-webkit-scrollbar-thumb {
    background-color: red;
  }

  &::-webkit-scrollbar {
    width: 9px;
    background-color: red;
  }

}

</style>
