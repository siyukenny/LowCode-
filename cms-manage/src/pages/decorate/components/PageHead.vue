<template>
  <div class="page-head">
    <a class="go-back" @click="backToList">
      <img class="logo" src="~@/assets/img/layout/logo.png">
      返回频道列表页面
    </a>
    <div class="page-operate">
      <el-button type="primary" size="medium" :loading="saveLoading"
                 @click="saveAndContinue"
      >
        保存
      </el-button>
      <el-button size="medium" :loading="previewLoading" @click="saveAndView">
        预览
      </el-button>
    </div>
  </div>
</template>

<script>
import { saveCmsPage } from '@/api/activity'
export default {
  name: 'PageHead',
  data() {
    return {
      onlineLoading: false,
      saveLoading: false,
      previewLoading: false
    }
  },
  computed: {
    pageData() {
      return this.$store.state.pageData
    }
  },
  methods: {
    // 上架并预览
    saveAndView() {
      this.previewLoading = true
      this.savePage({online: 1}).then(res => {
        this.$message.success('上架成功')
        let id = res && res.data ? res.data.id : ''
        if (id) {
          this.$router.push(`/decorate?id=${id}`)
        } else {
          // 更新页面，接口参数不返回id，取地址栏id参数
          id = this.$route.query.id
        }
        this.goToView(id)
      }).catch((err) => {
        this.$message.warning(`上架并预览失败: ${err.message}`)
      }).finally(() => {
        this.previewLoading = false
      })
    },
    goToView(id) {
      let urlObj = this.$router.resolve({
        path: 'preview', query: { id }
      })
      window.open(urlObj.href, '_blank')
    },
    // 保存并继续
    saveAndContinue() {
      this.saveLoading = true
      this.savePage().then(({data}) => {
        this.$message.success('保存成功')
      }).catch((err) => {
        this.$message.warning(`保存失败: ${err.message}`)
      }).finally(() => {
        this.saveLoading = false
      })
    },
    // 上架
    saveAndPut() {
      this.onlineLoading = true
      let data = {online: 1}
      this.savePage(data).then(() => {
        this.$message.success('上架成功')
      }).catch((err) => {
        this.$message.warning(`上架失败: ${err.message}`)
      }).finally(() => {
        this.onlineLoading = false
      })
    },
    // 返回频道列表页面
    backToList() {
      try {
        let isParentActivityPage = window.opener && window.opener.location.hash === '#/home'
        if (isParentActivityPage) { // 父窗口是活动列表，直接关闭父窗口，并刷新当前窗口到列表页，更新列表数据
          window.opener.close()
        }
        // this.$router.push('/activity')
        this.$router.push('/home')
      } catch (e) {
        // this.$router.push('/activity')
        this.$router.push('/home')
      }
    },
    // 保存页面数据
    savePage(params) {
      let pageData = { ...this.pageData, params }
      pageData.componentList.forEach((item, index) => {
        item.sort = index
      })
      return saveCmsPage(pageData).then((resp) => {
        if (resp && resp.data && resp.data.id) {
          this.setIdForAddSave(resp.data.id)
        }
        return resp
      })
    },
    setIdForAddSave(id) {
      this.$router.push(`/decorate?id=${id}`)
      let pageData = {...this.pageData}
      pageData.id = id
      this.$store.commit('UPDATE_COMPONENT', {data: pageData})
    }
  }
}
</script>

<style lang="less" scoped>
  .page-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: @page-header-height;
    background: #fff;
    border-bottom: 1px solid #ebedf0;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .go-back {
      float: left;
      line-height: 55px;
      font-size: 14px;
      color: #4f4f4f;
      cursor: pointer;
      .logo {
        display: inline-block;
        vertical-align: middle;
        margin: -2px 4px 0 0;
        max-width: 30px;
        max-height: 30px;
      }
    }
  }
</style>
