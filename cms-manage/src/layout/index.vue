<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar v-if="!isLoginModule" class="sidebar-container" />
    <div
      :class="{ hasTagsView: needTagsView, hideTree: isLoginModule }"
      class="main-container"
    >
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar :system-name="systemName" :is-login-module="isLoginModule">
          <slot />
        </navbar>
      </div>
      <app-main v-if="showMain" />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from '@/components'
import ResizeMixin from '@/mixins/ResizeHandler'
// import { mapState } from 'vuex'

export default {
  name: 'Vuex',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  mixins: [ResizeMixin],
  props: {
    showMain: {
      type: Boolean,
      default: true
    },
    systemName: {
      type: String,
      default: ''
    },
    isLoginModule: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      settings: {},
      sidebar: {
        opened: true,
        withoutAnimation: false
      },
      device: 'desktop',
      showSettings: false,
      needTagsView: false,
      fixedHeader: false
    }
  },
  computed: {
    // ...mapState({
    //   sidebar: state => state.app.sidebar,
    //   device: state => state.app.device,
    //   showSettings: false,
    //   needTagsView: false,
    //   fixedHeader: false
    // }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      // this.$auth.store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 220px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
#app .hideTree {
  margin-left: 0 !important; // 隐藏左侧菜单
}
</style>
