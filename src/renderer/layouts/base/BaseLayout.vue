<template>
  <div class="d-flex flex-column fill-height base-layout" ref="container" id="container" :class="{ showScroll, isOnBlack }">

    <!-- App Toolbar -->
    <!-- Content -->
    <app-tool-bar/>
    <button
      v-show="fab"
      class="base-layout__to-top"
      :title="'Наверх'"
      @click="toTop">
      <span class="base-layout__to-top-icon">↑</span>
    </button>
    <slot/>

  </div>
</template>

<script>

import AppToolBar from '@components/app/toolbar'

export default {
  name: 'Layout.Base',
  components: {
    AppToolBar
  },
  data () {
    return {
      fab: false
    }
  },
  methods: {
    onScroll (e) {
      this.fab = e.target.scrollTop > 20;
    },
    toTop () {
      this.$refs.container.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
  mounted() {
    this.$refs.container.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount () {
    this.$refs.container.removeEventListener('scroll', this.onScroll)
  },
  computed: {

    /**
     * Check if should show scroll
     *
     * @return {*|boolean}
     */
    showScroll () {
      return this.$__get(this.$route, 'meta.layout.show_scroll') || false
    },

    /**
     * Check if is on black background
     *
     * @return {*|boolean}
     */
    isOnBlack () {
      return this.$__get(this.$route, 'meta.layout.is_on_black') || false
    }

  }
}
</script>

<style lang="scss" scoped>

.base-layout {
  top: 0;
  padding: 12px 5% 30px 5%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: overlay;
  width: 100%;
  height: 100vh;

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
  }


  &.showScroll {
    &::-webkit-scrollbar-thumb {
      background-color: #353535;
    }

    &::-webkit-scrollbar {
      background-color: #1d1d1d;
    }
  }

  &.isOnBlack {
    background: black;
  }

  &__to-top {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 5;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px) saturate(1.15);
    -webkit-backdrop-filter: blur(16px) saturate(1.15);
    background: linear-gradient(180deg, rgba(18, 18, 18, 0.66) 0%, rgba(18, 18, 18, 0.55) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      inset 0 -1px 0 rgba(0, 0, 0, 0.25),
      0 12px 28px rgba(0, 0, 0, 0.18);
    transition: transform 0.18s ease, opacity 0.18s ease, background 0.18s ease;

    &:hover {
      background: linear-gradient(180deg, rgba(28, 28, 28, 0.72) 0%, rgba(22, 22, 22, 0.62) 100%);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__to-top-icon {
    font-size: 20px;
    line-height: 1;
    font-weight: 600;
  }
}

</style>
