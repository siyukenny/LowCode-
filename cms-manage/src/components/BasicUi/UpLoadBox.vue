<template>
  <!-- 上传图片盒子 -->
  <div class="up-pic-box">
    <template v-if="uploading">
      <div v-loading="uploading" element-loading-text="上传中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.3)"
      />
    </template>
    <template v-else>
      <template v-if="url">
        <img :src="url">
        <p class="pic-tips" @click="editImg">
          更换图片
        </p>
      </template>
      <template v-else>
        <div class="not-pic" @click="editImg">
          <i class="el-icon-plus" />
          <p v-if="addPlaceHolder">
            {{ addPlaceHolder }}
          </p>
        </div>
      </template>
    </template>
    <el-upload v-show="false"
               :headers="headers"
               ref="upload"
               :action="actionUrl"
               :multiple="false"
               list-type="picture"
               :show-file-list="false"
               :on-success="doSuccess"
               :on-error="doError"
               :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary" :loading="uploading">
        +&nbsp;上传图片
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import { upLoadUrl } from '@/api/index'
export default {
  name: 'UploadBox',
  props: {
    // 图片地址
    imgUrl: {
      type: String,
      default: ''
    },
    // 添加图片文字
    addPlaceHolder: {
      type: String,
      default: '添加图片'
    },
    uploadFile: { // 是否用来上传本地文件
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      url: null,
      actionUrl: upLoadUrl, // 上传图片接口地址
      uploading: false, // 是否正在上传图片中
      headers: {
        'X-token': localStorage.getItem('token')
      }
    }
  },
  watch: {
    imgUrl: {
      handler() {
        this.url = this.imgUrl
      },
      immediate: true
    }
  },
  methods: {
    editImg() {
      console.log(this.uploadFile, 111)
      if (this.uploadFile) {
        this.$refs.upload.$el.querySelector('button').click()
      } else {
        this.$emit('editImg')
      }
    },
    // 上传图片前的验证方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt500 = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt500) {
        this.$message.error('上传图片大小不能超过 500kb!')
      }
      if (isJPG && isLt500) {
        this.uploading = true
        return true
      } else {
        return false
      }
    },
    // 上传图片成功的方法
    doSuccess(response, file, fileList) {
      this.uploading = false
      this.$emit('update:imgUrl', response.data)
      // this.$emit('onSuccess', response.data)
    },
    // 上传图片失败的方法
    doError() {
      this.$message.error('上传失败，请稍后重试')
      this.uploading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 上传图片模块样式
.up-pic-box {
  position: relative;
  width: 60px;
  height: 60px;
  border: 1px solid #e5e5e5;
  background: #fff;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
  .pic-tips {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .not-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: @color-1;
    cursor: pointer;
    i {
      font-size: 20px;
    }
    p {
      margin-top: 4px;
    }
  }
  .el-loading-parent--relative{
    width: 100%;
    height: 100%;
    display: inline-block;
    .el-loading-text{
      font-size: 12px !important;
    }
  }
}
</style>
