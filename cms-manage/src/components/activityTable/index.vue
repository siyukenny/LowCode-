<template>
  <div class="table-container">
    <avue-crud
      ref="table"
      :table-loading="loading"
      :page.sync="page"
      :option="option"
      :data="list"
      :search.sync="tableData"
      @on-load="load"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-change="searchChange"
      @search-reset="resetChange"
      @row-del="rowDel"
    >
      <template slot="searchMenu">
        <span style="margin-left:10px">您好~{{ userInfo.userName }}</span>
        <el-button class="loginout" @click="loginOut">
          退出
        </el-button>
      </template>
      <template slot="menuLeft" slot-scope="{size}">
        <el-button icon="el-icon-plus" type="primary" :size="size"
                   @click="onAdd"
        >
          新增页面
        </el-button>
      </template>
      <template slot="menu" slot-scope="{row,type,size}">
        <el-button icon="el-icon-edit" :size="size" :type="type"
                   @click="onEdit(row)"
        >
          编辑
        </el-button>
        <el-button icon="el-icon-view" :size="size" :type="type"
                   @click="onPreview(row)"
        >
          预览
        </el-button>
        <el-button icon="el-icon-cloudy" :size="size" :type="type"
                   @click="onPush(row)"
        >
          {{ row.is_abled ? '下线':'上线' }}
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { forEach } from 'lodash-es'
import {
  getCmsPageList,
  updateStatus,
  deletePage
} from '@/api/activity'
import { tableOption } from '@/const/activityManege'
export default {
  name: 'ActivityTable',
  data () {
    return {
      userInfo: {
        userName: ''
      },
      tableData: {}, // 收集查询,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next'
      },
      loading: false,
      list: []
    }
  },
  computed: {
    option() {
      return tableOption
    }
  },
  created() {
    this.userInfo.userName = localStorage.getItem('username')
  },
  methods: {
    // 初始化
    load() {
      this.getTableData(this.page.currentPage, this.page.pageSize)
    },
    // 退出登录
    loginOut() {
      this.$router.push('/')
      localStorage.removeItem('username')
      localStorage.removeItem('token')
    },
    // 当前页改变
    currentChange (newPage) {
      this.page.currentPage = newPage
    },
    // 显示条数变化
    sizeChange(newSize) {
      this.page.pageSize = newSize
    },
    // 请求数据

    // eslint-disable-next-line standard/object-curly-even-spacing
    async getTableData ({...tableData }) {
      try {
        let { ...params } = tableData
        params.pageNum = this.page.currentPage
        params.pageSize = this.page.pageSize
        let res = await getCmsPageList(params)
        let { list, total } = res.data

        this.page.total = total
        this.list = list || []
        forEach(list, item => {
          item.isAbled = item.is_abled
          item.status = item.is_abled ? '已上线' : '未上线'
        })
      } catch (error) {
        this.$message.warning(`获取失败: ${error.message}`, 'warning')
      }
    },
    // 搜索
    async searchChange(params, done) {
      params.is_abled = params.status
      await this.getTableData(params)
      if (params.status) {
        let result = []
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.list.forEach((item) => {
          // eslint-disable-next-line standard/object-curly-even-spacing
          if (item.is_abled === params.status) {
            result.push(item)
          }
        })
        this.list = result
      }
      done()
    },
    // 清空搜索
    resetChange() {
      this.getTableData(this.page.currentPage, this.page.pageSize)
    },
    // 编辑
    onEdit(row) {
      let id = row.id
      this.$router.open({path: '/decorate', query: { id }})
    },

    // 上线活动
    onPush(row) {
      if (row.is_abled === 0) {
        this.online(row, 1)
      } else {
        this.offline(row, 0)
      }
    },
    offline(row, isAbled) {
      this.$alert(`是否确定下线活动【${row.name}】?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        updateStatus({id: row.id, isAbled})
          .then(() => {
            this.$message.success('下线成功')
            this.$refs.table.refreshTable()
            this.resetChange()
          })
          .catch(err => {
            this.$message.warning(`操作失败: ${err.message}`, 'warning')
          })
      }).catch(() => {})
    },
    online(row, isAbled) {
      this.$set(row, 'loading', true)
      updateStatus({id: row.id, isAbled})
        .then(() => {
          this.$message.success('上线成功')
          this.$refs.table.refreshTable()
          this.resetChange()
        })
        .catch(err => {
          this.$message.warning(`操作失败: ${err.message}`, 'warning')
        }).finally(() => {
          this.$set(row, 'loading', false)
        })
    },
    // 删除活动
    rowDel(form) {
      let id = form.id
      deletePage({id})
        .then(() => {
          this.$message.success('删除成功')
          this.$refs.table.onRefresh(true)
        })
        .catch(err => {
          this.$message.warning(`删除失败：${err.message}`, 'warning')
        })
    },

    // 新增活动页
    onAdd() {
      console.log('新增页面')
      this.$store.commit('SET_INIT_PAGE_DATA')
      this.$router.push({path: '/decorate'})
    },
    // 活动预览
    onPreview(row) {
      let id = row.id
      let url = this.$router.resolve({ path: `/preview`, query: { id, data: this.$store.state.wxParams } })
      window.open(url.href, '_blank')
    }
  }
}
</script>
<style scoped lang="less">
.table-container{
    height: 100%;
    width: 100%;
}
.loginout{
    border: none;
    color: red;
}
.avue-form__group--flex{
 justify-content: space-between;
 background-color: #fff;
    padding: 16px 24px;
    padding-bottom: 0;
    margin-bottom: 16px;
}
.avue-crud--card .el-card+.el-card {
    margin-top: 10px;
}
.avue-crud__left{
    margin: 20px 0;

}
.el-menu {
    position: relative;
    right:0;
    margin-top:-14px;
    width: 115px;
    float: right;
    border: none;
}
.el-submenu .el-menu-item{
    width: 115px;
    padding: 0 !important;
    position: absolute;
    top:0;
    left: -35px;
}
.el-form-item__content{
  margin-left: 110px !important;
}
.el-submenu .el-menu-item ul li{

    padding:0
}
</style>
