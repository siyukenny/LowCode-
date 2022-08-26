<template>
  <div class="carousel-box">
    <div v-if="property.layout==='swiper'" :style="boxStyle">
      <van-swipe class="my-Carousel"
                 :autoplay="3000"
                 indicator-color="white"
      >
        <van-swipe-item v-for="(item,i) in imageList " :key="i" :style="itemStyle"
                        @click="jumpLink(item.link)"
        >
          <van-image
            :style="imgStyle"
            :radius="radius"
            fit="fill"
            :src="item.imageUrl?item.imageUrl:defaultImg"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-else class="single" :style="boxStyle">
      <div v-for="(item,i) in imageList "
           :key="i"
           class="img-box"
           :style="i<imageList.length-1?itemStyle:''"
           @click="jumpLink(item.link)"
      >
        <van-image
          :style="imgStyle"
          :radius="radius"
          :src="item.imageUrl?item.imageUrl:defaultImg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from '../assets/swipe-default.png'
import JumpLink from '@/mixin/jumpLink'

export default {
  name: 'Carousel',
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
      isDisplay: true,
      radius: 0,
      imageList: [], // 图片列表
      imgStyle: {},
      itemStyle: {},
      boxStyle: {},
      defaultImg // 默认图片
    }
  },
  // watch: {
  //   property(value) {
  //   }
  // },
  watch: {
    property: {
      handler: function(val, oldVal) {
        console.log('this.property val', val)
        if (val) {
          this.imageList = this.property.imageList
          this.setMyStyle()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.isDisplay = this.property.isDisplay
  },
  methods: {
    // 获取样式
    setMyStyle() {
      let padding = '0'
      let height = '100%'
      this.radius = this.property.isBorderRadius ? this.property.radius : 0
      if (this.property.isDefaultMargin) {
        // 为什么这里要把margin转为padding?
        // 当this.property.marginSize 不存在时，返回什么
        padding = `${this.property.marginSize[0]}px ${this.property.marginSize[1]}px` + ''
      }
      this.imgStyle = {
        height,
        verticalAlign: 'top'
      }
      this.boxStyle = {
        padding,
        backgroundColor: this.property.backgroundColor
      }
      this.itemStyle = this.property.layout === 'swiper' ? {
        backgroundColor: this.property.backgroundColor
      } : {
        backgroundColor: this.property.backgroundColor,
        marginBottom: (this.property.isDefaultMargin && this.property.imageMargin ? this.property.imageMargin : 0) + 'px'
      }
    }
  }
}

</script>

<style scoped>
.carousel-box{
  width:100%;
}
.my-Carousel {
  overflow :hidden;
  transform :translateY(0);
}
.my-Carousel .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height:150px;
  text-align: center;

}
/* .img-box{
  height: 150px;
} */
</style>
