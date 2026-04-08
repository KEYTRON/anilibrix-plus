<template>
  <v-overlay v-if="visible" absolute opacity=".85">
    <v-dialog v-bind="{attach}" v-model="visible" hide-overlay>
      <v-card>
        <v-card-title>{{ $t('dialogs.cacheTitle') }}</v-card-title>
        <v-card-subtitle class="pt-2 pb-0">{{ $t('dialogs.cacheSubtitle') }}
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-bind="{loading}" text color="red" @click="resetCache">{{ $t('dialogs.cacheConfirm') }}</v-btn>
          <v-btn v-bind="{loading}" text @click="visible = false">{{ $t('common.cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script>

const props = {
  attach: {
    type: HTMLDivElement,
    default: null
  }
}

export default {
  props,
  data () {
    return {
      visible: false,
      loading: false,
    }
  },

  methods: {

    /**
     * Show dialog
     *
     * @return void
     */
    showDialog () {
      this.visible = true
    },

    /**
     * Reset cache
     *
     * @return void
     */
    async resetCache () {
      this.loading = true
      try {
        const { useAppStore } = await import('@store/app/useAppStore')
        const { useAccountStore } = await import('@store/app/account/useAccountStore')
        const { useWatchStore } = await import('@store/app/watch/useWatchStore')
        const { useReleasesStore } = await import('@store/releases/useReleasesStore')
        const { useReleaseStore } = await import('@store/release/useReleaseStore')
        const { useCatalogStore } = await import('@store/catalog/useCatalogStore')
        const { useFavoritesStore } = await import('@store/favorites/useFavoritesStore')
        const { useNotificationsStore } = await import('@store/notifications/useNotificationsStore')

        useAppStore().$reset()
        useAccountStore().$reset()
        useWatchStore().$reset()
        useReleasesStore().$reset()
        useReleaseStore().$reset()
        useCatalogStore().$reset()
        useFavoritesStore().$reset()
        useNotificationsStore().$reset()

        require('@electron/remote').getCurrentWindow().reload()
      } finally {
        this.loading = false
      }
    }
  }

}
</script>
