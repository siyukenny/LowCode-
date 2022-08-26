<template>
  <div>
    <h3>测试,修改组件数据</h3>
    <div class="test-form-data">
      <div>
        容器上下padding <input v-model.number="formModel.columnPadding"
                           min="0"
                           type="number"
        >
      </div>
      <div>
        容器左右padding <input v-model.number="formModel.rowPadding"
                           min="0"
                           type="number"
                           @input="updateRowPadding"
        >
      </div>
      <div>
        字体颜色 <input v-model="formModel.textColor" type="color">
      </div>
      <div>
        背景颜色 <input v-model="formModel.backgroundColor" type="color">
      </div>
      <div>
        图片原角 <input v-model="formModel.borderRadius" min="0" type="number">
      </div>
      <div>
        单行 <input v-model="formModel.isMultiline"
                  type="radio"
                  name="1"
                  :value="1"
        >
        多行 <input v-model="formModel.isMultiline"
                  type="radio"
                  name="1"
                  :value="2"
        >
      </div>
      <div>
        是否横向滚动
        <div>
          否  : <input v-model="formModel.isScroll"
                      type="radio"
                      name="scroll"
                      :value="false"
          >
          是:<input v-model="formModel.isScroll"
                   type="radio"
                   name="scroll"
                   :value="true"
          >
        </div>
      </div>
      <div>
        一行放置几个 <input v-model="formModel.lineNumber"
                      type="number"
                      max="8"
                      @change="updateLineNumber"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'formModel': {
      type: Object,
      default: () => {}
    },
    'getItemSpace': {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    // 以下方法均为测试方法
    updateLineNumber() {
      const d = this.getItemSpace()
      this.formModel.itemMarginRight = d
    },

    /**
     * 更新左右padding
     */
    updateRowPadding() {
      const d = this.getItemSpace()
      this.formModel.itemMarginRight = d
    }
  }
}
</script>

<style scoped>
/* 下面都是测试代码 */
.test-form-data {
  margin-top: 20px;
  border-top: 2px solid #4e4e4e;
}

.test-container {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.test-item {
  display: inline-block;
  margin-bottom: 20px;
  background: pink;
  text-align: center;
}

.test-img-container {
 text-align: center;
  box-sizing: border-box;
}
</style>
