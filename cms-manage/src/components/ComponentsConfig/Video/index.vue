<template>
  <div>
    <ComGroup title="添加视频" />
    <ComGroup :content-block="true">
      <el-upload
        :headers="headers"
        class="upload-demo"
        :action="actionUrl"
        :limit="2"
        :file-list="configData.videoList"
        :on-success="doSuccess"
        :on-remove="doRemove"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传mp4文件，且不超过500kb
        </div>
      </el-upload>
    </ComGroup>
    <ComGroup v-show="uploadFileTag" title="是否自动播放视频">
      <el-radio v-model="configData.isAutoPlay" :label="0">
        否
      </el-radio>
      <el-radio v-model="configData.isAutoPlay" :label="1">
        是
      </el-radio>
    </ComGroup>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import ComGroup from '@/components/BasicUi/ComGroup'
import { upLoadUrl } from '@/api/index'
export default {
  name: 'Video',
  components: { ComGroup },
  props: {
    parmes: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      actionUrl: upLoadUrl,
      configData: JSON.parse(JSON.stringify(this.parmes)),
      headers: {
        'X-token': localStorage.getItem('token')
      },
      fileList: [],
      uploadFileTag: false
    }
  },
  computed: {
    ...mapState(['pageData', 'activeComponentId'])
  },
  watch: {
    configData: {
      handler(v) {
        console.log(v)
        let componentIndex = this.pageData.componentList.findIndex(ele => ele.data.component === 'Video')
        this.pageData.componentList[componentIndex].data.isAutoPlay = v.isAutoPlay
        this.CHANGE_PAGEDATA(this.pageData)
        this.VIEW_UPDATE()
        // this.$emit("editComponent", v);
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['VIEW_UPDATE', 'CHANGE_PAGEDATA']),
    doSuccess(response) {
      console.log(response)
      console.log(this.pageData.componentList)
      console.log(this.pageData.componentList.findIndex(ele => ele.data.component === 'Video'))
      let componentIndex = this.pageData.componentList.findIndex(ele => ele.data.component === 'Video')
      this.pageData.componentList[componentIndex].data.videoUrl = response.data
      this.CHANGE_PAGEDATA(this.pageData)
      this.VIEW_UPDATE()
      this.uploadFileTag = true
    },
    doRemove() {
      let componentIndex = this.pageData.componentList.findIndex(ele => ele.data.component === 'Video')
      this.pageData.componentList[componentIndex].data.videoUrl = ''
      this.VIEW_UPDATE()
      this.uploadFileTag = false
    }
  }
}
</script>
<style scoped lang="less">
.com-name {
    width: 100px;
}
</style>
