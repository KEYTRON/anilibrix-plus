<template>
  <div ref="settings">

    <div class="pa-4 caption grey--text">
      <div class="body-1">{{ $t('settings.playbackTitle') }}</div>
      <div>{{ $t('settings.playbackDescription') }}</div>
    </div>

    <!-- Torrents -->
    <v-card>
      <v-card-subtitle class="pb-0 font-weight-bold">{{ $t('settings.torrentsTitle') }}</v-card-subtitle>
      <v-card-text class="mt-2 caption">
        <div class="pb-2">
          {{ $t('settings.torrentsDescriptionPrimary') }}
        </div>
        <div>
          {{ $t('settings.torrentsDescriptionSecondary') }}
        </div>
      </v-card-text>
      <v-list-item dense @click="_setTorrentsProcess(!_torrents_process)">
        <v-list-item-title>{{ $t('settings.torrentsEnabled') }}</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_torrents_process" @change="_setTorrentsProcess"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="caption">
        {{ $t('settings.torrentsHint') }}
      </v-card-text>
    </v-card>

    <!-- Autoplay -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setAutoplayNext(!_autoplay_next)">
        <v-list-item-title>{{ $t('settings.autoplayNext') }}</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_autoplay_next" @change="_setAutoplayNext"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        {{ $t('settings.autoplayNextHint') }}
      </v-card-text>
    </v-card>


    <!-- Buffer -->
    <v-card class="mt-2">
      <v-card-text class="pb-2 caption">
        <div>{{ $t('settings.bufferTitle') }}</div>
        <div>{{ $t('settings.bufferHint') }}</div>
      </v-card-text>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          min="60"
          class="mb-2"
          type="number"
          :label="$t('settings.bufferLabel')"
          :suffix="$t('common.secondsShort')"
          :value="_video_buffer"
          @input="_setVideoBuffer(parseInt($event) > 0 ? parseInt($event) : 60)">
        </v-text-field>
      </v-card-text>
      <v-card-text class="pt-0 caption">
        <div>{{ $t('settings.bufferDescription') }}</div>
      </v-card-text>
    </v-card>


    <!-- Opening Skip Button -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setAutoSkip(!_auto_opening_skip)">
        <v-list-item-title>{{ $t('settings.autoSkip') }}</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_auto_opening_skip" @change="_setAutoSkip"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        <div>
          {{ $t('settings.autoSkipHint') }}
        </div>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text class="caption">{{ $t('settings.autoSkipHotkey') }}</v-card-text>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mb-2"
          type="text"
          :label="$t('settings.hotkeyInput')"
          clearable
          :value="_auto_opening_skip_key"
          @click:clear="_setAutoSkipKey('')"
          @keyup.prevent="bindAutoSkip('keyup', $event)"
          @keydown.prevent="bindAutoSkip('keydown', $event)">
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-divider/>

    <v-divider/>

    <!-- Opening Skip Button -->
    <v-card class="mt-2">
      <v-list-item dense @click="_setOpeningSkipButton(!_opening_skip_button)">
        <v-list-item-title>{{ $t('settings.openingSkipButton') }}</v-list-item-title>
        <v-list-item-action class="mr-2">
          <v-switch :input-value="_opening_skip_button" @change="_setOpeningSkipButton"/>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="pt-2 caption">
        <div>
          {{ $t('settings.openingSkipButtonHint') }}
        </div>
        <div>{{ $t('settings.openingSkipButtonHintExtra') }}</div>
      </v-card-text>
    </v-card>
    <v-divider/>

    <v-card>
      <v-card-text class="caption">{{ $t('settings.openingSkipButtonHotkey') }}</v-card-text>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mb-2"
          type="text"
          :label="$t('settings.hotkeyInput')"
          clearable
          :value="_opening_skip_button_key"
          @click:clear="_setOpeningSkipButtonKey('')"
          @keyup.prevent="bindSkip('keyup', $event)"
          @keydown.prevent="bindSkip('keydown', $event)">
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-divider/>

    <!-- Opening Skip Time -->
    <v-card>
      <v-card-text class="pb-2 caption">{{ $t('settings.openingSkipTimeHint') }}</v-card-text>
      <v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mb-2"
          type="number"
          :label="$t('settings.openingSkipTimeLabel')"
          :suffix="$t('common.secondsShort')"
          :value="_opening_skip_time"
          @input="_setOpeningSkipTime($event ? parseInt($event) : 0)">
        </v-text-field>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>

import { useSettingsStore } from '@store/app/settings/useSettingsStore'

export default {
  computed: {
    _video_buffer () { return useSettingsStore().video.buffer },
    _autoplay_next () { return useSettingsStore().autoplayNext },
    _torrents_process () { return useSettingsStore().torrents.process },
    _opening_skip_time () { return useSettingsStore().opening.skip_time },
    _opening_skip_button () { return useSettingsStore().opening.skip_button },
    _opening_skip_button_key () { return useSettingsStore().opening.skip_button_key },
    _auto_opening_skip () { return useSettingsStore().opening.autoSkip },
    _auto_opening_skip_key () { return useSettingsStore().opening.autoSkipKey },
  },
  data () {
    return {
      keysDown: []
    }
  },
  methods: {
    bindAutoSkip (type, e) {
      if (type === 'keydown') {
        if (this.keysDown.indexOf(e.code) === -1) {
          this.keysDown.push(e.code);
        }

        if (this.keysDown.length && !['ControlLeft'].includes(this.keysDown.toString())) {
          useSettingsStore().setAutoSkipKey(this.keysDown.join('+'))
        }
      } else if (type === 'keyup') {
        const index = this.keysDown.indexOf(e.code);

        if (index !== -1) {
          this.keysDown.splice(index, 1);
        }
      }
    },
    bindSkip (type, e) {
      if (type === 'keydown') {
        if (this.keysDown.indexOf(e.code) === -1) {
          this.keysDown.push(e.code);
        }

        if (this.keysDown.length && !['ControlLeft'].includes(this.keysDown.toString())) {
          useSettingsStore().setOpeningSkipButtonKey(this.keysDown.join('+'))
        }
      } else if (type === 'keyup') {
        const index = this.keysDown.indexOf(e.code);

        if (index !== -1) {
          this.keysDown.splice(index, 1);
        }
      }
    },
    _setAutoSkip (v) { useSettingsStore().setAutoSkip(v) },
    _setVideoBuffer (v) { useSettingsStore().setVideoBuffer(v) },
    _setAutoplayNext (v) { useSettingsStore().setAutoplayNext(v) },
    _setTorrentsProcess (v) { useSettingsStore().setTorrentsProcess(v) },
    _setOpeningSkipTime (v) { useSettingsStore().setOpeningSkipTime(v) },
    _setOpeningSkipButton (v) { useSettingsStore().setOpeningSkipButton(v) },
    _setOpeningSkipButtonKey (v) { useSettingsStore().setOpeningSkipButtonKey(v) },
    _setAutoSkipKey (v) { useSettingsStore().setAutoSkipKey(v) },
  }

}
</script>
