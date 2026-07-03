<template>
  <v-tooltip location="left">
    <template #default>
      <div class="py-1" :style="{ lineHeight: 1 }">
        <div class="font-weight-bold">{{ $t('toolbar.refreshTitle') }}</div>
        <div class="text-caption">{{ $t('toolbar.refreshedAt', { datetime }) }}</div>
      </div>
    </template>
    <template #activator="{ props }">
      <v-btn :ripple="false" icon size="default" v-bind="props" :disabled="_loading" @click="getReleases()">
        <v-fade-transition mode="out-in">
          <v-progress-circular v-if="_loading" indeterminate size="18"/>
          <v-icon v-else size="22">mdi-refresh</v-icon>
        </v-fade-transition>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script>

import { useReleasesStore } from '@store/releases/useReleasesStore'

export default {
  computed: {
    _loading () { return useReleasesStore().loading },
    _datetime () { return useReleasesStore().datetime },

    /**
     * Get human update datetime
     *
     * @return {any}
     */
    datetime () {
      return this._datetime
        ? new Date(this._datetime).toLocaleString()
        : null
    }

  },
  methods: {
    getReleases () { return useReleasesStore().getReleases() },
  }
}
</script>
