import store from '../store'
class Postmessage {
  constructor() {
    this.targetOrigin = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://127.0.0.1:3011'
    this.postMessageType = {
      pageHeightChange: 'pageHeightChange',
      pageChange: 'pageChange',
      // 表示当前选中的组件
      setActive: 'setActive'
    }
  }
  postMessage(type, json) {
    // 需要发送的数据
    let message = {
      type: this.postMessageType[type],
      value: json
    }
    // 向cms-manage进行跨源通信
    window.parent.postMessage(message, this.targetOrigin)
  }
  // 对监听事件初始化
  listenMessage() {
    // 疑问：添加的message事件在哪里被触发
    // 该事件通过或者从对象(WebSocket, Web Worker, Event Source 或者子 frame 或父窗口)接收到消息时触发
    window.addEventListener('message', (event) => {
      if (event.origin === this.targetOrigin) {
        switch (event.data.type) {
          // 页面移动，需要跨源通信
          case 'pageChange':
            store.commit('changeComponent', event.data.value)
            break
          // 添加预添加组件
          case 'setPreview':
            store.commit('setPreview', event.data.value)
            break
          // 清除预添加组件
          case 'deletePreview':
            store.commit('deletePreview', event.data.value)
            break
          case 'setActive':
            store.commit('setActiveId', event.data.value)
            break
          default:
        }
      }
    }, false)
  }
}
export default new Postmessage()
