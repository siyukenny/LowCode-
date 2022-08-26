<template>
  <van-dialog v-if="isDisplay"
              v-model="isDisplay"
              :show-confirm-button="false"
              class="dialog-info"
  >
    <div class="img-info" @click="jumpLink(link)">
      <van-image v-if="imageUrl"
                 width="100%"
                 height="100%"
                 :src="imageUrl"
      />
    </div>
    <div class="close-info">
      <van-icon name="close" @click="closeDialog()" />
    </div>
  </van-dialog>
</template>
<script>
import JumpLink from '@/mixin/jumpLink'

export default {
  name: 'Dialog',
  mixins: [JumpLink],
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    },
    runEnv: {
      type: String,
      default: 'dev'
    }
  },
  data() {
    return {
      isDisplay: false,
      imageUrl: '',
      link: {}
    }
  },
  watch: {
    property: {
      immediate: true, // 这句重要
      handler (val) {
        this.isShow()
      }
    }
  },
  mounted() {
    this.isShow()
  },
  methods: {
    isShow() {
      const { imageUrl, link } = this.property.imageList[0]
      this.imageUrl = imageUrl
      this.link = link
      const date = new Date()
      const time = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
      const timeStr = time.year + (time.month > 9 ? time.month : '0' + time.month) + time.day
      if (this.property.timing === 'every') {
        this.isDisplay = true
      } else {
        if (this.runEnv === 'dev') { // dev 为pc配置环境,preview 为pc预览环境,prod 为小程序环境
          this.isDisplay = true
        } else {
          const value = window.localStorage.getItem('Dialog_' + this.property.id)
          if (this.property.timing === 'once') {
            if (!value) {
              this.isDisplay = true
            } else {
              this.isDisplay = false
            }
          } else {
            if (timeStr !== value) {
              this.isDisplay = true
            } else {
              this.isDisplay = false
            }
          }
        }
      }
      window.localStorage.setItem('Dialog_' + this.property.id, timeStr)
    },
    closeDialog () {
      if (!document.querySelector('.draggable')) {
        this.isDisplay = false
      }
    }
  }
}
</script>
<style>
.componentDialog.selected .van-overlay {
  border: 2px solid #155bd4;
  cursor: move;
}
.dialog-info{
  position: fixed !important;
  background: transparent;
  top: 50%;
}
.dialog-info .van-image{
  display: block;
}
</style>
<style scoped>
.img-info{
  border-radius: 16px;
  /* background: #fff; */
  max-height: 600px;
  min-height: 267px;
  overflow: auto;
}
.close-info{
  text-align: center;
  margin-top: 8px;
  color: #fff;
}
.close-info i {
  font-size: 40px;
}
</style>
