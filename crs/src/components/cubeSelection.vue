<template>
  <div class="magic-wrap">
    <div
      :style="{
        paddingLeft: property.pageMargin + 'px',
        paddingRight: property.pageMargin + 'px'
      }"
    >
      <div v-if="property.imageList.length" class="magic-box" :class="property.template">
        <!-- 模板布局：一行2个、一行3个、一行4个、二左二右、一上二下 -->
        <template
          v-if="
            property.template == 'oneLine2' ||
              property.template == 'oneLine3' ||
              property.template == 'oneLine4' ||
              property.template == 'left2right2' ||
              property.template == 'top1bottom2'
          "
        >
          <div
            v-for="(item, index) in property.imageList"
            :key="index"
            class="magic-item"
            :class="['magic-' + (index + 1), { nodata: !item.imageUrl }]"
          >
            <div
              class="magic-img"
              :style="{ padding: property.imgMargin / 2 + 'px' }"
              @click="jumpLink(item.link)"
            >
              <van-image width="100%" height="100%" :radius="property.radius + 'px'"
                         :src="item.imageUrl?item.imageUrl:defaultImg"
              />
              <!-- <img v-if="item.imageUrl" :src="item.imageUrl"> -->
            </div>
          </div>
        </template>
        <!-- 模板布局：一左二右 -->
        <template v-if="property.template == 'left1right2'">
          <div class="x-half">
            <div
              class="magic-item"
              :class="['magic-1', { nodata: !property.imageList[0].imageUrl }]"
            >
              <div
                class="magic-img"
                :style="{ padding: property.imgMargin / 2 + 'px' }"
                @click="jumpLink(property.imageList[0].link)"
              >
                <van-image width="100%" height="100%" :radius="property.radius + 'px'"
                           :src="property.imageList[0].imageUrl?property.imageList[0].imageUrl:defaultImg"
                />
                <!-- <img
                  v-if="property.imageList[0].imageUrl"
                  :src="property.imageList[0].imageUrl"
                > -->
              </div>
            </div>
          </div>
          <div class="x-half">
            <div
              v-for="(item, index) in property.imageList"
              v-if="index > 0"
              :key="index"
              class="magic-item"
              :class="['magic-' + (index + 1), { nodata: !item.imageUrl }]"
            >
              <div
                class="magic-img"
                :style="{ padding: property.imgMargin / 2 + 'px' }"
                @click="jumpLink(item.link)"
              >
                <van-image width="100%" height="100%" :radius="property.radius + 'px'"
                           :src="item.imageUrl?item.imageUrl:defaultImg"
                />
                <!-- <img v-if="item.imageUrl" :src="item.imageUrl"> -->
              </div>
            </div>
          </div>
        </template>
        <!-- 模板布局：一左三右 -->
        <template v-if="property.template == 'left1right3'">
          <div class="x-half">
            <div
              class="magic-item"
              :class="['magic-1', { nodata: !property.imageList[0].imageUrl }]"
            >
              <div
                class="magic-img"
                :style="{ padding: property.imgMargin / 2 + 'px' }"
                @click="jumpLink(property.imageList[0].link)"
              >
                <van-image width="100%" height="100%" :radius="property.radius + 'px'"
                           :src="property.imageList[0].imageUrl?property.imageList[0].imageUrl:defaultImg"
                />
                <!-- <img
                  v-if="property.imageList[0].imageUrl"
                  :src="property.imageList[0].imageUrl"
                > -->
              </div>
            </div>
          </div>
          <div class="x-half">
            <div
              v-for="(item, index) in property.imageList"
              v-if="index == 1"
              :key="index"
              class="magic-item"
              :class="['magic-' + (index + 1), { nodata: !item.imageUrl }]"
            >
              <div
                class="magic-img"
                :style="{ padding: property.imgMargin / 2 + 'px' }"
                @click="jumpLink(item.link)"
              >
                <van-image width="100%" height="100%" :radius="property.radius + 'px'"
                           :src="item.imageUrl?item.imageUrl:defaultImg"
                />
                <!-- <img v-if="item.imageUrl" :src="item.imageUrl"> -->
              </div>
            </div>
            <div class="x-half-flex">
              <div
                v-for="(item, index) in property.imageList"
                v-if="index > 1"
                :key="index"
                class="magic-item"
                :class="['magic-' + (index + 1), { nodata: !item.imageUrl }]"
              >
                <div
                  class="magic-img"
                  :style="{ padding: property.imgMargin / 2 + 'px' }"
                  @click="jumpLink(item.link)"
                >
                  <van-image width="100%" height="100%" :radius="property.radius + 'px'"
                             :src="item.imageUrl?item.imageUrl:defaultImg"
                  />
                  <!-- <img v-if="item.imageUrl" :src="item.imageUrl"> -->
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-else>
        <van-image width="100%" height="200" src="" />
      </div>
    </div>
  </div>
</template>
<script>
import JumpLink from '@/mixin/jumpLink'
import defaultImg from '../assets/block-img.png'

export default {
  name: 'CubeSelection',
  mixins: [JumpLink],
  props: {
    property: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      defaultImg
    }
  },
  mounted() {
    console.log(this.property, 'property')
  },
  methods: {

  }
}
</script>
<style scoped>
.magic-wrap {
  /* overflow: hidden; */
}
.magic-box {
  position: relative;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.magic-box .x-half-flex {
  display: flex;
}
.magic-box .x-half-flex .magic-item {
  flex-basis: 50%;
  width: 50%;
}
.magic-box .x-half {
  width: 50%;
  flex: 1;
}
.magic-box .magic-item {
  flex: 1;
  position: relative;
  cursor: pointer;
  text-align: center;
}
.magic-box .magic-item .magic-img {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.magic-box .magic-item img {
  width: 100%;
  vertical-align: top;
  height: 100%;
}
.magic-box.left2right2 {
  flex-wrap: wrap;
}
.magic-box.left2right2 .magic-item {
  width: 50%;
  flex-basis: 50%;
}
.magic-box.top1bottom2 {
  flex-wrap: wrap;
}

.magic-box.top1bottom2 .magic-1 {
  width: 100%;
  flex-basis: 100%;
}

.magic-box.top1bottom2 .magic-2,
.magic-box.top1bottom2 .magic-3 {
  width: 50%;
  flex-basis: 50%;
}

.magic-box.left1right2 .magic-1 {
  height: 100%;
}
.magic-box.left1right3 .magic-1 {
  height: 100%;
}
</style>
