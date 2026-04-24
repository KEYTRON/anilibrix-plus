<template>
  <v-tooltip location="left" :text="$t('toolbar.settings')">
    <template #activator="{ props }">
      <v-btn icon size="small" v-bind="props" @click="_setDrawer(!_drawer)">
        <v-icon size="18">mdi-cog</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script>

import { useAppStore } from '@store/app/useAppStore'

export default {
  computed: {
    _drawer () { return useAppStore().drawer },
  },

  methods: {
    _setDrawer (val) { useAppStore().setDrawer(val) },
  }
}
</script>
