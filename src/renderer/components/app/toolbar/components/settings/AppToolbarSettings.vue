<template>
  <div>
    <v-btn icon id="toolbar__settings" v-on:click="_setDrawer(!_drawer)">
      <v-icon>mdi-settings</v-icon>
    </v-btn>

    <v-tooltip left activator="#toolbar__settings">{{ $t('toolbar.settings') }}</v-tooltip>
  </div>
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
