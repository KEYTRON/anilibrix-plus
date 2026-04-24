<template>
  <v-dialog
    v-model="visible"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title className="text-h5">
        {{ $t('dialogs.warning') }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialogs.removeSnapshotQuestion') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading"
          color="green darken-1"
          text
          v-on:click="deleteSnapshot"
        >
          {{ $t('dialogs.yes') }}
        </v-btn>
        <v-btn
          :loading="loading"
          color="green darken-1"
          text
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
export default {
  data () {
    return {
      visible: false,
      loading: false,
      id: null
    }
  },
  computed: {
    _session () { return useAccountStore().session },
  },
  methods: {
    deleteSnapshot: async function () {
      this.loading = true
      await catGirlFetch(process.env.EXT_API_SERVER + '/snapshot/' + this.id, {
        method: 'DELETE',
        headers: {
          'x-session': this._session
        }
      })
        .then(x => x.json())
        .then(({ success, error }) => {
          if (success) {
            return this.$emit('fetchSnapshots')
          } else this.$toast.error(error)
        })
        .catch((error) => this.$toast.error(error))
      this.loading = false
      this.hideDialog()
    },

    hideDialog () {
      this.visible = false
      this.id = null
    },
    /**
     * Show dialog
     *
     * @return void
     */
    showDialog (id) {
      this.visible = true
      this.id = id
    }
  }

}
</script>
