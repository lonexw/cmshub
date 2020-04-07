<template>
  <a-layout class="layout">
    <a-layout-sider class="sider light">
      <div class="flex flex-direction align-center justify-between" style="height: 100%;">
        <div>
          <img src="~@/assets/logo.svg" width="45px" class="margin-bottom-sm pointer" @click="goProject" />
          <div class="icon margin-bottom pointer" @click="goProject">小</div>
          <a-tooltip placement="right" class="margin-bottom-sm">
            <template slot="title">
              <span>Schema 管理</span>
            </template>
            <div class="pointer text-xxl text-blue"><a-icon type="profile" /></div>
          </a-tooltip>
          <a-tooltip placement="right" class="margin-bottom-sm">
            <template slot="title">
              <span>内容管理</span>
            </template>
            <div class="pointer text-xxl"><a-icon type="edit" /></div>
          </a-tooltip>
          <a-tooltip placement="right" class="margin-bottom-sm">
            <template slot="title">
              <span>资源管理</span>
            </template>
            <div class="pointer text-xxl"><a-icon type="link" /></div>
          </a-tooltip>
        </div>
        <div>
          <a-popover placement="rightBottom">
            <template slot="content">
              <a-button type="link" @click="logout"><a-icon type="logout" />退出</a-button>
            </template>
            <img src="~@/assets/logo.svg" width="40px" class="round pointer" />
          </a-popover>
        </div>
      </div>
    </a-layout-sider>
    <a-layout style="background-color: white;">
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BasicLayout',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(['Logout']),
    goProject() {
      this.$router.push({ name: 'Project' })
    },
    logout() {
      this.Logout({})
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 16)
        })
        .catch(err => {
          this.$message.error({
            title: '错误',
            description: err.message
          })
        })
    }
  }
}
</script>

<style lang="less">
.sider {
  box-sizing: border-box;
  text-align: center;
  padding: 10px 0;
  width: 60px !important;
  min-width: inherit !important;
  max-width: inherit !important;
  flex: 0 0 60px !important;
  border-right: 1px solid rgb(240, 242, 247);
}

.icon {
  width: 35px;
  height: 35px;
  background-color: black;
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 35px;
  text-align: center;
  font-weight: 600;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
}
</style>
