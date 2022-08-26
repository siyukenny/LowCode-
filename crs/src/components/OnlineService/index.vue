<template>
  <!-- <div v-if="property.runEnv === 'prod'"> -->
  <div class="customer-container"
       :style="{
         position:'fixed',
         bottom: '24px',
         right: '24px',
         zIndex: 11,
         width: '48px',
         height: '48px',
         cursor: 'poniter',
         top: 'unset'}"
  >
    <div class="customer">
      <div class="customer-image">
        <img src="https://image.fuchuang.com/prod/3d488567_icon_kf20201116164901.png" style="height: 20px">
      </div>
      <div class="customer-text">
        <!-- {{ property.text }} -->
        客服
      </div>
    </div>
  </div>
</template>
<script>
// import { debounce } from 'lodash-es'

export default {
  name: 'OnlineService',
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    if (!document.querySelector('.draggable')) {
      window.addEventListener('scroll', () => {
        this.scrollHandler()
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler() {
      let cu = document.querySelector('.customer')
      cu.className = 'customer hide'
      setTimeout(() => { cu.className = 'customer show' }, 1000)
    }
  }
}
</script>
<style scoped>
.show {
  right: 24px;
  transition-duration: .5s;
}
.customer {
  width: 48px;
  height: 48px;
  background: #fff;
  box-shadow: 0px 4px 14px 0px rgba(0,0,0,0.11);
  position: fixed;
  bottom: 24px;
  right: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 2000;

}

.customer > .customer-text {
  font-size: 12px
}
.hide {
  right: -24px;
  transition-duration: .5s;
}

</style>
