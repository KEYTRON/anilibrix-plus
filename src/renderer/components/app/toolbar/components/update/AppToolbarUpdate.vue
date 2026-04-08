<template>
  <div>
    <v-tooltip left activator="#toolbar__reload">
      <div class="py-1" :style="{ lineHeight: 1 }">
        <div class="font-weight-bold">{{ $t('toolbar.refreshTitle') }}</div>
        <div class="caption">{{ $t('toolbar.refreshedAt', { datetime }) }}</div>
      </div>
    </v-tooltip>

    <v-btn
      icon
      id="toolbar__reload"
      :disabled="_loading"
      @click="() => getReleases()">
      <v-fade-transition mode="out-in">
        <v-progress-circular v-if="_loading" indeterminate size="20"/>
        <v-icon v-else>mdi-refresh</v-icon>
      </v-fade-transition>
    </v-btn>
  </div>
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
