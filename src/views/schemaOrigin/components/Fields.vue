<template>
  <div class="padding-xs">
    <div class="text-grey margin-bottom-xs">字符串</div>
    <div
      class="field flex align-center pointer margin-bottom-xs solid line-grey shadow text-ssm"
      onselectstart="return false;"
    >
      <div class="text-icon">单</div>
      <div class="name margin-left-xs">单行文本</div>
    </div>
    <div class="text-grey margin-bottom-xs">富文本</div>
    <div
      class="field flex align-center pointer margin-bottom-xs solid line-grey shadow text-ssm"
      onselectstart="return false;"
    >
      <div class="text-icon">百</div>
      <div class="name margin-left-xs">百度编辑器</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fields',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
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
