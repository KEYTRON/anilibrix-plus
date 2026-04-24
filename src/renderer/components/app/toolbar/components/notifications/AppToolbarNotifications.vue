<template>
  <v-menu location="bottom end" :offset="[8, 0]" min-width="400" max-width="400" max-height="300">
    <template #activator="{ props: menuProps }">
      <v-badge
        bordered
        dot
        :content="unseen"
        :model-value="unseen > 0">
        <v-btn icon size="small" v-bind="menuProps" @click="_setSeen()">
          <v-icon size="18">mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <!-- Notifications -->
    <v-card v-if="_items && _items.length > 0" elevation="12">
      <div class="d-flex align-center px-4 py-2">
        <h5 class="text-medium-emphasis">{{ $t('toolbar.notificationsWeek') }}</h5>
        <v-spacer/>
        <v-btn icon size="small" variant="text" @click.stop="_clearNotifications()">
          <v-icon size="18">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider/>
      <v-list density="compact">
        <template v-for="(notification, k) in _items" :key="k">
          <v-divider v-if="k > 0"/>
          <notification-item v-bind="{notification}"/>
        </template>
      </v-list>
    </v-card>

    <!-- Empty -->
    <v-card v-else>
      <div class="d-flex align-center pa-4 text-caption text-medium-emphasis">
        <div class="mr-4">
          <v-icon>mdi-bell</v-icon>
        </div>
        <div>
          <div>{{ $t('toolbar.notificationsEmptyTitle') }}</div>
          <div>{{ $t('toolbar.notificationsEmptySubtitle') }}</div>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script>

import NotificationItem from './components/item'
import { useNotificationsStore } from '@store/notifications/useNotificationsStore'

export default {
  components: {
    NotificationItem
  },
  computed: {
    _items () {
      return useNotificationsStore().items
    },

    /**
     * Get unseen notifications
     *
     * @return {number}
     */
    unseen () {
      return this._items.filter(item => item.is_seen === false).length
    }

  },

  methods: {
    _setSeen () { useNotificationsStore().setSeen() },
    _clearNotifications () { useNotificationsStore().clearNotifications() }
  }

}
</script>
