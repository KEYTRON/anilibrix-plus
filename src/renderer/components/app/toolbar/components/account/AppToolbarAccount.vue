<template>
  <div>

    <!-- Login -->
    <template v-if="!_isAuthorized">
      <v-tooltip location="left" :text="$t('toolbar.login')">
        <template #activator="{ props }">
          <v-btn icon size="default" v-bind="props" @click="toLogin">
            <v-icon size="26">mdi-account</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </template>

    <!-- Profile -->
    <template v-else>
      <v-menu
        v-model="menu"
        location="bottom end"
        :offset="[8, 0]"
        min-width="180">
        <template #activator="{ props }">
          <v-btn icon size="default" v-bind="props">
            <v-icon v-if="menu" size="26">mdi-account</v-icon>
            <v-avatar size="32" v-else>
              <v-img :transition="false" :src="_profile.avatar"/>
            </v-avatar>
          </v-btn>
        </template>

        <!-- User -->
        <v-list density="compact">
          <v-list-item>
            <template v-slot:prepend><v-avatar>
              <v-img :transition="false" :src="_profile.avatar"/>
            </v-avatar></template>
            
              <v-list-item-title v-text="_profile.login"/>
            <v-list-item-subtitle>ID: {{ _profile.id }}</v-list-item-subtitle>
            
          </v-list-item>
          <v-divider/>

          <!-- Profile statistics -->
          <template v-for="(item, k) in statistics" :key="k">
            <v-list-item>
              
                <v-list-item-subtitle v-text="item.title"/>
                <v-list-item-title v-text="item.value" class="font-weight-bold"/>
              
            </v-list-item>
            <v-divider/>
          </template>


          <!-- Logout -->
          <v-list-item @click="logout">
            <v-list-item-subtitle>{{ $t('common.logout') }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

      </v-menu>
    </template>

  </div>
</template>

<script>

import stringsPluralize from '@utils/strings/pluralize/stringsPluralize'
import { useAccountStore } from '@store/app/account/useAccountStore'
import { useFavoritesStore } from '@store/favorites/useFavoritesStore'
import { useWatchStore } from '@store/app/watch/useWatchStore'
import { toLogin } from '@utils/router/views/routerViews'

export default {
  data () {
    return {
      menu: false,
      loading: false,
      handler: null,
    }
  },
  computed: {
    _watch () { return useWatchStore().items },
    _favorites () { return useFavoritesStore().items },
    _profile () { return useAccountStore().profile },
    _isAuthorized () { return useAccountStore().isAuthorized },

    /**
     * Get favorites length
     *
     * @return {number}
     */
    favorites () {
      return (this._favorites || []).length
    },

    /**
     * Get episodes
     *
     * @return {number}
     */
    episodes () {
      return Object.values(this._watch || {})
        .filter(item => item.isSeen)
        .length
    },

    /**
     * Get hours
     *
     * @return {number}
     */
    hours () {
      const seconds = Object.values(this._watch || {})
        .reduce((storage, episode) => storage + (episode.time || 0), 0)

      return Math.floor((seconds || 0) / 60 / 60)
    },

    /**
     * Get profile statistics
     *
     * @return {array}
     */
    statistics () {
      return [
        {
          title: this.$t('toolbar.accountFavorites'),
          value: this.favorites ? stringsPluralize(this.favorites, this.$t('units.release')) : this.$t('common.noData'),
        },
        {
          title: this.$t('toolbar.accountWatched'),
          value: this.episodes ? stringsPluralize(this.episodes, this.$t('units.episode')) : this.$t('common.noData'),
        },
        {
          title: this.$t('toolbar.accountSpent'),
          value: this.hours > 0 ? stringsPluralize(this.hours, this.$t('units.hour')) : this.$t('common.noData'),
        }
      ]
    }

  },

  methods: {

    toLogin () { toLogin() },

    /**
     * Logout
     * Ignore error
     *
     * @return {Promise<void>}
     */
    async logout () {
      try {

        await useAccountStore().logout()

      } finally {

        // Close menu
        this.menu = false
        this.loading = false
      }
    },

    /**
     * Get profile data
     *
     * @return {Promise<void>}
     */
    async getProfile () {
      try {

        this.loading = true
        await useAccountStore().getProfile()

      } catch (e) {

        //

      } finally {
        this.loading = false
      }
    }
  },

  async mounted () {

    // Get profile data
    await this.getProfile()

    // Set profile data
    this.handler = setInterval(() => this.getProfile(), 1000 * 60 * 60 * 2)

  },

  beforeUnmount () {
    if (this.handler) {
      clearInterval(this.handler)
    }
  }
}

</script>
