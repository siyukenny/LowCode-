<template>
  <div class="crsRichText" :style="{...styleModel}">
    <div class="ql-editor" v-html="content" />
  </div>
</template>

<script>
// pc端使用的是quill-editor，h5解析需要引入其css文件
import '@/style/quill.core.css'

export default {
  name: 'RichText',
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
      formModel: {},
      defaultContent: '<p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p> '
    }
  },
  computed: {
    styleModel() {
      return {
        backgroundColor: this.formModel.backgroundColor
      }
    },
    content() {
      return this.formModel.content || this.defaultContent
    }
  },
  watch: {
    property (val) {
      if (val) {
        this.setStyle(val)
      }
    }
  },
  mounted() {
    this.formModel = this.property
  },
  methods: {
    setStyle(val) {
      this.formModel = val
    }
  }
}
</script>
<style scoped lang='less'>
.crsRichText{
  position: relative;
  box-sizing: border-box;
  padding: 10px 10px 0;
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  word-wrap: break-word;
  /deep/ img{
    max-width: 100%;
    vertical-align: top;
    height: auto!important;
    width: auto!important;
    }
}

</style>
