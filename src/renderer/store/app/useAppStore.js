import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    drawer: false,
    welcome_view: null,
    is_searching: false
  }),

  actions: {
    setDrawer (drawer) {
      this.drawer = drawer
    },

    setSearching (state) {
      this.is_searching = state
    },

    setWelcomeView (welcomeView) {
      this.welcome_view = welcomeView
    }
  },

  persist: true
})
