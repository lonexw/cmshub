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
          placeholder="账户: admin"
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
          placeholder="密码: ant.design"
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
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Vue from 'vue'

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
    handleSubmit(e) {
      e.preventDefault()
      Vue.ls.set(ACCESS_TOKEN, 123, 7 * 24 * 60 * 60 * 1000)
      this.$router.push({ path: '/project' })
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
