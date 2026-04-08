<template>
  <v-dialog
    v-model="visible"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ $t('dialogs.createSnapshotTitle') }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialogs.createSnapshotQuestion') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          :loading="loading"
          v-on:click="createSnapshot"
        >
          {{ $t('dialogs.yes') }}
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          :loading="loading"
          v-on:click="visible = false"
        >
          {{ $t('common.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { catGirlFetch } from '@utils/fetch'
import { useAccountStore } from '@store/app/account/useAccountStore'
import { useWatchStore } from '@store/app/watch/useWatchStore'
import { useSettingsStore } from '@store/app/settings/useSettingsStore'

export default {
  data () {
    return {
      visible: false,
      loading: false,
    }
  },
  computed: {
    _watch () { return useWatchStore().items },
    _video_buffer () { return useSettingsStore().video.buffer },
    _autoplay_next () { return useSettingsStore().autoplayNext },
    _torrents_process () { return useSettingsStore().torrents.process },
    _opening_skip_time () { return useSettingsStore().opening.skip_time },
    _opening_skip_button () { return useSettingsStore().opening.skip_button },
    _updates_enabled () { return useSettingsStore().updates.enabled },
    _updates_timeout () { return useSettingsStore().updates.timeout },
    _api_endpoint () { return useSettingsStore().api._endpoint },
    _static_endpoint () { return useSettingsStore().api._static_endpoint },
    _notifications_system () { return useSettingsStore().notifications.system },
    _session () { return useAccountStore().session },
  },
  methods: {
    async createSnapshot () {
      this.loading = true

      const watchedReleases = {}

       Object.entries(this._watch || {}).map(([key, episode]) => {
        const [releaseId, episodeId] = key.split(':');
        watchedReleases[releaseId] || (watchedReleases[releaseId] = { episodes: [] })
        watchedReleases[releaseId].episodes.push({
          percentage: episode.percentage,
          episode: episodeId,
          isSeen: !!episode.isSeen,
          timestamp: episode.time < 0 ? 0 : episode.time
        })
      })

      const watched = Object.entries(watchedReleases).map(([key, obj]) => {
        return {
          releaseId: key,
          ...obj
        }
      })

      await catGirlFetch(process.env.EXT_API_SERVER + '/snapshot', {
        method: 'PUT',
        headers: {
          'x-session': this._session,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          watched,
          settings: {
            playTorrents: this._torrents_process  || false,
            videoBuffer: this._video_buffer,
            enableOpeningSkipButton: this._opening_skip_button || false,
            openingSkipTime: this._opening_skip_time,
            autoPlayNext: this._autoplay_next  || false,
            showSystemNotifications: this._notifications_system || false,
            staticEndpoint: this._static_endpoint,
            apiEndpoint: this._api_endpoint,
            autoUpdateReleases: this._updates_enabled || true,
            autoUpdateInterval: this._updates_timeout
          }
        })
      })
        .then(x => x.json())
        .then(({
          data,
          success,
          error
        }) => {
          if (!success) throw error
          this.hideDialog()
          this.$emit('fetchSnapshots')
        }).catch((error) => this.$toasted.show(error, { type: 'error' }))
      this.loading = false
    },
    hideDialog () {
      this.visible = false
    },
    /**
     * Show dialog
     *
     * @return void
     */
    showDialog () {
      this.visible = true
    }
  }

}
</script>
