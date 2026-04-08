<template>
  <v-select
    v-bind="{items}"
    outlined
    hide-details
    item-text="title"
    item-value="value"
    :placeholder="$t('catalog.sort')"
    :value="_value"
    @input="_setFilterValue({filter: 'sort', value: $event})">
  </v-select>
</template>

<script>

import { useCatalogStore } from '@store/catalog/useCatalogStore'

export default {
  data () {
    return {
      items: [
        {
          title: this.$t('catalog.sortNew'),
          value: 1
        },
        {
          title: this.$t('catalog.sortPopular'),
          value: 2
        },
      ]
    }
  },
  computed: {
    _value () { return useCatalogStore().filters.sort.value },
  },

  methods: {
    _setFilterValue (payload) { useCatalogStore().setFilterValue(payload) },
  },

}
</script>
