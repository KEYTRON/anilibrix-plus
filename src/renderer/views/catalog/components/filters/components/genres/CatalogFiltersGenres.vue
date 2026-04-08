<template>
  <v-autocomplete
    chips
    outlined
    multiple
    clearable
    hide-details
    hide-no-data
    deletable-chips
    class="filter"
    :placeholder="$t('catalog.genresPlaceholder')"
    :value="_value"
    :items="_items"
    :loading="_loading"
    @input="_setFilterValue({filter: 'genres', value: $event})">

  </v-autocomplete>
</template>

<script>

import { useCatalogStore } from '@store/catalog/useCatalogStore'

export default {
  computed: {
    _items () { return useCatalogStore().filters.genres.items },
    _value () { return useCatalogStore().filters.genres.value },
    _loading () { return useCatalogStore().filters.genres.loading },
  },

  methods: {
    _setFilterValue (payload) { useCatalogStore().setFilterValue(payload) },
    _getCatalogGenresFilter () { return useCatalogStore().getCatalogGenresFilter() },
  },

  created () {
    this._getCatalogGenresFilter()
  }
}
</script>

<style lang="scss" scoped>

.filter {
  ::v-deep {
    .v-chip {
      border-radius: 4px;
    }
  }
}

</style>
