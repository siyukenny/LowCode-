<template>
  <div id="wrap" class="wrap">
    <draggable
      v-model="pageData.componentList"
      class="draggable"
      group="people"
      :style="pageStyle"
      @change="changePositon"
      @end="onEnd"
    >
      <div v-for="element in pageData.componentList" :key="element.id" class="components">
        <componentResolve v-if="element.data.component !== 'blank'" :component-config-prop="element" />
        <div v-else class="blankComponent">
          <div>组件放置区域</div>
        </div>
      </div>
      <div class="preview-height-tag">
        <span class="preview-height-tag-tex">iPhone 8手机高度</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {mapMutations} from 'vuex'

import componentResolve from '@/components/componentResolve'
import Postmessage from '@/utils/Postmessage'
export default {
  name: 'Page',
  components: {
    componentResolve,
    draggable
  },
  data: function () {
    return {
    }
  },
  computed: {
    pageData: {
      get: function () {
        return this.$store.getters.pageData
      },
      set: function (newValue) {
      }
    },
    pageStyle() {
      const s = {
        backgroundColor: this.pageData.backgroundColor,
        backgroundPosition: `center ${this.pageData.backgroundPosition}`
      }

      if (this.pageData.backgroundImage) {
        s.backgroundImage = `url(${this.pageData.backgroundImage})`
      }

      return s
    }
  },
  mounted() {
    Postmessage.listenMessage()
    this.getComponentsTop()
  },
  methods: {
    // vuedraggable组件中，group名称相同的组件可以相互拖动
    // 当该组件发生变化时触发
    changePositon(e) {
      let {newIndex, oldIndex, element} = e.moved
      this.$store.commit('changeComponentPosition', {newIndex, oldIndex, element})
    },
    onEnd(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    ...mapMutations(
      [
        'getComponentsTop'
      ]
    )
  }
}
</script>

<style scoped>
.wrap{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.draggable{
  box-shadow: 0 0 14px 0 rgb(0 0 0 / 10%);
  position: relative;
  width: 375px;
  min-height: 700px;
  border: solid 1px #eee;
  border-radius: 2px;
  /* background: #fff; */
  overflow: visible;
  background-repeat: no-repeat;
  background-size: 100% auto;
  perspective: 100px;
}
.blankComponent{
  height: 60px;
  background:  #85c1e9 ;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dotted 2px #aaa;
}
.blankComponent div{
  width: 160px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  background:  #3498db;
}
.blankComponent{
  height: 60px;
  background:  #85c1e9 ;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dotted 2px #aaa;
}
.blankComponent div{
  width: 160px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  background:  #3498db;
}
.preview-height-tag{
  position: absolute;
  left: -150px;
  top: 649px;
  width: 130px;
  display: flex;
  color: #a2a2a2;
  border-bottom: 1px solid #dedede;
}
.preview-height-tag-tex{
  padding-top: 4px;
  font-size: 12px;
}
</style>
