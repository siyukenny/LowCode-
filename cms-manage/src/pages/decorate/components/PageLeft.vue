<template>
  <div class="page-left">
    <!-- 页面可选组件列表 -->
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="(item, index) in componentlist"
        :key="index"
        class="component-item"
        :title="item.title"
        :name="index + 1"
      >
        <ul class="component-list">
          <li
            v-for="(component, size) in item.components"
            :key="size"
            :class="
              draggableEnable(component) ? 'drag-enabled' : 'drag-disabled'
            "
            :draggable="draggableEnable(component)"
            @dragstart="onDragstart(component, $event)"
            @dragend="onDragend($event)"
          >
            <i :class="component.iconClass" style="font-size: 28px" />
            <p class="name">
              {{ component.name }}
            </p>
            <p class="num">
              {{
                `${componentMap[component.data.component] || 0}/${
                  component.maxNumForAdd
                }`
              }}
            </p>
          </li>
        </ul>
      </el-collapse-item>
      <!-- </div> -->
    </el-collapse>
    <!-- 页面可选组件列表 end -->
  </div>
</template>

<script>
import componentlist from '@/config/component-list'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'PageLeft',
  data() {
    return {
      componentlist,
      activeNames: [1, 3] // 组件列表展开、收缩效果
    }
  },
  computed: {
    componentMap() {
      // 预览页面组件数量
      return this.$store.getters.pageComponentTotalMap
    },
    // 从公共数据源中获取可选组件列表
    ...mapState(['dragComponent', 'addComponentIndex'])
  },
  methods: {
    ...mapMutations([
      'SET_DRAG_STATE',
      'SET_DRAG_COMPONENT',
      'SET_DRAG_INDEX',
      'VIEW_SET_ACTIVE'
    ]),
    ...mapActions(['pageChange']),
    // 开始拖动组件
    onDragstart(component, event) {
      console.log('开始拖动组件', component, event)
      this.SET_DRAG_STATE(true)
      this.SET_DRAG_COMPONENT(JSON.parse(JSON.stringify(component)))
    },
    onDragend(event) {
      this.SET_DRAG_STATE(false)
      let addIndex = this.addComponentIndex
      if (addIndex != null) {
        console.log('生成组件')
        this.pageChange({
          type: 'add',
          index: addIndex,
          data: this.dragComponent
        })
        this.SET_DRAG_INDEX(null)
        console.log('okok')
        this.VIEW_SET_ACTIVE(addIndex)
      }
    },
    draggableEnable(component) {
      let curNum = this.componentMap[component.data.component] || 0
      return curNum < component.maxNumForAdd
    }
  }
}
</script>

<style lang="less" scoped>
// 左侧框架
.page-left {
  position: absolute;
  top: 56px;
  left: 0;
  width: 186px;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
  background: #fff;
  user-select: none;
}

// 组件列表
.component-item {
  padding: 0 20px;
  margin-top: 22px;
  .component-list {
    overflow: hidden;
    li {
      float: left;
      width: 50%;
      font-size: 12px;
      padding-bottom: 8px;
      text-align: center;
      &.drag-enabled {
        cursor: move;
      }
      &.drag-disabled {
        cursor: not-allowed;
      }
      &.drag-enabled:hover {
        background: @color-1;
        color: #fff;
        border-radius: 2px;
        .ico {
          background-position: 0 -32px;
        }
        .num,
        .name {
          color: #ffffff !important;
        }
      }
      .ico {
        display: inline-block;
        margin-top: 8px;
        background-position: 0 0;
        height: 32px;
        width: 32px;
        background-size: cover;
      }
      .name {
        line-height: 16px;
        margin-top: -4px;
      }
      .num {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

// 折叠面板样式
.el-collapse {
  border: none;
  /deep/ .el-collapse-item__header {
    border: none;
    height: 30px;
    line-height: 30px;
  }
  /deep/ .el-collapse-item__wrap {
    border: none;
  }
  /deep/ .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
