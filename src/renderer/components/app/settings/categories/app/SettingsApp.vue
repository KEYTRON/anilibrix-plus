<template>
  <v-card>
    <v-list dense>
      <template v-for="(item, k) in settings" :key="k">
        <v-divider v-if="k > 0"/>
        <v-list-item @click="item.action">
          
            <v-list-item-title v-text="item.title" :class="item.classes"/>
          
          <template v-slot:append><div class="text-right">
            <v-list-item-subtitle v-text="item.value"/>
          </div></template>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>

import { meta, repository } from '@package'
import { shell } from 'electron'

export default {
  computed: {

    /**
     * Get settings items
     *
     * @return array
     */
    settings () {
      return [
        {
          title: this.$t('main.anilibria'),
          value: meta.links.anilibria,
          action: () => require('@electron/remote').shell.openExternal(meta.links.anilibria),
        },
        {
          title: this.$t('main.donate'),
          value: 'YooMoney, QIWI, PayPal',
          action: () => require('@electron/remote').shell.openExternal(meta.links.donate)
        },
        {
          title: this.$t('main.unofficial'),
          action: () => require('@electron/remote').shell.openExternal(meta.links.unofficial)
        },
        {
          title: this.$t('main.telegram'),
          value: '@anilibrix',
          action: () => require('@electron/remote').shell.openExternal(meta.links.telegram)
        },
        {
          title: this.$t('main.sourceCode'),
          value: '/anilibrix',
          action: () => require('@electron/remote').shell.openExternal(repository.url)
        },
      ]
    },
  }
}

</script>
