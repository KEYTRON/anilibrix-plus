export default {

  methods: {

    /**
     * Handler keyboard event
     *
     * @param e
     */
    handleKeyboardEvents (e) {
      //
    }

  },

  mounted () {
    document.addEventListener('keydown', this.handleKeyboardEvents)
  },

  unmounted () {
    document.removeEventListener('keydown', this.handleKeyboardEvents)
  }
}
