<template>
  <base-page title="内容管理">
    <template v-slot:sider>
      <div class="models">
        <a-menu v-for="category in categories" :key="category.id" :default-open-keys="openKeys" mode="inline">
          <a-sub-menu :key="category.id">
            <span slot="title">{{ category.title }}</span>
            <a-menu-item v-for="item in category.customs" :key="item.id" @click="menuClick">
              {{ item.zh_name }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
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
import { userCategoryList } from '@/graphql/category.graphql'
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
      models_height: '0px',
      categories: [],
      openKeys: []
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
          query: userCategoryList,
          variables: {},
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          self.categories = data.data.userCategories.items
          const keys = []
          self.categories.forEach(element => {
            keys.push(element.id)
          })
          self.openKeys = keys
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
  height: calc(~'100vh - 100px');
  overflow-y: auto;
}
</style>
