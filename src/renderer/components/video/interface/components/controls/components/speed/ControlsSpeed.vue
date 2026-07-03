<template>
  <v-menu location="top">

    <template v-slot:activator="{ props: menuProps }">
      <v-btn v-bind="menuProps" icon variant="text" size="large" :title="$t('player.speed') || 'Скорость'">
        <span class="text-caption font-weight-bold">{{ active.label }}</span>
      </v-btn>
    </template>

    <v-list density="compact" bg-color="#1e1e1e">
      <v-list-item
        v-for="(s, k) in variants"
        :key="k"
        :active="s.value === active.value"
        @click="$emit('click', s.value)">
        <v-list-item-title>{{ s.label }}</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script>

const props = {
  player: {
    type: Object,
    default: null
  },
  attach: {
    type: HTMLDivElement,
    default: null
  }
}

export default {
  props,
  emits: ['click'],
  data () {
    return {
      speed: 1
    }
  },
  computed: {

    /**
     * Get speed variants
     *
     * @return {array}
     */
    variants () {
      return [
        {
          label: '2x',
          value: 2
        },
        {
          label: '1.75x',
          value: 1.75
        },
        {
          label: '1.5x',
          value: 1.50
        },
        {
          label: '1.25x',
          value: 1.25
        },
        {
          label: '1x',
          value: 1
        },
        {
          label: '0.75x',
          value: 0.75
        },
        {
          label: '0.5x',
          value: 0.5
        },
      ]
    },

    /**
     * Get selected speed
     *
     * @return {{}}
     */
    active () {
      return this.variants.find(variant => variant.value === this.speed)
    }

  },

  created () {

    this.speed = this.player.speed
    this.player.on('ratechange', () => this.speed = this.player.speed)

  }
}
</script>
