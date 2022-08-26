<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>

export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: auto;
  padding: 10px 10px 10px 10px;
  background: #f5f5f5;
  box-shadow: inset 0px 0px 6px 2px rgba(0, 0, 0, 0.15);
}

.hasShopCart {
  padding-bottom: 60px !important;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="less">
// fix css style bug in open sa-dialog
.sa-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
