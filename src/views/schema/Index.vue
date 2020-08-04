<template>
  <base-page title="模型管理">
    <template v-slot:sider>
      <div class="flex justify-between align-center">
        <bg-tag class="text-blue text-sm" @click.native="showCreate"><a-icon type="plus" /> 添加模型</bg-tag>
        <bg-tag class="text-blue text-sm" @click.native="showCategoryCreate"><a-icon type="plus" /> 添加分类</bg-tag>
      </div>
      <div ref="models" :class="(show_models ? '' : 'hidden') + ' margin-top-xs models'">
        <draggable :list="categories" ghost-class="ghost" @update="updateCategorySort" class="list-group">
          <a-menu v-for="category in categories" :key="category.id" :default-open-keys="openKeys" mode="inline">
            <a-sub-menu :key="category.id">
              <span slot="title"
                ><a-icon type="ordered-list"/>{{ category.title
                }}<a-icon type="edit" style="margin-left: 10px;" @click.stop="showCategory(category.id)"
              /></span>
              <a-menu-item v-for="item in category.customs" :key="item.id" @click="menuClick">
                {{ item.zh_name }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </draggable>
      </div>
    </template>
    <template v-slot:content>
      <div class="text-center" style="margin-top: 200px;" v-if="init">
        <h1 class="text-xxxl">开启项目</h1>
        <h1 class="text-xxxl">创建第一个 模型</h1>
        <a-button type="primary" size="large" @click="showCreate"><a-icon type="plus" />创建 模型</a-button>
      </div>
      <detail-model :visible="show_detail" :id="updateId"></detail-model>
      <update-model :visible="show_create" @cancel="cancelCreate($event)" :id="updateId"></update-model>
      <update-category
        :visible="show_category_create"
        @cancel="cancelCategoryCreate($event)"
        :id="updateCategoryId"
      ></update-category>
    </template>
  </base-page>
</template>

<script>
import { BasePage, BgTag } from '@/components'
import UpdateModel from './components/UpdateModel'
import UpdateCategory from './components/UpdateCategory'
import DetailModel from './components/DetailModel'
import { userCategoryList, userUpdateSequenceCategory } from '@/graphql/category.graphql'
import { formatGraphErr } from '@/utils/util'
import draggable from 'vuedraggable'

export default {
  components: {
    BasePage,
    BgTag,
    UpdateModel,
    UpdateCategory,
    draggable,
    DetailModel
  },
  data() {
    return {
      init: false,
      show_models: true,
      show_create: false,
      show_detail: false,
      show_category_create: false,
      updateId: undefined,
      updateCategoryId: undefined,
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
    toggleModels() {
      this.show_models = !this.show_models
      this.$refs.models.style.height = this.show_models ? this.models_height : '0px'
    },
    showCreate() {
      this.updateId = undefined
      this.show_create = true
    },
    showCategoryCreate() {
      this.updateCategoryId = undefined
      this.show_category_create = true
    },
    cancelCreate(flag) {
      this.show_create = false
      if (flag) {
        this.getCustomList()
      }
    },
    cancelCategoryCreate(flag) {
      this.show_category_create = false
      if (flag) {
        this.getCustomList()
      }
    },
    menuClick(item) {
      let self = this
      self.updateId = parseInt(item.key)
      // self.show_create = true
      self.show_detail = true
    },
    showCategory(id) {
      let self = this
      self.updateCategoryId = parseInt(id)
      self.show_category_create = true
    },
    updateCategorySort() {
      const items = []
      this.categories.forEach((element, index) => {
        items.push({
          id: element.id,
          sequence: index
        })
      })
      this.$apollo
        .mutate({
          mutation: userUpdateSequenceCategory,
          variables: {
            data: items
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.getCustomList()
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
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
    }
  }
}
</script>
<style lang="less" scoped>
.models {
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  height: calc(~'100vh - 130px');
  overflow-y: auto;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
