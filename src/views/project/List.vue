<template>
  <div>
    <h1 class="text-lg margin-bottom">我的项目</h1>
    <div class="flex flex-wrap">
      <template v-for="(item, index) in list">
        <div class="project" @click="goSchema(item)" :key="index">
          <div class="icon">{{ item.name }}</div>
          <div class="margin-top text-bold text-black">{{ item.name }}</div>
        </div>
      </template>
      <div class="project" @click="create">
        <a-icon type="plus-circle" class="add-icon" />
        <div class="margin-top text-bold text-black">创建新项目</div>
      </div>
    </div>
  </div>
</template>

<script>
import { userProjects } from '@/graphql/project.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'

export default {
  components: {},
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    create() {
      this.$emit('create')
    },
    goSchema(project) {
      store.dispatch('SetCurrentProject', project).then(() => {
        this.$router.push({ name: 'Content' })
      })
      // store.dispatch('SetCurrentProject', project).then(() => {
      //   this.$router.push({ name: 'Schema' })
      // })
    },
    getList() {
      let self = this
      self.$apollo
        .query({
          query: userProjects,
          variables: {},
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          self.list = data.data.userProjects
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
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
