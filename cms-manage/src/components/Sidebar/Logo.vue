<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link collapse"
                   to="/"
      >
        <img v-if="systemLogo" :src="systemLogo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">
          {{ systemName }}
        </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link"
                   to="/"
      >
        <img v-if="systemLogo" :src="systemLogo" class="sidebar-logo">
        <h1 class="sidebar-title">
          {{ systemName }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },

  computed: {
    ...mapState({
      systemLogo: state => state.app.systemLogo,
      systemName: state => state.app.systemName
    })
  }
}
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    padding: 0 24px;
    &.collapse {
      padding: 0;
      text-align: center;
    }

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      border-radius: 50%;
    }

    & .sidebar-title {
      overflow: hidden;
      display: inline-block;
      width: 70%;
      margin: 0;
      color: #e1e1e1;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
