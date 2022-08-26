<template>
  <div>
    <draggable
      v-model="picData"
      :options="{
        animation: 300,
        handle: '.up-pic-item',
        disabled: unGraggable || picData.length < 2,
        forceFallback: true,
        fallbackTolerance: 1,
      }"
    >
      <!-- 图片列表 -->
      <div
        v-for="(item, index) in picData"
        :key="index"
        class="up-pic-item"
        :class="{ 'can-drag': !unGraggable && picData.length > 1 }"
      >
        <div class="up-pic-item-wrapper">
          <UpLoadBox
            v-if="showPic"
            :img-url.sync="item.imageUrl"
            @editImg="editPic(item)"
          />
          <div class="info">
            <dl v-if="showName" class="com-form-group">
              <dt class="form-label">
                标题
              </dt>
              <dd class="form-container">
                <el-input
                  v-model.lazy="item.text"
                  class="input-name"
                  :placeholder="inputPlaceHolder"
                />
              </dd>
            </dl>
            <dl class="com-form-group">
              <dt class="form-label">
                链接
              </dt>
              <dd class="form-container">
                <!-- 配置链接地址组件 -->
                <ConfigLink :link-obj.sync="item.link" />
              </dd>
            </dl>
          </div>
        </div>
        <div
          v-if="showDelete"
          class="up-pic-item-delete el-icon-error"
          title="删除该项"
          @click="deleteItem(index)"
        />
      </div>
    </draggable>
    <!-- 添加图片 -->
    <ButtonAdd v-if="showAdd" :add-text="addPlaceHolder" @click="addItem" />
  </div>
</template>

<script>
import draggable from 'vuedraggable' // 拖拽元素
import UpLoadBox from '@/components/BasicUi/UpLoadBox'
import ButtonAdd from '@/components/BasicUi/ButtonAdd'
import ConfigLink from '@/components/BasicConfig/ConfigLink'

export default {
  name: 'PicList',
  components: {
    draggable,
    UpLoadBox,
    ButtonAdd,
    ConfigLink
  },
  props: {
    // 图片列表数组
    imageList: {
      type: Array,
      default: null
    },
    // 图片标题文本输入框缺省提示文字
    inputPlaceHolder: {
      type: String,
      default: ''
    },
    // 添加图片文字
    addPlaceHolder: {
      type: String,
      default: '添加广告图'
    },
    // 是否显示图片选项
    showPic: {
      type: Boolean,
      default: true
    },
    // 是否显示标题选项
    showName: {
      type: Boolean,
      default: true
    },
    // 是否显示添加按钮
    showAdd: {
      type: Boolean,
      default: true
    },
    // 是否显示删除按钮
    showDelete: {
      type: Boolean,
      default: true
    },
    // 列表是否不可拖拽排序
    unGraggable: {
      type: Boolean,
      default: false
    },
    // 最多添加的数据条目数
    limitSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      // 当前图片数组数据
      picData: JSON.parse(JSON.stringify(this.imageList)),
      currentItem: '' // 当前操作项-更改图片地址  修改图片地址时该项为空则是新增图片列表项
    }
  },
  watch: {
    // 监听当前图片列表数据项修改
    picData: {
      handler: function (newVal, oldVal) {
        console.log('图片列表配置修改', newVal)
        this.$emit('update:imageList', newVal)
      },
      deep: true
    }
  },
  methods: {
    // 新增项
    addItem() {
      // 是否超过限制条数
      if (this.limitSize && this.picData.length >= this.limitSize) {
        this.$message.warning(`最多添加${this.limitSize}条数据`)
        return
      }
      // 带图片
      if (this.showPic) {
        this.showDialogImage()
        this.currentItem = ''
      } else {
        // 不带图片，新增项
        let item = {
          link: null, // 链接地址对象
          imageUrl: '', // 图片地址
          text: '' // 标题
        }
        this.picData.push(item)
      }
    },
    // 修改图片
    editPic(item) {
      this.showDialogImage()
      this.currentItem = item
    },
    // 删除指定项
    deleteItem(index) {
      this.picData.splice(index, 1)
    },
    // 图片上传
    showDialogImage() {
      this.$store.commit('SET_UPIMAGE_VISIBLE', true)
      this.$store.commit('SET_UPIMAGE_FUC', this.upLoadImgSuccess)
    },
    // 图片上传成功
    upLoadImgSuccess(imgUrl) {
      if (this.currentItem) {
        // 修改图片
        this.currentItem.imageUrl = imgUrl
      } else {
        // 新增图片
        let item = {
          link: null, // 链接地址对象
          imageUrl: imgUrl, // 图片地址
          text: '' // 标题
        }
        this.picData.push(item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 图片列表
.up-pic-item {
  position: relative;
  margin-bottom: 12px;
  padding: 6px 0;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
  border-radius: 2px;
  user-select: none;
  &.can-drag {
    cursor: move;
  }
  &.sortable-ghost {
    opacity: 0.2;
  }
  &:hover {
    .up-pic-item-delete {
      visibility: visible;
    }
  }
  /deep/.config-link .cllt-name {
    max-width: 110px;
  }
}
.up-pic-item-wrapper {
  display: flex;
  .up-pic-box {
    margin: 6px 0 0 12px;
  }
  .info {
    flex: 1;
  }
}
// 图片编辑表单
.com-form-group {
  padding: 6px 12px;
  // display: flex;
  align-items: center;
  .form-label {
    margin-right: 16px;
    font-size: 14px;
    color: #323233;
    line-height: 18px;
    white-space: nowrap;
  }
  .form-container {
    flex: 1;
  }
  /deep/ .input-name .el-input__inner {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    border-radius: 2px;
  }
}
</style>
