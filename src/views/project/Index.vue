<template>
  <div>
    <header class="project-header text-center text-xxxxl padding-xxs text-black">
      <logo />
    </header>
    <div class="project-body">
      <project-list v-if="!is_create" @create="create"></project-list>
      <project-create v-else @cancel="cancelCreate"></project-create>
    </div>
    <footer class="solid-top padding-xxs project-footer">
      <a-popover placement="topLeft">
        <template slot="content">
          <a-button type="link" @click="logout"><a-icon type="logout" />退出</a-button>
        </template>
        <img src="~@/assets/logo.svg" width="40px" class="margin-left round pointer" />
      </a-popover>
    </footer>
  </div>
</template>

<script>
import { domTitle } from '@/utils/domUtil'
import Logo from '@/components/tools/Logo'
import ProjectList from './List'
import ProjectCreate from './Create'
import { mapActions } from 'vuex'
import { userLogout } from '@/graphql/login.graphql'
// import { formatGraphErr } from '@/utils/util'

export default {
  components: {
    Logo,
    ProjectList,
    ProjectCreate
  },
  data() {
    return {
      domTitle,
      is_create: false
    }
  },
  created() {},
  methods: {
    ...mapActions(['Logout']),
    create() {
      this.is_create = true
    },
    cancelCreate() {
      this.is_create = false
    },
    logout() {
      let self = this
      this.$confirm({
        title: '确认退出吗？',
        confirmLoading: true,
        onOk() {
          self.$apollo
            .query({
              query: userLogout,
              variables: {}
            })
            .catch(() => {
              // self.$message.warning(formatGraphErr(err.message))
            })
            .finally(() => {
              self
                .Logout({})
                .then(() => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 16)
                })
                .catch(err => {
                  self.$message.error({
                    title: '错误',
                    description: err.message
                  })
                })
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.project-header .logo img,
.project-header .logo svg {
  height: 50px;
  width: 50px;
}
.project-header .logo img,
.project-header .logo svg,
.project-header .logo h1 {
  display: inline-block;
  vertical-align: middle;
}
.project-header .logo h1 {
  color: #000;
  font-size: 35px;
  margin: 0 0 0 12px;
  font-weight: 600;
  vertical-align: middle;
}
</style>
<style lang="less" scoped>
.project-header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
}
.project-footer {
  background-color: white;
  position: fixed;
  z-index: 2;
  bottom: 0;
  width: 100%;
}
.project-body {
  width: 960px;
  margin: 0 auto 50px auto;
  padding-top: 90px;
}
</style>
