<template>
  <div class="com-table">
    <json-form :data="formConfig" @onSearch="onSearch" @onReset="onReset" />
    <el-table v-loading="tableLoading" border
              size="mini"
              :data="tableData"
              :max-height="maxHeight"
              style="width: 100%"
    >
      <template v-for="item in columns">
        <el-table-column :key="item.key"
                         :prop="item.key"
                         :label="item.label"
                         :width="item.width"
                         :min-width="item.minWidth"
                         :formatter="item.formatter"
        />
      </template>
      <el-table-column label="操作" fixed="right"
                       width="65px"
                       align="center"
      >
        <template slot-scope="scope">
          <el-button v-if="disabledRow(scope.row)" type="text" :disabled="true"
                     size="mini" @click="onSelect(scope.row)"
          >
            已选择
          </el-button>
          <el-button v-else type="text" size="mini"
                     @click="onSelect(scope.row)"
          >
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-area">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :page-size.sync="page.pageSize"
        :page-sizes="[10, 30,50,100]"
        :total="total"
        :current-page.sync="page.pageNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import fetch from '@/api/axios'
import JsonForm from './JsonForm'
export default {
  components: {JsonForm},
  props: {
    query: {
      type: Object,
      default() {
        return {}
      }
    },
    maxHeight: {
      type: Number, default: null
    },
    url: {
      type: String, default: null
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    formConfig: {
      type: Object, default: null
    },
    beforeSelect: {
      type: Function, default: null
    },
    initData: {
      type: Object, default: null
    }
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      total: 0,
      formParams: {},
      page: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    this.clearFormData()
  },
  methods: {
    init() {
      this.getData()
    },
    getData() {
      if (!this.url) {
        console.error('comTable url is empty')
        return false
      }
      this.tableLoading = true
      let params = Object.assign({}, this.page, this.query, this.formParams)
      console.dir(params)
      fetch.post(this.url, params).then((data) => {
        data = data || {}
        this.total = data.total || 0
        this.tableData = data.list || []
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleSizeChange() {
      this.getData()
    },
    handleCurrentChange() {
      this.getData()
    },
    onSelect(row) {
      if (this.beforeSelect && !this.beforeSelect(row)) {
        return false
      }
      this.$emit('onChange', row)
    },
    onSearch() {
      let formData = this.formConfig.formItemMap
      if (formData) {
        let formParams = {}
        let item
        Object.keys(formData).forEach((key) => {
          item = formData[key]
          if (key === 'date' && item.value && item.value.length > 0) {
            formParams.startTime = item.value[0].getTime()
            formParams.endTime = item.value[1].getTime()
          } else {
            formParams[key] = item.value || ''
          }
        })
        this.formParams = formParams
      }
      this.pageNum = 1
      this.getData()
    },
    onReset() {
      this.clearFormData()
      this.pageNum = 1
      this.getData()
    },
    clearFormData() {
      let formData = this.formConfig.formItemMap
      if (formData) {
        Object.keys(formData).forEach((key) => {
          formData[key].value = null
        })
      }
      this.formParams = {}
    },
    disabledRow(row) {
      let initData = this.initData
      return initData && initData.id === row.id
    }
  }
}
</script>
<style lang="less" scoped>
  .pager-area {
    margin-top: 10px;
    text-align: right;
  }
  /deep/.json-form{
    .sa-input, .sa-select{
      max-width: 190px;
    }
  }
</style>
