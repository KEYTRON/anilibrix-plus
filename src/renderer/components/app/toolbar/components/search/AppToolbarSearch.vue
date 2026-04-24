<template>
  <v-autocomplete
    v-bind="{ items, loading }"
    variant="solo"
    density="compact"
    rounded
    menu-icon=""
    no-filter
    hide-details
    hide-no-data
    return-object
    ref="search"
    item-value="id"
    item-title="names.ru"
    class="toolbar-search grey darken-2"
    :placeholder="$t('toolbar.searchPlaceholder')"
    :append-inner-icon="undefined"
    v-model:search="search"
    @blur="_setSearching(false)"
    @focus="_setSearching(true)"
    @update:model-value="toRelease">

    <template v-slot:item="{ item, props }">
      <v-list-item v-bind="props" :title="item.raw.names.ru" :subtitle="item.raw.names.original">
        <template v-slot:prepend>
          <v-avatar>
            <v-img :src="item.raw.poster"/>
          </v-avatar>
        </template>
      </v-list-item>
    </template>

  </v-autocomplete>
</template>

<script>

import __debounce from 'lodash/debounce'
import { toRelease } from '@utils/router/views/routerViews'
import { useAppStore } from '@store/app/useAppStore'
import { useReleasesStore } from '@store/releases/useReleasesStore'

export default {
  data () {
    return {
      items: [],
      search: null,
      loading: false,
      visible: false,
    }
  },

  computed: {
    _is_searching () { return useAppStore().is_searching },
  },

  methods: {
    _setSearching (val) { useAppStore().setSearching(val) },

    /**
     * Get releases
     *
     * @param searchQuery
     */
    getReleases: __debounce(async function (searchQuery) {

      // Set loading state
      // Get releases from server
      this.loading = true
      this.items = await useReleasesStore().searchReleases(searchQuery)

      // Reset loading
      this.loading = false

    }, 1000),

    /**
     * Open release view
     *
     * @param release
     * @return void
     */
    toRelease (release) {
      if (release) {
        this.search = null
        this.items = []
        this.visible = false
        this._setSearching(false)
        toRelease(release)
      }
    }

  },

  watch: {

    search: {
      handler (search) {
        if (search && search.length >= 3) {

          // Get releases
          this.getReleases(search)

          // Check if metrics is available
          // Hit metrics event
          if (this.$metrika) {
            this.$metrika.hit(`/search?query=${search}`)
          }

        } else {

          // Reset items
          this.items = []
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar-search {
  width: 100%;
  flex: 1 1 auto;
  min-width: 0;

  :deep(.v-input__control) {
    width: 100%;
    min-width: 0;
  }

  :deep(.v-field) {
    width: 100%;
    border-radius: 20px !important;
    box-shadow: none;
    overflow: hidden;
  }

  :deep(.v-field__field) {
    flex: 1 1 auto;
    min-width: 0;
  }

  :deep(.v-field__append-inner),
  :deep(.v-field__clearable) {
    display: none;
  }

  :deep(.v-field__input) {
    width: 100%;
    min-height: 34px;
    padding-top: 0;
    padding-bottom: 0;
    padding-inline: 14px 10px;
    font-size: 0.86rem;
  }

  :deep(input) {
    width: 100% !important;
    min-width: 100% !important;
  }
}
</style>
