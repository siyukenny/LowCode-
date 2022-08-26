<template>
  <el-form v-if="data" ref="formRef" class="json-form"
           inline
           labsa-position="right"
           :labsa-width="data.formAttrMap.labelWidth || '90px'"
  >
    <template v-for="(item, key) in data.formItemMap">
      <el-form-item :key="key" :label="item.label">
        <el-select v-if="item.type === 'select'" v-model="item.value" :size="size">
          <el-option v-for="opts in item.options" :key="opts.value" :value="opts.value"
                     :label="opts.value"
          />
        </el-select>
        <el-date-picker v-else-if="item.type === 'date'" v-model="item.value"
                        :size="size"
                        :type="item.dateType || 'datetimerange'"
                        range-separator="至"
                        :default-time="['00:00:00', '23:59:59']"
                        format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
        />

        <el-input v-else v-model="item.value" :size="size" />
      </el-form-item>
    </template>
    <el-form-item label="">
      <el-button type="primary" :size="size" @click="onSearch">
        查询
      </el-button>
      <el-button :size="size" @click="onReset">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    data: {
      type: Object, default: null
    },
    size: {
      type: String, default: 'mini'
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onSearch() {
      this.$emit('onSearch')
    },
    onReset() {
      this.$emit('onReset')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
