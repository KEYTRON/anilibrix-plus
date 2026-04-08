<template>

  <!-- Check if release is in favorite -->
  <!-- Remove release from favorites -->
  <v-btn
    v-if="_isAuthorized"
    :color="isInFavorite ? 'secondary' : color"
    :loading="_loading"
    @click.stop="isInFavorite ? _removeFromFavorites(release) : _addToFavorites(release)">

    <v-icon v-if="isInFavorite">mdi-star</v-icon>
    <v-icon v-else>mdi-star-outline</v-icon>
    <span v-if="favoriteRating" class="ml-1">{{ favoriteRating }}</span>

  </v-btn>
</template>

<script>

import { useAccountStore } from '@store/app/account/useAccountStore'
import { useFavoritesStore } from '@store/favorites/useFavoritesStore'

const props = {
  release: {
    type: Object,
    default: null
  },
  color: {
    type: String,
    default: null
  }
}

export default {
  props,
  computed: {
    _loading () { return useFavoritesStore().loading },
    _isAuthorized () { return useAccountStore().isAuthorized },

    /**
     * Check if provided release is in favorite
     *
     * @return {*}
     */
    isInFavorite () {
      return useFavoritesStore().isInFavorite(this.release)
    },

    /**
    * Get release favorite rating
    *
    * @return {*}
    */
    favoriteRating() {
      return this.$__get(this.release, 'favoriteRating.text')
    }

  },

  methods: {
    _addToFavorites (release) { return useFavoritesStore().addToFavorites(release) },
    _removeFromFavorites (release) { return useFavoritesStore().removeFromFavorites(release) },
  },
}
</script>

