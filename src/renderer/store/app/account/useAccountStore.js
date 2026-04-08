// Proxy
import AccountProxy from '@proxies/account'

// Utils
import __get from 'lodash/get'
import { randomUUID as uuid } from 'crypto'

// Handlers
import { showAppError } from '@main/handlers/notifications/notifications-handler'
import * as safeStorage from '@main/utils/safe-storage'

import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({
    userId: null,
    session: null,
    profile: {
      id: null,
      login: null,
      avatar: null
    }
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
     */
    async login ({ login, password }) {
      try {
        this.setSession(null)
        this.setProfile(null)
        return await new AccountProxy().login({ login, password })
      } catch (error) {
        showAppError(error)
      }
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
        safeStorage.remove('user.login')
        safeStorage.remove('user.password')
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
        const login = safeStorage.getDecrypted('user.login')
        const password = safeStorage.getDecrypted('user.password')

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
     * Set account id — generate random uuid if not set yet
     */
    setUserId () {
      if (this.userId === null) this.userId = uuid()
    },

    /**
     * Set session value
     */
    setSession (session = null) {
      this.session = session || null
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
