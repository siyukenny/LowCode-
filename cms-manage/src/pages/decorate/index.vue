<template>
  <div class="home">
    <!-- 搭建框架 -->
    <PageHead />
    <PageLeft />
    <PageView />
    <PageRight />

    <!-- 组件的公共配置内容 -->
    <!-- 上传图片组件 -->
    <UpLoadImg :dialog-image-visible.sync="dialogImageVisible" @upLoadImgSuccess="upLoadImgSuccess" />
  </div>
</template>
<script>
// 结构组件
import PageHead from './components/PageHead'
import PageLeft from './components/PageLeft'
import PageView from './components/PageView'
import PageRight from './components/PageRight'
import { createRandomId } from '@/utils'
// 公共配置组件
import UpLoadImg from '@/components/BasicConfig/UpLoadImg'
// 获取页面数据
import { getCmsPageById } from '@/api/activity'
export default {
  name: 'App',
  components: {
    PageHead,
    PageLeft,
    PageView,
    PageRight,
    UpLoadImg
  },
  data() {
    return {

    }
  },
  computed: {
    // 上传图片模态框是否显示
    dialogImageVisible: {
      get: function() {
        return this.$store.state.dialogImageVisible
      },
      set: function(val) {
        this.$store.commit('SET_UPIMAGE_VISIBLE', val)
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData() {
      let pageId = this.$route.query.id
      if (pageId) {
        getCmsPageById(pageId).then(({data}) => {
          this.postDataToH5(data)
        })
      }
    },
    postDataToH5(data) {
      if (data && data.componentList) {
        data.componentList.forEach((item) => {
          if (item.data.validTime && typeof item.data.validTime === 'string') {
            item.data.validTime = JSON.parse(item.data.validTime)
          }
          // 获取的组件数据无id则手动设置随机id
          if (!item.id) {
            const id = createRandomId()
            item.id = item.data.component + '-' + id
          }
        })
        this.$store.commit('UPDATE_COMPONENT', {data})
        this.$store.commit('VIEW_UPDATE')
      }
    },
    // 上传图片成功回调事件
    upLoadImgSuccess(imgUrl) {
      let fuc = this.$store.state.upLoadImgSuccess
      if (fuc) fuc(imgUrl)
    }
  }
}
</script>
