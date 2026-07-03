<template>
  <v-autocomplete
    v-bind="{ items, loading }"
    variant="solo"
    density="comfortable"
    flat
    bg-color="transparent"
    menu-icon=""
    no-filter
    hide-details
    hide-no-data
    return-object
    ref="search"
    item-value="id"
    item-title="names.ru"
    class="toolbar-search"
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
    min-height: 38px;
    border-radius: 999px !important;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: linear-gradient(180deg, rgba(22, 22, 22, 0.94) 0%, rgba(20, 20, 20, 0.86) 100%) !important;
    box-shadow: none !important;
    overflow: hidden;
  }

  :deep(.v-field--variant-solo) {
    box-shadow: none !important;
  }

  :deep(.v-field__overlay) {
    border-radius: 999px !important;
    background: transparent !important;
    opacity: 1 !important;
    overflow: hidden;
  }

  :deep(.v-field.v-field--focused) {
    border-color: rgba(255, 255, 255, 0.14);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 0 0 1px rgba(255, 255, 255, 0.03) !important;
  }

  :deep(.v-field__field) {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    align-items: center;
  }

  :deep(.v-field__append-inner),
  :deep(.v-field__clearable) {
    display: none;
  }

  :deep(.v-field__input) {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 38px;
    padding-top: 0;
    padding-bottom: 0;
    padding-inline: 14px 12px;
    font-size: 0.84rem;
    line-height: 1.1;
    color: rgba(255, 255, 255, 0.92);
  }

  :deep(input) {
    width: 100% !important;
    min-width: 100% !important;
    height: 100%;
    line-height: 38px;
    align-self: center;
    outline: none !important;
    border: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
    appearance: none;
    -webkit-appearance: none;
  }

  :deep(input:focus),
  :deep(input:focus-visible) {
    outline: none !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  :deep(input::placeholder) {
    color: rgba(255, 255, 255, 0.5);
    opacity: 1;
  }
}
</style>
