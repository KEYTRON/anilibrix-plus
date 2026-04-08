// Pinia stores — re-export everything from one place

export { useAppStore } from './app/useAppStore'
export { useAccountStore } from './app/account/useAccountStore'
export { useSettingsStore } from './app/settings/useSettingsStore'
export { useWatchStore } from './app/watch/useWatchStore'
export { useReleaseStore } from './release/useReleaseStore'
export { useCatalogStore } from './catalog/useCatalogStore'
export { useReleasesStore } from './releases/useReleasesStore'
export { useFavoritesStore } from './favorites/useFavoritesStore'
export { useNotificationsStore } from './notifications/useNotificationsStore'

/**
 * Convenience helper — kept for any code that previously called setUserId() at startup.
 * Usage: import { setUserId } from '@/renderer/store'; await setUserId()
 */
export async function setUserId () {
  const { useAccountStore } = await import('./app/account/useAccountStore')
  useAccountStore().setUserId()
}
