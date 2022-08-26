<template>
  <div style="position: relative">
    <div v-show="dialogShow"
         :class="[componentConfig.data.component==='Dialog'?(componentConfig.id === previewId?'componentDialog selected':'componentDialog'):'component']" @click="sensorsTest"
    >
      <div @click="!preview?changeSelected(componentConfig.id):''">
        <component
          :is="componentConfig.data.component"
          :property="componentConfig.data"
          :style="styleObject"
          :class="{componentDom: true,selected: componentConfig.id === previewId}"
          :sensors="sensors"
          :run-env="runEnv"
        />
      </div>
      <div v-if="!preview" class="modal" @click="!preview?changeSelected(componentConfig.id):''" />
      <div v-if="!preview" class="name" :class="operateTagClass">
        {{ componentConfig.name }}
      </div>
      <div v-if="!preview" class="delete" :class="operateTagClass"
           @click="deleteComponent(componentConfig.id)"
      >
        删除
      </div>
    </div>
    <div v-show="componentConfig.data.component==='Dialog'" class="hideDialog" @click="dialogSwitch">
      {{ dialogShow?'隐藏弹窗':'显示弹窗' }}
    </div>
  </div>
</template>
<script>
// import sersorsLoad from '@/sensors'
import runEnv from '../utils/runEnv'
import Carousel from '@/components/Carousel'
import Dialog from '@/components/Dialog'
import imgc from '@/components/imgc'
import AssistLine from '@/components/AssistLine'
import FloatLayer from '@/components/FloatLayer'
import OnlineService from '@/components/OnlineService'
import Video from "@/components/Video";
import Slider from '@/components/Slider'
import CubeSelection from '@/components/cubeSelection'
import ImageNav from '@/components/image-nav'
import { mapState, mapMutations } from 'vuex'
import product from '@/components/product'
import RichText from '@/components/richText'
export default {
  name: 'ComponentResolve',
  components: {
    Carousel,
    Dialog,
    imgc,
    AssistLine,
    FloatLayer,
    OnlineService,
    Video,
    Slider,
    CubeSelection,
    ImageNav,
    product,
    RichText
  },
  props: {
    componentConfigProp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 若该组件为只读状态，传入preview=true
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleObject: {},
      componentConfig: JSON.parse(JSON.stringify(this.componentConfigProp)),
      runEnv: 'dev',
      sensors: null,
      dialogShow: true
    }
  },
  watch: {
    componentConfigProp: {
      handler: function (value) {
        // 为什么这里不用深拷贝？
        this.componentConfig = value
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['previewId']),
    operateTagClass() {
      return this.componentConfig.data.component === 'OnlineService'
        ? 'online-service-pos'
        : (this.componentConfig.data.component === 'FloatLayer' ? 'float-layer-pos' : '')
    }
  },
  mounted() {
    this.getRunEnv()
    // this.sensors = new sersorsLoad(this)
    this.styleObject = {
      color: this.componentConfig.textColor,
      borderRadius: this.componentConfig.radius + 'px',
      marginTop: this.componentConfig.marginTop + 'px',
      '--selected-width': this.componentConfig.data.component === 'OnlineService'
        ? '54px'
        : (this.componentConfig.data.component === 'FloatLayer' ? '100px' : '375px')
    }
  },
  methods: {
    ...mapMutations([
      'changeSelected',
      'deleteComponent'
    ]),
    getRunEnv() {
      runEnv().then(res => {
        this.env = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    sensorsTest() {
      // this.sensors.track('clickWrap', {
      //   time: 'sensorsTest'
      // })
    },
    // 弹窗显示和隐藏逻辑切换
    dialogSwitch() {
      this.dialogShow = !this.dialogShow
    }
  }
}
</script>

<style scoped>
:root {
  --selected-width: 54px;

}
.component{
  position: relative;
  cursor: move;
}
.componentDialog{
  position: fixed;
  top: 0;
  z-index: 99;
}
.componentDialog .name,.componentDialog .delete{
  top: 30px;
}
.componentDialog .componentDom.selected:before {
  left: 0;
  border: none;
}
.name, .delete{
  font-size: 14px;
  color: #333;
  padding: 4px 12px;
  background: #fff;
  position: absolute;
  white-space: nowrap;
  border: 2px;
  height: 18px;
  border-radius: 2px;
  line-height: 18px;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  color: #323232;
}

.name, .delete{
  left: 380px;
  top: 0px;
}
.delete {
  display: none;
}
.components:hover .name{
  display: none;
}
.components:hover .delete{
  display: block;
}
.name:hover +.delete {
  display: block;
}
/* .delete:hover +.name {
  display: none;
} */
.name:before, .delete:before{
  content: '';
  display: inline-block;
  width: 0px;
  height: 0px;
  border: solid 4px transparent;
  border-right: solid 4px #fff;
  position: absolute;
  left: -8px;
  top: 8px;
}
.componentDom{
  min-height: 20px;
  user-select: none;
  position: relative;
}

.selected:before{
  content: "";
  position: absolute;
  width: var(--selected-width);
  left: -1px;
  top: 0;
  bottom: 0;
  width: 100%;
  border: 1px dashed #155bd4;
  z-index: 50;
  cursor: move;
  box-sizing: content-box;
}
.componentDom.selected:before{
  left: -2px;
  border: 2px solid #155bd4;
}

.modal:hover{
  cursor: move;
  border: 1px dashed #155bd4;
}

.float-layer-pos, .online-service-pos {
  position: fixed;
  top: unset
}

.float-layer-pos {
  bottom: 180px
}

.online-service-pos {
  bottom: 60px
}

.hideDialog{
  position: fixed;
  right: 380px;
  top: 0px;
  color: #333;
  padding: 4px 12px;
  background: #fff;
  white-space: nowrap;
  border: 2px;
  height: 18px;
  border-radius: 2px;
  line-height: 18px;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  color: #323232;
}
.hideDialog:before{
  content: '';
  display: inline-block;
  width: 0px;
  height: 0px;
  border: solid 4px transparent;
  border-left: solid 4px #fff;
  position: absolute;
  right: -8px;
  top: 8px;
}
</style>
