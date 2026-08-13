<template>
  <div class="d-flex flex-column">

    <!-- Header-->
    <v-card flat color="transparent">
      <v-card-title>{{ $t('catalog.title') }}</v-card-title>
      <v-card-subtitle>{{ $t('catalog.subtitle') }}</v-card-subtitle>
    </v-card>

    <!-- Catalog Filters -->
    <v-expand-transition>
      <filters v-if="settings" class="mb-2"/>
    </v-expand-transition>

    <!-- Toolbar -->
    <toolbar class="mb-2" v-model:settings="settings" @reload="showReleases"/>

    <!-- Catalog Loader -->
    <!-- Catalog Items -->
    <div class="my-2">
      <template v-for="release in _items" :key="release.id">
        <release v-bind="{release, episodes: release.episodes }" class="mb-2" :ref="release.id" @click="toRelease(release)"/>
      </template>
      <loader v-if="_loading" v-for="i in _perPage" class="mb-2" :key="i"/>
    </div>

    <!-- Load More -->
    <v-btn
      v-if="_items && _items.length > 0 && hasMoreItems"
      block
      text
      class="grey darken-4 shrink"
      @click="loadReleases">
      {{ $t('common.showMore') }}
    </v-btn>

  </div>
</template>

<script>

import Loader from './components/loader'
import Toolbar from './components/toolbar'
import Filters from './components/filters'
import Release from './components/release'

import { toRelease } from '@utils/router/views/routerViews'
import { useCatalogStore } from '@store/catalog/useCatalogStore'
import {nextTick} from "vue";

export default {
  name: 'Catalog.View',
  meta () {
    return { title: this.$t('catalog.pageTitle') }
  },
  components: {
    Loader,
    Toolbar,
    Filters,
    Release,
  },

  data () {
    return {
      settings: false,
    }
  },

  computed: {
    _page () { return useCatalogStore().items.page },
    _items () { return useCatalogStore().items.data },
    _loading () { return useCatalogStore().items.loading },
    _perPage () { return useCatalogStore().items.perPage },
    _pagination () { return useCatalogStore().items.pagination },
    _is_initialized () { return useCatalogStore().is_initialized },

    /**
     * Check if last items from server is equals to pet page items
     * That means that there are more items on server
     *
     * @return {boolean}
     */
    hasMoreItems () {
      return this.$__get(this._pagination, 'lastItems', 0) === this._perPage
    },

  },

  methods: {
    _getCatalogItems () { return useCatalogStore().getCatalogItems() },
    _setPaginationPage (page) { return useCatalogStore().setPaginationPage(page) },
    _clearCatalogReleases () { return useCatalogStore().clearCatalogReleases() },

    toRelease (release) { toRelease(release) },

    /**
     * Show releases
     * Reset releases
     *
     */
    async showReleases () {
      await this._clearCatalogReleases()
      await this._setPaginationPage(1)
      await this._getCatalogItems()
    },

    /**
     * Load more releases from next page
     *
     * @return void
     */
    async loadReleases () {
      await this._setPaginationPage(this._page + 1)
      await this._getCatalogItems()
    },

  },

  created () {

    // Show releases on initial load
    if (this._is_initialized === false) this.showReleases()

  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
        nextTick(() => {
          if (from && from.name === 'release') {
            const fromReleaseId = vm.$__get(from, 'params.releaseId')
            const releaseContainer = vm.$refs[fromReleaseId]
            // If div container is found
            // Scroll into view
            if (releaseContainer && releaseContainer[0]) {
              releaseContainer[0].$el.scrollIntoView({ block: 'center' })
            }
          }
        })
    })
  },

}
</script>
