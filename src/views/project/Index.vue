<template>
  <div>
    <header class="project-header text-center text-xxxxl padding-xxs text-black">
      <logo />
    </header>
    <div class="project-body">
      <project-list v-if="!is_create" @create="create" @update="update"></project-list>
      <project-create v-else @cancel="cancelCreate" :form-data="formData"></project-create>
    </div>
    <footer class="solid-top padding-xxs project-footer">
      <a-popover placement="topLeft">
        <template slot="content">
          <div>
            <a-button type="link" @click="updatePwdVisible = true"><a-icon type="edit" />修改密码</a-button>
          </div>
          <div>
            <a-button type="link" @click="logout"><a-icon type="logout" />退出</a-button>
          </div>
        </template>
        <img src="~@/assets/logo.svg" width="40px" class="margin-left round pointer" />
      </a-popover>
    </footer>
    <a-modal v-model="updatePwdVisible" title="修改密码" @ok="updatePwdSubmit">
      <a-form-model :model="formPwd" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="原密码">
          <a-input v-model="formPwd.old_password" type="password" />
        </a-form-model-item>
        <a-form-model-item label="新密码">
          <a-input v-model="formPwd.password" type="password" />
        </a-form-model-item>
        <a-form-model-item label="确认密码">
          <a-input v-model="formPwd.password_confirmation" type="password" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { domTitle } from '@/utils/domUtil'
import Logo from '@/components/tools/Logo'
import ProjectList from './List'
import ProjectCreate from './Create'
import { mapActions } from 'vuex'
import { userLogout } from '@/graphql/login.graphql'
import { userUpdatePwd } from '@/graphql/user.graphql'
import { formatGraphErr } from '@/utils/util'

export default {
  components: {
    Logo,
    ProjectList,
    ProjectCreate
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      domTitle,
      is_create: false,
      updatePwdVisible: false,
      formData: {},
      formPwd: {}
    }
  },
  created() {},
  methods: {
    ...mapActions(['Logout']),
    create() {
      this.formData = {}
      this.is_create = true
    },
    update(item) {
      this.formData = item
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
            .finally(() => {
              self.Logout({}).finally(() => {
                setTimeout(() => {
                  window.location.reload()
                }, 16)
              })
            })
        }
      })
    },
    updatePwdSubmit() {
      let self = this
      self.$apollo
        .mutate({
          mutation: userUpdatePwd,
          variables: {
            data: self.formPwd
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.$message.success('保存成功')
          self.formPwd = {}
        }) 
        .catch(error => {
          this.$message.warning(formatGraphErr(error.message))
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
