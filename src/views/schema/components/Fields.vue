<template>
  <div class="padding-xs">
    <template v-for="(item, index) in fields">
      <div :key="index" @click="showCreate(item)">
        <div class="text-grey margin-bottom-xs">{{ item.name }}</div>
        <div
          class="field flex align-center pointer margin-bottom-xs solid line-grey shadow text-ssm"
          onselectstart="return false;"
        >
          <div class="text-icon">{{ item.prefix }}</div>
          <div class="name margin-left-xs">{{ item.flag }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Fields',
  props: {},
  components: {},
  data() {
    return {
      fields: [
        {
          name: '字符串',
          prefix: '单',
          allName: '单行文本',
          flag: 'SINGLE_TEXT'
        },
        {
          name: '字符串',
          prefix: '多',
          allName: '多行文本',
          flag: 'MULTI_TEXT'
        },
        {
          name: '富文本',
          prefix: '百',
          allName: '百度编辑器',
          flag: 'RICH_TEXT'
        },
        {
          name: '关联',
          prefix: '附',
          allName: '附件',
          flag: 'ASSET'
        },
        {
          name: '关联',
          prefix: '模',
          allName: '关联模型',
          flag: 'REFERENCE'
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {
    showCreate(item) {
      this.$emit('create', item)
    }
  }
}
</script>
<style lang="less" scoped>
.field {
  box-sizing: border-box;
  padding: 3px;
  color: black;
  // border: 1px solid #f0f2f7;
  border-radius: 5px;
  // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  .text-icon {
    background-color: rgb(138, 218, 18);
    color: white;
  }
}
</style>
