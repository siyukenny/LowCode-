<template>
  <!-- <div v-if="property.runEnv === 'prod'"> -->
  <div ref="float-container"
       class="float-layer"
       :style="{
         width: `${property.width}px`,
         position: 'fixed',
         bottom: '100px',
         zIndex: 11,
         right: '24px',
         minHeight: '56px',
         cursor: 'poniter',
       }"
  >
    <div>
      <van-image
        ref="floatImg"
        class="img-container"
        :style="{
          position:'fixed',
          bottom: '100px',
          zIndex: 11,
          cursor: 'poniter',
        }"
        :width="property.width"
        :src="property.imageUrl ? property.imageUrl: defaultImg"
        @click="jumpLink(property.link)"
      />
    </div>
  </div>
</template>
<script>
import defaultImg from '../../assets/block-img.png'
import JumpLink from '@/mixin/jumpLink'
export default {
  name: 'FloatLayer',
  mixins: [JumpLink],
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      defaultImg
    }
  },
  watch: {
    'property.imageUrl'() {
      this.setImgHeight()
    },
    'property.width'() {
      this.setImgHeight()
    }
  },
  mounted() {
    this.setImgHeight()
    if (this.property.hideByPageScroll && !document.querySelector('.draggable')) {
      window.addEventListener('scroll', () => {
        this.scrollHandler()
      })
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    setImgHeight() {
      setTimeout(() => {
        const imgHeight = document.querySelector('.img-container')
          ? document.querySelector('.img-container').clientHeight
          : ''
        if (imgHeight) {
          this.$refs['float-container'].style.height = `${imgHeight}px`
        }
      })
    },
    scrollHandler() {
      let fl = document.querySelector('.img-container')
      fl.className = 'img-container van-image hide'
      setTimeout(() => { fl.className = 'img-container van-image show' }, 1000)
    }
  }
}
</script>
<style scoped>
.show {
  right: 24px;
  transition-duration: .5s;

}

.hide {
  transition-duration: .5s;
  right: -54px;
}
</style>
