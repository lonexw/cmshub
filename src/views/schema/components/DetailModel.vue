<template>
  <a-layout class="layout">
    <a-layout style="background-color: white; margin-right: 240px">
      <a-layout-content>
        <div class="model-body padding-lr-sm">
          <header class="flex justify-between margin-bottom-xs">
            <div class="flex align-end">
              <span class="zh-name">{{ form.zh_name }}</span>
              <span class="name">#{{ form.name }}</span>
              <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  <bg-tag><a-icon class="options" type="ellipsis"/></bg-tag>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;"><a-icon type="edit" class="margin-right-xs" />编辑 模型</a>
                  </a-menu-item>
                  <!-- <a-menu-item>
                    <a href="javascript:;"><a-icon type="delete" class="margin-right-xs" />删除 模型</a>
                  </a-menu-item> -->
                </a-menu>
              </a-dropdown>
            </div>
            <bg-tag>
              <div class="text-blue pointer" @click="toContent"><a-icon type="form" class="margin-right-xs" />添加内容</div>
            </bg-tag>
          </header>
          <div class="text-sm text-grey margin-bottom-xs">{{ form.description }}</div>
          <!-- <div class="margin-bottom-xs">
            <a-switch size="small" class="margin-right-xs" />
            <span class="text-sm">显示系统字段</span>
          </div> -->
          <a-empty style="margin-top: 150px;" description="点击右侧 新增字段" />
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider
      class="right-sider sider light"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', right: 0 }"
    >
      <fields></fields>
    </a-layout-sider>
  </a-layout>
</template>

<script>
import { userCustom } from '@/graphql/custom.graphql'
import { BgTag } from '@/components'
import Fields from './Fields'
import { formatGraphErr } from '@/utils/util'

export default {
  name: 'DetailModel',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      default: 0
    }
  },
  watch: {
    id(newVal) {
      this.form = {}
      if (newVal) {
        this.getCustom()
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getCustom()
    }
  },
  components: {
    BgTag,
    Fields
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    cancel() {},
    submit() {},
    toContent() {
      this.$router.push({ name: 'Content' })
    },
    getCustom() {
      let self = this
      self.$apollo
        .query({
          query: userCustom,
          variables: {
            id: self.id
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          const custom = data.data.userCustom
          self.form = {
            id: custom.id,
            name: custom.name,
            zh_name: custom.zh_name,
            description: custom.description,
            plural_name: custom.plural_name,
            category_id: custom.category_id + ''
          }
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    }
  }
}
</script>
<style lang="less" scoped>
.layout .detail-model-sider {
  width: 240px !important;
  min-width: 240px !important;
  max-width: 240px !important;
  text-align: left;
  border-left: 1px solid #f0f2f7;
  border-right: 0 !important;
}

.model-body {
  box-sizing: border-box;
  min-width: 0px;
  max-width: 720px;
  margin: 16px auto;
  header {
    .zh-name {
      font-size: 20px;
      margin-right: 10px;
    }
    .name {
      font-size: 16px;
      color: var(--grey);
      margin-right: 10px;
    }
    .options {
      font-size: 28px;
      color: var(--blue);
    }
  }
}
.ant-popover-inner-content {
  padding: 0 !important;
}
</style>
