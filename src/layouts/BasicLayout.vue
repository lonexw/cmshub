<template>
  <a-layout class="layout">
    <a-layout-sider class="basic-sider sider light">
      <div class="flex flex-direction align-center justify-between" style="height: 100%;">
        <div>
          <img src="~@/assets/logo.svg" width="45px" class="margin-bottom-sm pointer" @click="goProject" />
          <div
            class="text-icon margin-bottom pointer"
            @click="goProject"
            v-if="project && !project.url && project.url != ''"
          >
            {{ project.name }}
          </div>
          <div v-else @click="goProject">
            <a-avatar :src="project.url" class="text-icon margin-bottom pointer" />
          </div>
          <a-tooltip placement="right" class="margin-bottom-sm">
            <template slot="title">
              <span>模型管理</span>
            </template>
            <div :class="($route.name === 'Schema' ? 'text-blue ' : '') + 'pointer text-xxl'" @click="goSchema">
              <a-icon type="profile" />
            </div>
          </a-tooltip>
          <a-tooltip placement="right" class="margin-bottom-sm">
            <template slot="title">
              <span>内容管理</span>
            </template>
            <div :class="($route.name === 'Content' ? 'text-blue ' : '') + 'pointer text-xxl'" @click="goContent">
              <a-icon type="edit" />
            </div>
          </a-tooltip>
          <a-tooltip placement="right" class="margin-bottom-sm">
            <template slot="title">
              <span>资源管理</span>
            </template>
            <div :class="($route.name === 'Asset' ? 'text-blue ' : '') + 'pointer text-xxl'" @click="goAsset">
              <a-icon type="link" />
            </div>
          </a-tooltip>
        </div>
        <div>
          <a-popover placement="rightBottom">
            <template slot="content">
              <div>
                <a-button type="link" @click="goSetting"><a-icon type="setting" />设置</a-button>
              </div>
              <div>
                <a-button type="link" @click="logout"><a-icon type="logout" />退出</a-button>
              </div>
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
import { userLogout } from '@/graphql/login.graphql'
import { mapState } from 'vuex'

export default {
  name: 'BasicLayout',
  components: {},
  data() {
    return {
      page: 'Schema'
    }
  },
  computed: {
    ...mapState({
      project: state => state.common.currentProject
    })
  },
  watch: {},
  created() {},
  mounted() {
    this.page = this.$route.name
  },
  methods: {
    ...mapActions(['Logout']),
    goSetting() {
      this.$router.push({ name: 'Setting' })
    },
    goSchema() {
      this.$router.push({ name: 'Schema' })
    },
    goContent() {
      this.$router.push({ name: 'Content' })
    },
    goAsset() {
      this.$router.push({ name: 'Asset' })
    },
    goProject() {
      this.$router.push({ name: 'Project' })
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
    }
  }
}
</script>

<style lang="less">
.basic-sider {
  box-sizing: border-box;
  text-align: center;
  padding: 10px 0;
  width: 60px !important;
  min-width: inherit !important;
  max-width: inherit !important;
  flex: 0 0 60px !important;

  .text-icon {
    background-color: black;
    color: rgb(255, 255, 255);
    margin-left: auto;
    margin-right: auto;
  }
}
.sider {
  border-right: 1px solid rgb(240, 242, 247);
}
</style>
