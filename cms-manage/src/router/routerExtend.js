import Router from 'vue-router'
// import Vue from 'vue'
Router.prototype.open = function(...args) { // 新窗口打开路由页
  let searchFunc = args[args.length - 1]
  if (typeof searchFunc === 'function') {
    // 打开窗口时，缓存当前页查询回调，便于关闭子窗口时调用
    window.closeCallback = searchFunc
  } else if (window.closeCallback) { // 未传回调参数时，清空老的callback
    window.closeCallback = null
  }
  let routeUrl = this.resolve(...args)
  window.open(routeUrl.href, '_blank')
}
window.closeAndRefreshOpener = function() { // 关闭子窗口时，调用父窗口的查询接口
  if (window.opener && window.opener.closeCallback) {
    window.opener.closeCallback()
  }
  window.close()
}
// const CLOSE_TIME = 1000
// const DEF_OPTIONS_CLOSE = {
//   type: 'success',
//   message: '保存成功',
//   duration: CLOSE_TIME,
//   onClose: () => {
//     window.closeAndRefreshOpener()
//   }
// }
/**
 * @param args string or object
 * @param closeCallback function  关闭窗口后的回调
 * 调用方式1： this.$message.closeWin()
 * 调用方式2： this.$message.closeWin(() => { this.saveLoading = false })
 * 调用方式3： this.$message.closeWin('操作成功')
 * 调用方式4： this.$message.closeWin({ type: '', message: '', ....}) 同element-ui message参数
//  */
// Vue.prototype.$message.closeWin = function (args, closeCallback) {
//   let opts = Object.assign({}, DEF_OPTIONS_CLOSE)
//   if (typeof args === 'string') {
//     opts.message = args
//   } else if (typeof args === 'function') {
//     closeCallback = args
//   } else {
//     Object.assign(opts, args)
//   }
//   let message = this
//   message(opts)
//   if (closeCallback && typeof closeCallback === 'function') {
//     setTimeout(() => {
//       closeCallback()
//     }, CLOSE_TIME)
//   }
// }
