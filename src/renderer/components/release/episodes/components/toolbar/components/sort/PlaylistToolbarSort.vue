<template>
  <v-btn icon="mdi-sort" variant="text" @click="_setEpisodesSort(sortOrder)"></v-btn>
</template>

<script>

import { useSettingsStore } from '@store/app/settings/useSettingsStore'

export default {
  computed: {
    _sort () { return useSettingsStore().episodes.order },

    /**
     * Get sort order
     *
     * @return {string}
     */
    sortOrder () {
      return this._sort === 'asc' ? 'desc' : 'asc'
    },

  },
  methods: {
    _setEpisodesSort (order) { useSettingsStore().setEpisodesSort(order) }
  }

}
</script>
