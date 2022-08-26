import { debounce } from '@saas/utils/src/common/index'

export default {
  data() {
    return {
      tableFlexHeight: null
    }
  },
  mounted() {
    this.setTableFlexHeight()

    // 浏览器大小变化时动态设置表格高度，及监听的移除
    const _debounceHeight = debounce(this.setTableFlexHeight, 300)
    window.addEventListener('resize', _debounceHeight, false)
    this.$once('hook:beforeDestroy', function() {
      window.removeEventListener('resize', _debounceHeight, false)
    })
  },
  methods: {
    setTableFlexHeight() {
      this.$nextTick(() => {
        const tableElem = document.querySelector('.table-area')
        this.tableFlexHeight = tableElem ? tableElem.offsetHeight : 0
      })
    }
  }
}
