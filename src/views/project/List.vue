<template>
  <div>
    <h1 class="text-lg margin-bottom">我的项目</h1>
    <div class="flex flex-wrap">
      <div class="project" @click="goSchema">
        <div class="icon">小</div>
        <div class="margin-top text-bold text-black">小鱼儿官网</div>
      </div>
      <div class="project" @click="create">
        <a-icon type="plus-circle" class="add-icon" />
        <div class="margin-top text-bold text-black">创建新项目</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    create() {
      this.$emit('create')
    },
    goSchema() {
      this.$router.push({ name: 'Schema' })
    }
  }
}
</script>

<style lang="less" scoped>
.project {
  position: relative;
  z-index: 1;
  transform: scale(1);
  top: 0;
  margin-right: 53px;
  margin-bottom: 53px;
  width: 200px;
  box-sizing: border-box;
  cursor: pointer;
  padding: 48px 32px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid rgb(240, 242, 247);
  transition: all 0.3s ease 0s;
  .add-icon {
    font-size: 80px;
    color: #6663fd;
  }
  .icon {
    width: 80px;
    height: 80px;
    background-color: black;
    color: rgb(255, 255, 255);
    font-size: 32px;
    line-height: 80px;
    text-align: center;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
  }
}
.project:nth-child(4n) {
  margin-right: 0;
}
.project:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 20px;
  transform: scale(1.01);
  top: -5px;
}
</style>
