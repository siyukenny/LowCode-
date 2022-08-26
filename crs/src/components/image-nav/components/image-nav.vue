<template>
  <div ref="container">
    <div class="nav-container" :style="{ ...containerComputedStyle }">
      <template v-if="formModel.lineNumber >= 2">
        <!-- 容器 -->
        <!-- 遍历行  -->
        <div
          v-for="(row, rowIndex) in list"
          :key="rowIndex"
          class="list-wrapper"
        >
          <!-- 遍历单个 -->
          <div
            v-for="(item, index) in row"
            :key="index"
            ref="item"
            class="item"
            :style="cleanMarginBottom(rowIndex)"
            @click="jumpLink(item.link)"
          >
            <template v-if="item">
              <div class="img-container">
                <img
                  ref="img-el"
                  class="img-el"
                  :style="{ ...imgComputedStyle }"
                  :src="item.imageUrl ? item.imageUrl : defaultImg"
                >
              </div>
              <div class="text">
                {{ item.text }}
              </div>
            </template>
            <!-- flex 补位 -->
            <div v-else class="empty-item" />
          </div>
        </div>
      </template>
      <!-- 一行排1个 -->
      <div
        v-if="formModel.lineNumber === 1"
        class="list-container-for-single-line"
      >
        <div
          v-for="(item, index) in formModel.imageList"
          :key="index"
          ref="item"
          class="item"
          @click="jumpLink(item.link)"
        >
          <div class="img-container">
            <img
              ref="img-el"
              class="img-el"
              :style="{ ...imgComputedStyle }"
              :src="item.imageUrl ? item.imageUrl : defaultImg"
            >
          </div>
          <div class="text">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from '../../../assets/block-img.png'
import JumpLink from '@/mixin/jumpLink'

export default {
  name: 'ImageNav',
  mixins: [JumpLink],
  props: {
    property: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      imgWidth: 0,
      imgHeight: 0,
      itemMarginRight: 0,
      formModel: {},

      // 以下属于组件的内部属性
      /** 容器的宽度 */
      containerWidth: 0,
      list: [],
      /** 行数 */
      line: 1,
      /** 一行有几个 */
      oneLineNumber: 0,
      /** 默认图片 */
      defaultImg
    }
  },
  computed: {
    padding () {
      return `${this.formModel.columnPadding}px ${this.formModel.rowPadding}px`
    },
    containerComputedStyle () {
      return {
        padding: this.padding,
        backgroundColor: this.formModel.backgroundColor,
        color: this.formModel.textColor
      }
    },
    // 暂未使用 - 第一个版本使用的- 后续可迭代
    listWrapperComputedStyle () {
      const { isScroll } = this.formModel
      return {
        'overflow-x': isScroll ? 'auto' : 'hidden',
        'flex-wrap': isScroll ? 'nowrap' : 'wrap'
        // flexDirection: this.formModel.isMultiline === 1 ? 'row' : 'column'
      }
    },

    /**
     * 图片的所有动态样式
     */
    imgComputedStyle () {
      return {
        borderRadius: `${this.formModel.borderRadius}px`
      }
    }

  },
  watch: {
    property: {
      deep: true,
      handler (val) {
        this.init()
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
    // 第一个版本的代码
    // this.containerWidth = this.$refs['container'].offsetWidth
    // this.containerHeight = this.$refs['container'].offsetHeight
  },
  methods: {
    init () {
      const { lineNumber, imageList } = this.property
      this.line = Math.ceil(imageList.length / lineNumber)

      this.formModel = this.property

      // 分组
      const list = []
      let len = Math.ceil(imageList.length / lineNumber)
      console.log(len)

      for (var i = 0; i < imageList.length; i += lineNumber) {
        list.push(imageList.slice(i, i + lineNumber))
      }

      // 最后一个做补齐处理
      if (list.length !== 1) {
        let last = list[list.length - 1]
        if (last.length !== lineNumber) {
          const emptyArray = Array(lineNumber - last.length).fill(null)
          list[list.length - 1].push(...emptyArray)
        }
      }

      this.list = list
    },
    /**
     * 暂未使用-第一个版本代码 处理最后一行元素的 margin-bottom
     */
    handleLastLine (index) {
      const size = this.property.lineNumber
      if (index >= (this.line - 1) * size && index < this.line * size) {
        return {
          marginBottom: 0 + 'px'
        }
      }
    },

    /**
     * 暂未使用 - 第一个版本代码 获取单个item的间隙
     */
    getItemSpace () {
      const { rowPadding } = this.formModel
      const isIllegalPadding = Number.isNaN(Number(rowPadding))
      // padding 不合法,就直接 返回0
      if (isIllegalPadding) return 0

      // 间隙计算 = Math.ceil( (容器宽度 - 左右padding) / Math.min(list.length, 8)8个以内的个数)
      const oneLineNumber = this.oneLineNumber
      const containerWidth = this.containerWidth

      let restSpace = 0
      if (rowPadding === 0) {
        // 直接平均分配宽度
        this.setSetItemWidth(oneLineNumber)
      } else {
        restSpace = containerWidth - 44 * oneLineNumber - rowPadding * 2

        // 说明剩余空间不够分
        if (restSpace <= 0) {
          restSpace = 0
        }
      }

      const marginRight = Math.floor(restSpace / (oneLineNumber - 1))
      // this.resetListContainerWidth(oneLineNumber, marginRight)

      return marginRight
    },

    /**
     * @description
     * 暂未使用 第一个版本代码 单个元素的样式
     */
    itemComputedStyle () {
      const { rowPadding, itemMarginRight } = this.formModel
      let width = 60
      if (rowPadding === 0) {
        width = this.containerWidth / this.oneLineNumber
        console.warn('可以做n 等分的情景', width)
      }

      return {
        width,
        marginRight: `${itemMarginRight}px`
      }
    },

    /**
     * @description
     * 控制外层容器的宽度
     * 1 多行, 则不会滚动
     * 2 一行 则可以横向滚动
     */
    resetListContainerWidth (oneLineNumber, marginRight) {
      if (marginRight === 0) {
        this.listScollWidth = this.containerWidth + 'px'
        return
      }

      this.listScollWidth = (oneLineNumber * (44 + marginRight)) + 'px'
    },

    setSetItemWidth (size) {
      const itemWidth = this.containerWidth / size

      if (this.$refs['img-el'] === undefined) {
        return
      }
      this.$refs['item'].forEach(item => {
        item.style.width = itemWidth + 'px'
      })

      this.$nextTick(() => {
        this.listScollWidth = (itemWidth * size) + 'px'
      })
    },

    /**
     * 如果是最后一行，则元素不需要加 margin-bottom:20
     */
    cleanMarginBottom(index) {
      if (index === this.list.length - 1) {
        return {
          marginBottom: 0
        }
      }
    }
  }

}
</script>

<style lang='less' scoped>
.nav-container {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.list-wrapper {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  /* 1.6 * 37.5 */
  width: 44px;
  display: inline-block;
  margin-bottom: 20px;
  text-align: center;
}
.empty-item {
  width: 100%;
  height: 0;
}

.img-container {
  text-align: center;
  box-sizing: border-box;
}

.img-el {
  width: 44px;
  height: 44px;
  border: 0;
}

.text {
  margin: 8px 0;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
  word-wrap: break-word;
  word-break: normal;
}

.list-container-for-single-line {
  width: 100%;
  box-sizing: border-box;

  .item {
    display: block;
  }
}
</style>
