<template>
  <v-tooltip location="left" :text="$t('toolbar.settings')">
    <template #activator="{ props }">
      <v-btn :ripple="false" icon size="default" v-bind="props" @click="_setDrawer(!_drawer)">
        <v-icon size="22">mdi-cog</v-icon>
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
