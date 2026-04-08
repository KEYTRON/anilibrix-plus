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
    :placeholder="$t('catalog.yearsPlaceholder')"
    :value="_value"
    :items="_items"
    :loading="_loading"
    @input="_setFilterValue({filter: 'years', value: $event})">

  </v-autocomplete>
</template>

<script>

import { useCatalogStore } from '@store/catalog/useCatalogStore'

export default {
  computed: {
    _items () { return useCatalogStore().filters.years.items },
    _value () { return useCatalogStore().filters.years.value },
    _loading () { return useCatalogStore().filters.years.loading },
  },

  methods: {
    _setFilterValue (payload) { useCatalogStore().setFilterValue(payload) },
    _getCatalogYearsFilter () { return useCatalogStore().getCatalogYearsFilter() },
  },

  created () {
    this._getCatalogYearsFilter()
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
