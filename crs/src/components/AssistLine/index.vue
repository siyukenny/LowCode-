<template>
  <div :style="{
    backgroundColor: property.backgroundColor ? property.backgroundColor : property.defBackgroundColor,
    height: property.height + 'px',
    padding: property.paddingVisible ? '16px' : 0
  }"
  >
    <div
      :style="{
        color: property.borderColor ? property.borderColor : property.defBorderColor,
        borderBottom: '1px',
        borderBottomStyle:!property.type ? 'none': property.borderStyle,
        lineHeight: property.height + 'px',
        position: 'relative',
        top: '50%',
      }"
    />
  </div>
</template>
<script>
export default {
  name: 'AssistLine',
  props: {
    property: {
      type: Object,
      default: () => ({})

    }
  },
  watch: {
    property(val) {
    }
  }
}
</script>
