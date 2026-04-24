<template>
  <div class="release__data">
    <loader v-if="loading || !release"/>
    <div v-else class="release__content">

      <!-- Release Data -->
      <div class="release__title allow-select">{{ title }}</div>
      <div class="release__subtitle allow-select">{{ subtitle }}</div>
      <div class="release__genres">{{ genres }}</div>

      <!-- Episode -->
      <!-- Favorite action -->
      <div class="release__meta">
        <favorite v-bind="{release}" class="mr-1"/>
        <v-chip
          v-if="rating"
          label
          class="release__chip release__chip--rating">
          <v-icon size="13" start>mdi-star</v-icon>
          {{ rating }}
        </v-chip>
        <v-chip
          v-if="episode"
          v-text="episodeTitle"
          label
          color="secondary"
          class="release__chip release__chip--episode"/>
        <v-chip
          v-if="type"
          v-text="type"
          label
          class="release__chip release__chip--type"/>
      </div>

      <!-- Description -->
      <div class="release__description allow-select">{{ description }}</div>

    </div>
  </div>
</template>

<script>

import Loader from './components/loader'
import Favorite from '@components/release/favorite'

const props = {
  release: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: true
  },
  episode: {
    type: Object,
    default: null
  }
}

export default {
  props,
  components: {
    Loader,
    Favorite,
  },
  computed: {

    /**
     * Get release title
     *
     * @return {string|null}
     */
    title () {
      return this.$__get(this.release, 'names.ru')
    },

    /**
     * Get subtitle
     *
     * @return {string|null}
     */
    subtitle () {
      return this.$__get(this.release, 'names.original')
    },

    /**
     * Get release genres
     *
     * @return {string|null}
     */
    genres () {
      return (this.$__get(this.release, 'genres') || []).join(' | ')
    },

    /**
     * Get description
     *
     * @return {string|null}
     */
    description () {
      return this.$__get(this.release, 'description')
    },

    /**
     * Get episode title
     *
     * @return {string|null}
     */
    episodeTitle () {
      return this.$__get(this.episode, 'title')
        || this.$__get(this.episode, 'name')
        || null
    },

    /**
    * Get release type
    *
    * @return {*}
    */
    type () {
      return this.$__get(this.release, 'type')
    },

    /**
     * Get favorite rating text (only if count > 0)
     *
     * @return {string|null}
     */
    rating () {
      const count = this.$__get(this.release, 'favoriteRating.count')
      return count > 0 ? this.$__get(this.release, 'favoriteRating.text') : null
    }

  }
}

</script>

<style lang="scss" scoped>

.release {
  &__data {
    width: 100%;
    user-select: none;
    display: flex;
  }

  &__content {
    max-width: min(1120px, 100%);
  }

  &__title {
    font-size: clamp(1.85rem, 3.15vw, 2.95rem);
    line-height: 0.98;
    font-weight: 900;
    letter-spacing: -0.04em;
    margin-bottom: 6px;
  }

  &__subtitle {
    font-size: 1.05rem;
    line-height: 1.25;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 4px;
  }

  &__genres {
    font-size: 0.92rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  &__chip {
    min-height: 36px;
    font-weight: 700;
  }

  &__chip--type {
    background: #1f1f1f;
    color: #fff;
  }

  &__chip--rating {
    background: #1f1f1f;
    color: #ffd54f;
  }

  &__description {
    max-width: min(1040px, 100%);
    color: rgba(255, 255, 255, 0.66);
    font-size: 0.97rem;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@media (max-width: 960px) {
  .release {
    &__title {
      font-size: 1.7rem;
      line-height: 1;
    }

    &__subtitle {
      font-size: 1rem;
    }

    &__genres,
    &__description {
      font-size: 0.95rem;
    }
  }
}

</style>
