<template>
  <ul class="page-set-list">
    <li :class="{'active': value === 1}" @click="setActive(1)">
      <i class="icon page" />页面设置
    </li>
    <li :class="{'active': value === 2}" @click="setActive(2)">
      <i class="icon component" />组件管理
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ChangeSetType',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 设置选中项
    setActive(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.page-set-list {
  position: fixed;
  top: 128px;
  right: 407px;
  text-align: center;
  font-size: 12px;
  color: #323233;
  z-index: 1;
  li {
    background-color: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
    border-radius: 2px;
    width: 94px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 12px;
    cursor: pointer;
    &.active {
      background-color: #155bd4;
      color: #fff;
      .icon {
        background-position: 0 11px;
      }
    }
    .icon {
      display: inline-block;
      background-position: 0 -1px;
      background-size: cover;
      width: 12px;
      height: 12px;
      vertical-align: middle;
      margin-right: 7px;
      &.page {
        background-image: url("~@/assets/img/layout/set-type-page.png");
      }
      &.component {
        background-image: url("~@/assets/img/layout/set-type-component.png");
      }
    }
  }
}
</style>
