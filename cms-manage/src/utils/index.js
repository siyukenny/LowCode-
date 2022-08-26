export const isEmpty = val => {
  return val === '' || val === undefined || val === null
}

/**
 * @name: 根据目录动态注册配置组件
 * @return {Object} 动态注册的组件名及对应引入的组件文件，可直接用于Vue中的components属性中
 */
export function dynamicComponents() {
  let components = {}
  const dycomponent = require.context('@/components/ComponentsConfig', true, /\.vue$/)
  dycomponent.keys().map(item => {
    // 动态注册组件对应的配置文件
    const name = item.split('/')[1]
    components[name] = dycomponent(item).default
  })
  return components
}

/**
 * @name: 父级窗口搭建页面与H5预览页面跨源通信函数
 * @param {Window} win  要接收消息的目标窗口
 * @param {String} targetOrigin  指定win中可以接收到消息的origin
 */
export class Messager {
  // 构造实例函数
  constructor(targetOrigin) {
    this.targetOrigin = targetOrigin
    this.actions = {}
    // 监听传送数据的实例函数
    this.messageListener = (event) => {
      // 判断接收的消息是否是指定的域发送、是否有监听指定的事件，符合则执行监听事件
      const type = event.data && event.data.type
      if (event.origin === this.targetOrigin && type && this.actions[type]) {
        this.actions[type](event.data.value)
      }
    }
    window.addEventListener('message', this.messageListener)
  }
  /**
   * @name: 设置指定名称的消息监听
   * @param {String} type  监听的消息名称
   * @param {Function} cb  监听执行的回调函数
   */
  on(type, cb) {
    this.actions[type] = cb
    return this
  }
  /**
   * @name: 发送指定名称的消息
   * @param {String} type   发送的消息名称
   * @param {Object} value  发送的数据
   */
  emit(type, value) {
    var win = document.getElementById('previewIframe').contentWindow
    win.postMessage({
      type, value
    }, this.targetOrigin)
    return this
  }
  // 移除消息的监听
  destroy() {
    window.removeEventListener('message', this.messageListener)
  }
}

/**
 * 防抖函数，高频操作在指定时间间隔内只执行最后一次
 * @param  {Function}     func     要进行防抖的函数
 * @param  {Number}       wait     防抖间隔的时间，毫秒数
 * @param  {Boolean}      immediate     首次触发时是否立即执行
 * @return {Function}              返回防抖控制后的执行函数
 */
export function debounce(func, wait = 500, immediate) {
  let timer
  return function () {
    let context = this
    let arg = arguments

    if (immediate) {
      func.apply(context, arg)
      immediate = false
      return
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, arg)
    }, wait)
  }
}

/**
 * 节流函数，高频操作在指定时间间隔内只执行一次
 * @param  {Function}     func     要进行节流的函数
 * @param  {Number}       wait     节流间隔的时间，毫秒数
 * @param  {Boolean}      immediate     首次触发时是否立即执行
 * @return {Function}              返回节流控制后的执行函数
 */
export function throttle(func, wait = 500, immediate) {
  let timer
  return function () {
    let context = this
    let arg = arguments

    if (immediate) {
      func.apply(context, arg)
      immediate = false
      return
    }

    if (timer) return
    timer = setTimeout(() => {
      func.apply(context, arg)
      timer = null
    }, wait)
  }
}

/**
 * 生成随机id 添加组件时生成
 */
export function createRandomId() {
  return Number(Math.random().toString().substr(3, 5) + Date.now()).toString(36)
}
