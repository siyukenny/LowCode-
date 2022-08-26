import Vue from 'vue'
import Vuex from 'vuex'
import Postmessage from '@/utils/Postmessage'
import coupon from './coupon'
Vue.use(Vuex)

/** 图文导航-测试数据--start */
const base = {
  text: '乐吧乐吧乐吧乐吧乐吧乐吧乐吧乐吧阿水大大大大是大',
  src: 'https://yun.duiba.com.cn/saas/images/decoration-icons/single.png',
  link: 'http://www.baidu.com'
}

const mini = {
  text: '乐吧乐',
  src: 'https://yun.duiba.com.cn/saas/images/decoration-icons/single.png',
  link: ''
}

const list8 = new Array(10).fill(null).map((item, index) => {
  const current = parseInt(Math.random(0, 1) * 2)
  const text = current === 0 ? base.text : mini.text
  const link = current === 0 ? `${base.link}/${index}?t=${index}` : mini.link
  return Object.assign({}, base, {text: text + (index + 1), link})
})

/** 测试数据--end */

export default new Vuex.Store({
  state: {
    pageData: {
      componentList: [
      ]
    },
    previewId: null, // 当前选中的组件id
    previewHeight: 0,
    componentsTopList: []
  },

  getters: {
    // 并没有对state.pageData进行加工，为什么还要使用getters
    pageData: state => {
      return state.pageData
    }
  },
  mutations: {
    addComponent(state, com) {
      state.pageData.componentList.push(com)
      this.commit('postPageChange')
    },
    deleteComponent(state, id) {
      const index = state.pageData.componentList.findIndex(item => item.id === id)
      state.pageData.componentList.splice(index, 1)
      this.commit('postPageChange')
    },
    changeSelected(state, id) {
      state.previewId = id
      Postmessage.postMessage('setActive', id)
    },
    // 从后台接收数据，更新crs页面数据
    changeComponent(state, { disabledRestHeight, value }) {
      state.pageData = value;
      if (disabledRestHeight) return
      this.commit('getComponentsTop')
    },
    // 为什么这里不直接写postPageChange？预留操作
    changeComponentPosition(state, data) {
      this.commit('postPageChange')
    },
    // 向后台发送页面数据变更事件
    // 使用vuedraggable拖拽，元素被拖拽后，绑定的数组里面对象的顺序也会随着改变，所以不需要再重新对state.pageData赋值，其内部已经是新的值
    postPageChange(state) {
      Postmessage.postMessage('pageChange', state.pageData)
      this.commit('getComponentsTop')
    },
    setComponent(state, data) {
      state.pageData.componentList = data
    },
    // 添加预添加组件，组件还未放入页面，只是显示预添加的图片
    setPreview(state, index) {
      this.commit('deletePreview')
      const previewComponent = {
        data: {
          component: 'blank'
        }
      }
      state.pageData.componentList.splice(index, 0, previewComponent)
    },
    // 删除预添加组件
    deletePreview(state) {
      state.pageData.componentList = state.pageData.componentList.filter(item => item.data.component != "blank")
    },
    setActiveId(state, id) {
      state.previewId = id
    },
    getComponentsTop(state) {
      // 为什么要用setTimeout
      setTimeout(() => {
        let elements = document.getElementsByClassName('components')
        state.componentsTopList = []
        for (let i = 0; i < elements.length; i++) {
          state.componentsTopList.push(elements[i].offsetTop + elements[i].offsetHeight)
        }
        state.previewHeight = document.getElementById('wrap').offsetHeight
        Postmessage.postMessage('pageHeightChange', {
          height: state.previewHeight,
          componentsTopList: state.componentsTopList
        })
      })
    }
  },
  actions: {},
  modules: {
    coupon
  }
})
