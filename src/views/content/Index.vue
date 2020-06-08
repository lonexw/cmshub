<template>
  <base-page title="内容">
    <template v-slot:sider>
      <a-menu>
        <a-menu-item v-for="(item, index) in customs" :key="index" @click="menuClick">
          {{ item.zh_name }}
        </a-menu-item>
      </a-menu>
    </template>
    <template v-slot:content>
      <contents v-if="show_list" @update="update" :custom="selectCustom"></contents>
      <update-content
        :data-form="content"
        :custom="selectCustom"
        model="Admin"
        v-if="show_update"
        @cancel="cancelUpdate"
      ></update-content>
    </template>
  </base-page>
</template>

<script>
import { BasePage } from '@/components'
import Contents from './components/Contents'
import UpdateContent from './components/UpdateContent'
import { userCustoms } from '@/graphql/custom.graphql'
import { formatGraphErr } from '@/utils/util'

export default {
  components: {
    UpdateContent,
    Contents,
    BasePage
  },
  data() {
    return {
      content: {
        id: 1
      },
      show_list: false,
      selectedTags: [],
      customs: [],
      selectCustom: null,
      show_update: false,
      show_models: true,
      models_height: '0px'
    }
  },
  computed: {
    toggleDirection: function() {
      return this.show_models ? 'down' : 'right'
    }
  },
  mounted() {
    this.getCustomList()
  },
  methods: {
    getCustomList() {
      let self = this
      self.$apollo
        .query({
          query: userCustoms,
          variables: {
            paginator: {
              limit: 50
            }
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          let customs = data.data.userCustoms.items
          let items = []
          customs.forEach(element => {
            items.push(
              Object.assign(element, {
                active: false
              })
            )
          })
          self.customs = items
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    menuClick(item) {
      this.selectCustom = null
      this.show_list = false
      this.show_update = false
      let self = this
      setTimeout(function() {
        self.selectCustom = self.customs[item.key]
        self.show_list = true
      }, 100)
    },
    cancelUpdate() {
      this.show_update = false
      this.show_list = true
    },
    update(item) {
      this.show_list = false
      if (item) {
        this.content = item || {}
      } else {
        this.content = undefined
      }
      let self = this
      setTimeout(function() {
        self.show_update = true
      }, 100)
    }
  }
}
</script>
<style lang="less" scoped>
.models {
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}
.ant-menu {
  height: calc(~'100vh - 100px');
  overflow-y: auto;
}
</style>
