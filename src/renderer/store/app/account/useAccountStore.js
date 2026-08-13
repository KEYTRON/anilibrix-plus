// Proxy
import AccountProxy from '@proxies/account'

// Utils
import __get from 'lodash/get'
const uuid = () => crypto.randomUUID()

// Handlers
import { showAppError } from '@utils/notifications'
import { invokeSafeStorageDecrypt, invokeSafeStorageRemove } from '@main/handlers/app/app-handlers'

import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({
    userId: null,
    session: null,
    profile: {
      id: null,
      login: null,
      avatar: null
    },
    // Flips to true once the initial silent-login attempt (via saved
    // credentials) has resolved, so views gated on isAuthorized can show a
    // loader instead of flashing "not authorized" while it's in flight.
    authReady: false
  }),

  getters: {
    /**
     * Check if user is authorized
     */
    isAuthorized: s => !!(s.session !== null && s.profile.id !== null)
  },

  actions: {
    /**
     * Try to login with provided credentials
     * Throws on failure so caller can handle specific cases (e.g. "already authorized").
     */
    async login ({ login, password }) {
      this.setSession(null)
      this.setProfile(null)
      return await new AccountProxy().login({ login, password })
    },

    /**
     * Logout user
     */
    async logout () {
      try {
        await new AccountProxy().logout()
      } catch (error) {
        throw error
      } finally {
        this.setSession(null)
        this.setProfile(null)
        await invokeSafeStorageRemove('user.login')
        await invokeSafeStorageRemove('user.password')
      }
    },

    /**
     * Get profile data
     */
    async getProfile () {
      const getProfileData = async () => {
        const profile = await new AccountProxy().getProfile()

        const id = __get(profile, 'id')
        const login = __get(profile, 'login')
        const avatar = new AccountProxy().getAvatarPath(__get(profile, 'avatar'))

        this.setProfile({ id, login, avatar })
      }

      try {
        await getProfileData()
      } catch (error) {
        const login = await invokeSafeStorageDecrypt('user.login')
        const password = await invokeSafeStorageDecrypt('user.password')

        if (login !== false && password !== false) {
          const session = await this.login({ login, password })
          this.setSession(session)
          await getProfileData()
          return
        }

        this.setSession(null)
        this.setProfile(null)

        throw error
      }
    },

    /**
     * Mark the initial auth check as resolved (success or failure)
     */
    markAuthReady () {
      this.authReady = true
    },

    /**
     * Set account id — generate random uuid if not set yet
     */
    setUserId () {
      if (this.userId === null) this.userId = uuid()
    },

    /**
     * Set session value and sync to main process (awaitable so subsequent
     * cookie-bearing requests see the updated session).
     */
    async setSession (session = null) {
      this.session = session || null
      try {
        const { ipcRenderer } = require('electron')
        await ipcRenderer.invoke('store:sync', { session: this.session })
      } catch (e) { /* ipc unavailable in tests */ }
    },

    /**
     * Set profile data
     */
    setProfile (profile = null) {
      this.profile.id = __get(profile, 'id') || null
      this.profile.login = __get(profile, 'login') || null
      this.profile.avatar = __get(profile, 'avatar') || null
    }
  }
})
