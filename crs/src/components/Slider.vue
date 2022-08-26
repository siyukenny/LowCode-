<template>
  <div>
    <div ref="wrapper" class="my-slider" :style="boxStyle">
      <ul ref="cont" class="cont" :style="isDefaultStyle?defaultItemStyle:itemStyle">
        <li v-for="(item,i) in imageList " :key="i" class="cont-item"
            @click="jumpLink(item.link)"
        >
          <div class="cont-img" :style="i===0?'':isDefaultStyle?defaultImgStyle:imgStyle">
            <van-image
              style="height:80px;"
              :radius="radius"
              fit="cover"
              :src="item.imageUrl?item.imageUrl:defaultImg"
            />
            <!-- <img class="img" :src="item.imageUrl" alt=""> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 将DOM元素变为横向滚动的组件，比over-hiden的体验感更好
import BScroll from 'better-scroll'
// import defaultImg from '../assets/block-placeholder-image.png'
import defaultImg from '../assets/block-img.png'
import JumpLink from '@/mixin/jumpLink'

export default {
  name: 'Slider',
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
      isDefaultStyle: true,
      radius: 0,
      scroll: null, // 滑动对象
      imageList: [{
        link: null,
        imageUrl: '',
        text: '图片1'
      },
      {
        link: null,
        imageUrl: '',
        text: '图片2'
      },
      {
        link: null,
        imageUrl: '',
        text: '图片3'
      }], // 图片列表
      imgStyle: {},
      itemStyle: {},
      boxStyle: {},
      defaultImgStyle: {}, // 图片默认样式
      defaultItemStyle: {},
      imgHeight: 80,
      imgWidth: 100,
      defaultImg
    }
  },
  watch: {
    property: {
      handler: function(val, oldVal) {
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
    this.setMyStyle()
    this.$nextTick(() => {
      let timer = setTimeout(() => { // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer)
          this.verScroll()
        }
      }, 0)
    })
  },
  methods: {

    // 获取样式
    setMyStyle() {
      let marginLeft = '0'
      // let height = this.imgHeight + 'px'
      let padding = '0'
      this.boxStyle = {backgroundColor: this.property.backgroundColor}
      if (!this.property.isDefaultMargin) {
        this.isDefaultStyle = false
        padding = `${this.property.padding[0]}px ${this.property.padding[1]}px` + ''
        marginLeft = `${this.property.imageMargin}px` + ''
        console.log('this.property.backgroundColor', this.property.backgroundColor)
        this.imgStyle = {
          marginLeft
        }
        this.itemStyle = {
          padding
        }
      } else {
        this.defaultImgStyle = {marginLeft: '15px'}
        this.defaultItemStyle = {padding: '15px 15px'}
      }
    },
    // 横向滑动
    verScroll () {
      let width = this.imageList.length * 100 + this.property.imageMargin * (this.imageList.length - 1)// 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.cont.style.width = width + 'px' // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh() // 如果dom结构发生改变调用该方法
        }
      })
    }
  }
}

</script>

<style   scoped>
.my-slider{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* height:150px; */
  text-align: center;
  background-color: #39a9ed;
}
.cont {
      list-style: none;
      white-space: nowrap;
      font-size: 12px;
      /* text-align: center; */
      padding: 0 10px;

}
.cont-item {
  position: relative;
  display: inline-block;
  /* width: 100px; */

}
.cont-img {
    width: 100px;
    height:100%;

  }
</style>
