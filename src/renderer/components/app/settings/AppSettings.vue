<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    fixed
    temporary
    width="400"
    class="settings">

    <!-- System bar offset -->
    <system-bar-placeholder fixed/>

    <!-- Header -->
    <v-toolbar flat class="shrink" color="#363636" :class="{'mt-9': !this.isMacOnFullscreen}">
      <v-toolbar-title class="body-1">{{ $t('settings.title') }}</v-toolbar-title>
      <v-spacer/>
      <v-tooltip left>
        <template v-slot:activator="{ props }">
          <v-btn
            small
            text
            min-width="48"
            class="font-weight-bold"
            v-bind="props"
            @click="toggleLanguage">
            {{ nextLanguageLabel }}
          </v-btn>
        </template>
        <span>{{ languageTooltip }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider/>


    <!-- Categories -->
    <component
      v-for="(category, k) in categories"
      class="mb-2"
      :is="category"
      :key="k">
    </component>


    <!-- Credentials -->
    <credentials/>


  </v-navigation-drawer>
</template>

<script>

import Credentials from './components/credentials'
import PlayerSettings from './categories/player'

import SystemSettings from './categories/system'
import ActionsSettings from './categories/actions'
import DevtoolsSettings from './categories/devtools'
import AnilibriaSettings from './categories/app'

import SystemBarPlaceholder from './../systembar/placeholder'

import { AppPlatformMixin } from '@mixins/app'
import { useAppStore } from '@store/app/useAppStore'
import { useSettingsStore } from '@store/app/settings/useSettingsStore'

export default {
  mixins: [AppPlatformMixin],
  components: {
    Credentials,
    SystemBarPlaceholder
  },
  computed: {
    /**
     * Get categories components
     *
     * @return Array
     */
    categories () {
      const settingsStore = useSettingsStore()
      return [
        PlayerSettings,
        SystemSettings,
        ActionsSettings,
        AnilibriaSettings,
        settingsStore.devtools ? DevtoolsSettings : null
      ].filter(category => category)
    },

    drawer: {

      /**
       * Get drawer state
       *
       * @return boolean
       */
      get () {
        return !!useAppStore().drawer
      },

      /**
       * Set drawer state
       *
       * @param state
       * @return void
       */
      set (state) {
        useAppStore().setDrawer(state)
      }
    },

    nextLanguageLabel () {
      return this.$locale === 'ru' ? 'EN' : 'RU'
    },

    languageTooltip () {
      return this.$locale === 'ru'
        ? this.$t('language.switchToEnglish')
        : this.$t('language.switchToRussian')
    }

  },

  methods: {
    toggleLanguage () {
      useSettingsStore().setLanguage(this.$locale === 'ru' ? 'en' : 'ru')
    }
  }

}
</script>

<style>
/*
  See: https://github.com/buefy/buefy/issues/2096
  See: https://stackoverflow.com/questions/14677490/blurry-text-after-using-css-transform-scale-in-chrome
*/
.v-navigation-drawer__content {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>

<style lang="scss" scoped>
.settings {

  ::v-deep {
    .v-navigation-drawer__content {
      overflow-y: scroll;
    }
  }


  ::-webkit-scrollbar-thumb {
    background-color: black;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
  }
}

</style>
