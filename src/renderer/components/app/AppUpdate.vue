<template>
  <v-dialog
    v-model="visible"
    persistent
    max-width="650"
    content-class="update-dialog__content"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ $t('update.title') }}
      </v-card-title>

      <v-card-text>
        <pre style="white-space: pre-wrap; font-family: inherit;">{{ notes }}</pre>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="red darken-1"
          variant="text"
          v-on:click="visible = false"
        >
          {{ $t('common.close') }}
        </v-btn>

        <v-btn variant="text" @click="openLink(repository.url)">
          {{ $t('update.github') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { repository } from '@package'
import { shell } from "electron";

export default {
  props: {
    notes: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      repository,
      visible: false,
      loading: false
    }
  },
  methods: {
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
    },

    openLink (url) {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        shell.openExternal(url)
      }
    }
  }

}
</script>

<style>
.update-dialog__content {
  width: min(650px, calc(100vw - 32px));
  margin: auto;
}

.update-dialog__content .v-card {
  background: #1f1f1f;
  color: #fff;
}
</style>
