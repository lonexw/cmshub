<template>
  <div class="main">
    <a-form class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        message="账户或密码错误（admin/ant.design )"
      />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '请输入帐户名' }],
              validateTrigger: 'change'
            }
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="submit_loading"
          :disabled="submit_loading"
          >确定</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { userLogin } from '@/graphql/login.graphql'
import { formatGraphErr } from '@/utils/util'
import { mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      isLoginError: false,
      form: this.$form.createForm(this),
      submit_loading: false
    }
  },
  created() {},
  methods: {
    ...mapActions(['Login']),
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.form.validateFields((err, values) => {
        if (err) {
          this.$message.warning('必填项未填写完整')
          return
        }
        self.submit_loading = true
        self.$apollo
          .query({
            query: userLogin,
            variables: {
              email: values.username,
              password: values.password
            }
          })
          .then(data => {
            self
              .Login(data.data)
              .then(() => {
                self.$router.push({ path: '/project' })
              })
              .catch(err => {
                this.$message.warning(formatGraphErr(err.message))
              })
              .finally(() => {
                self.submit_loading = false
              })
          })
          .catch(err => {
            this.$message.warning(formatGraphErr(err.message))
            self.submit_loading = false
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
