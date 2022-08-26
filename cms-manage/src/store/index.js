import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 跨源通信函数
import { Messager, createRandomId } from '@/utils'
import settings from '@/config'

// 初始化跨源通信对象
const messager = new Messager(settings.decorateOrigin)

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
let modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

modules = Object.assign({}, modules)

// 搭建页面初始化数据
const emptyPageData = {
  id: '',
  name: '页面标题',
  shareDesc: '', // 微信分享文案
  shareImage: '', // 微信分享图片
  backgroundColor: '', // 页面背景颜色
  backgroundImage: '', // 页面背景图片
  backgroundPosition: 'top', // 页面背景位置
  cover: '',
  componentList: []
}

const store = new Vuex.Store({
  state: {
    // 当前设置内容 1-页面；2-组件
    setType: 1,
    // 上传图片弹出框组件是否显示
    dialogImageVisible: false,
    // 上传图片成功后的回调事件
    upLoadImgSuccess: null,
    // 当前搭建的页面数据，保存时也是保存该对象
    pageData: JSON.parse(JSON.stringify(emptyPageData)),
    // 当前选中的组件id，根据该id显示对应的编辑组件及预览时添加选中状态
    activeComponentId: null,
    // 当前是否正在拖动组件到页面
    dragActive: false,
    // 当前正在拖动的组件对象
    dragComponent: {},
    // 拖动左侧组件时当前要添加到的索引位置
    addComponentIndex: null,
    // 搭建模块跨源通信 - H5页面高度
    previewHeight: '',
    // 搭建模块跨源通信 - H5页面各组件top值, 计算拖拽时组件要拖动到的位置
    componentsTopList: '',
    wxParams: JSON.stringify({isLogin: true}) // h5页面参数
  },
  getters,
  mutations: {
    SET_INIT_PAGE_DATA(state) {
      state.pageData = JSON.parse(JSON.stringify(emptyPageData))
    },
    // 修改当前设置内容（页面 or 组件）
    SET_SETTYPE(state, value) {
      state.setType = value
    },
    // 修改页面属性配置
    SET_PAGE_CONFIG(state, config) {
      Object.keys(config).forEach(item => {
        state.pageData[item] = config[item]
      })
      this.commit('VIEW_UPDATE', true)
    },
    // 修改上传图片模态框是否显示
    SET_UPIMAGE_VISIBLE(state, value) {
      state.dialogImageVisible = value
    },
    // 修改上传图片成功的回调事件
    SET_UPIMAGE_FUC(state, value) {
      state.upLoadImgSuccess = value
    },
    // 修改组件拖放状态（当前是否正在拖动左侧组件到页面中）
    SET_DRAG_STATE(state, value) {
      state.dragActive = value
    },
    // 设置当前正在拖动的组件对象
    SET_DRAG_COMPONENT(state, value) {
      state.dragComponent = value
    },
    // 设置拖动的组件要添加到的位置
    SET_DRAG_INDEX(state, value) {
      state.addComponentIndex = value
    },
    // 设置当前选中的组件id
    SET_ACTIVE_ID(state, value) {
      state.activeComponentId = value
    },
    // 页面新增组件方法
    ADD_COMPONENT(state, { index, data }) {
      const component = JSON.parse(JSON.stringify(data))
      // 生成随机ID
      const id = component.data.component + '-' + createRandomId()
      component.id = id
      if (component.iconClass) { delete component.iconClass } // 清除后台使用的图标
      state.pageData.componentList.splice(index, 0, component) // 插入选择的组件
      this.commit('SET_ACTIVE_ID', id) // 设置新加入的组件为选中状态
      this.commit('VIEW_SET_ACTIVE', id) // 更新H5区域选中状态
      this.commit('SET_SETTYPE', 2) // 更新页面编辑类型为组件
      this.commit('SET_DRAG_INDEX', null) // 重置拖动组件要添加的位置
    },
    // 页面删除组件方法
    DELETE_COMPONENT(state, { index }) {
      // 清空页面全部组件
      if (index === 'all') {
        state.pageData.componentList = []
      } else if (typeof index === 'number') {
        // 删除页面单个组件
        state.pageData.componentList.splice(index, 1)
      }
    },
    // 页面编辑组件方法
    EDIT_COMPONENT(state, { id, data }) {
      console.log('修改store数据', id, data)
      const component = state.pageData.componentList.find(item => item.id === id)
      if (component) component.data = data
    },
    CHANGE_PAGEDATA(state,data){
        state.pageData = data
        console.log(state.pageData);
    },
    // 页面更新方法
    UPDATE_COMPONENT(state, { data }) {
      console.log('PC搭建页面更新页面数据为', data)
      state.pageData = data || {}
    },
    // 获取H5组件高度并更新
    UPDATE_PAGE_HEIGHT(state, { height, list }) {
      state.previewHeight = height
      state.componentsTopList = list
    },
    // 向H5页面发送更改后的数据
    // disabledRestHeight: 是否将h5组件高度更新到cms
    VIEW_UPDATE(state, disabledRestHeight = false) {
      console.log('向H5发送更改后的数据')
      console.log(state.pageData)
      messager.emit('pageChange', {
        disabledRestHeight,
        value: state.pageData
      })
    },
    // 向H5页面发送预添加组件
    VIEW_ADD_PREVIEW(state, index) {
      messager.emit('setPreview', index)
    },
    // 向H5页面发送删除预添加组件
    VIEW_DELETE_PREVIEW(state) {
      messager.emit('deletePreview')
    },
    // 向H5页面发送选中指定项
    VIEW_SET_ACTIVE(state, id) {
      messager.emit('setActive', id)
    }
  },
  actions: {
    // 登录超时重新登录
    reLogin(context) {
      // 保留当前页面数据并重新登录
      window.localStorage.setItem('design-editor-cache-' + context.state.pageData.pageId, JSON.stringify(context.state.pageData.componentList))
      window.location.href = window.location.origin + '/vendor/tologin'
    },
    // 搭建页面数据变化时调用方法 - 将更改后的数据发送到H5
    pageChange({ commit }, changeValue) {
      console.log(changeValue, 'changeValue')
      const commitObj = {
        add: 'ADD_COMPONENT', // 新增组件
        delete: 'DELETE_COMPONENT', // 删除组件
        edit: 'EDIT_COMPONENT', // 编辑组件
        update: 'UPDATE_COMPONENT' // 更新页面
      }
      commitObj[changeValue.type] && commit(commitObj[changeValue.type], changeValue)
      // 向H5页面发送更改后的数据
      commit('VIEW_UPDATE')
    },
    // 跨源通信对象H5数据的监听
    initMessage({ commit }) {
      // 监听H5预览页面高度变化
      messager.on('pageHeightChange', data => {
        console.log('从H5更新组件高度为', data)
        let height = data.height ? data.height + 72 : 768
        let list = data.componentsTopList || []
        commit('UPDATE_PAGE_HEIGHT', { height, list })
      })
      // 监听H5预览页面数据变化
      messager.on('pageChange', data => {
        console.log('从H5更新组件数据为', data)
        commit('UPDATE_COMPONENT', { data })
      })
      // 监听H5预览页面选中项id变化
      messager.on('setActive', id => {
        commit('SET_ACTIVE_ID', id)
        commit('SET_SETTYPE', 2)
      })
    }
  },
  modules
})

Vue.store = store

export default store
