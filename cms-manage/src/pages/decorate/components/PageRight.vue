<template>
  <div class="page-right">
    <!-- 组件编辑切换 页面设置 || 组件管理 -->
    <ChangeSetType v-model="setType" />
    <!-- 页面设置 -->
    <div v-show="setType === 1">
      <SetPageInfo />
    </div>
    <!-- 组件设置 -->
    <div v-show="setType === 2">
      <ComTitle
        :title="(currentComponent && currentComponent.name) || '组件管理'"
      />
      <ComValidTime
        v-if="currentComponent"
        v-model="currentComponent.data.validTime"
      />
      <!-- 组件编辑内容，根据当前页面数据及当前选中组件索引判断显示的编辑组件 -->
      <component
        :is="currentComponent.data.component"
        v-if="currentComponent"
        :key="currentComponent.id"
        :parmes="currentComponent.data"
        @editComponent="editComponent"
      />
      <NoSelect v-else />
    </div>
  </div>
</template>

<script>
import { dynamicComponents } from '@/utils' // 动态注册组件
import { mapState, mapActions } from 'vuex'
import ChangeSetType from './components/ChangeSetType'
import ComTitle from '@/components/BasicUi/ComTitle'
import NoSelect from './components/NoSelect'
import SetPageInfo from './components/SetPageInfo'
import ComValidTime from '../../../components/BasicUi/ComValidTime'
export default {
  name: 'PageRight',
  // 动态注册所有可配置组件
  components: {
    ChangeSetType,
    ComTitle,
    NoSelect,
    SetPageInfo,
    ComValidTime,
    ...dynamicComponents()
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['pageData', 'activeComponentId']),
    // 当前设置内容 1-页面；2-组件
    setType: {
      get: function () {
        return this.$store.state.setType
      },
      set: function (val) {
        this.$store.commit('SET_SETTYPE', val)
      }
    },
    // 当前选中编辑的组件
    currentComponent() {
      let list = this.pageData.componentList
      return list && list.length > 0
        ? list.find((item) => item.id === this.activeComponentId)
        : null
    }
  },
  methods: {
    ...mapActions(['pageChange']),
    // 更新组件数据
    editComponent(data) {
      console.log('修改store数据')
      this.pageChange({
        type: 'edit',
        id: this.activeComponentId,
        data
      })
    }
  }
}
</script>

<style lang="less">
@import url("~@/styles/icon.less");

.page-right {
  position: absolute;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 376px;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
}

// 组件配置模块
.com-group {
  // slide 滑块
  .el-slider {
    width: 95%;
    .el-slider__input {
      width: 60px;
    }
    .el-slider__runway {
      margin-right: 80px;
    }
  }
  // 单选框
  .el-radio {
    line-height: 30px;
    color: #323233;
  }
}

// 右上角删除样式
.up-pic-item-delete {
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  right: -10px;
  top: -10px;
  color: #bbb;
  background: #fff;
  border-radius: 50%;
  visibility: hidden;
  z-index: 2;
  &:hover {
    color: #aaa;
  }
}
</style>
