<template>
  <a-layout class="layout">
    <a-layout style="background-color: white; margin-right: 240px">
      <a-layout-header class="header light" style="height: 50px; line-height: 50px;">
        <div class="flex align-center padding-lr-sm text-bold pointer text-black" @click="cancel">
          <a-icon class="margin-right-xs" type="left" /> 创建 {{ model }}
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="content-body padding-lr-sm">
          <a-form-model layout="vertical" :model="form" ref="createForm" :rules="rules">
            <template v-for="(item, index) in fields">
              <template v-if="item.type == 'SINGLE_TEXT'">
                <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                  <a-input v-model="form[item.name]" :placeholder="'请输入' + item.zh_name" />
                </a-form-model-item>
              </template>
              <template v-else-if="item.type == 'MULTI_TEXT'">
                <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                  <a-input v-model="form[item.name]" type="textarea" :placeholder="'请输入' + item.zh_name" />
                </a-form-model-item>
              </template>
              <template v-else-if="item.type == 'RICH_TEXT'">
                <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                  <WangEditor v-model="form[item.name]" @change="richValueChange" :name="item.name"></WangEditor>
                </a-form-model-item>
              </template>
            </template>
            <!-- <a-form-model-item label="上传" prop="url">
              <area-upload :data="{ id: 1 }"></area-upload>
            </a-form-model-item>
            <a-form-model-item label="API ID" prop="name">
              <div class="text-sm text-gray margin-bottom-xs">
                用于通过 API 访问此模型的 ID（字母、数字、下划线，字母开头）
              </div>
              <a-input v-model="form.name" placeholder="请输入 API ID" />
            </a-form-model-item>
            <a-form-model-item label="API ID 复数形式" prop="plural_name">
              <div class="text-sm text-gray margin-bottom-xs">
                API ID 复数形式（字母、数字、下划线，字母开头）
              </div>
              <a-input v-model="form.name" placeholder="API ID 复数形式" />
            </a-form-model-item>
            <a-form-model-item label="描述" prop="description">
              <a-input v-model="form.description" type="textarea" placeholder="请输入描述" />
            </a-form-model-item> -->
          </a-form-model>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider
      class="right-sider sider light padding-xs"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', right: 0, backgroundColor: 'rgb(250, 250, 252)' }"
    >
      <div>
        <a-button type="primary" class="margin-right-xs" @click="submit">保存</a-button>
        <a-button type="danger" @click="submit">保存并发布</a-button>
      </div>
      <div class="text-df margin-tb">
        <div class="margin-bottom-xs">信息</div>
        <div v-if="!data.id" class="text-sm text-grey margin-left-xs" style="font-style: italic;">保存后显示</div>
        <div v-else class="text-sm text-grey">
          <div class="flex justify-between"><span>创建</span><span>2020-04-09 18:17:54</span></div>
          <div class="flex justify-between"><span>更新</span><span>2020-04-09 18:17:54</span></div>
        </div>
      </div>
      <div class="margin-tb">
        <div class="text-df margin-bottom-xs">发布于</div>
        <div v-if="!data.id" class="text-sm text-grey margin-left-xs" style="font-style: italic;">尚未发布</div>
        <div
          v-else
          class="flex justify-between align-center padding-xs solid line-grey shadow radius"
          style="background-color: white;"
        >
          <span class="text-sm">2020-04-09 18:25:11</span>
          <a-tooltip placement="bottomRight">
            <template slot="title">
              <span>取消发布</span>
            </template>
            <a-icon type="delete" theme="filled" style="color: red;" class="pointer" />
          </a-tooltip>
        </div>
      </div>
    </a-layout-sider>
  </a-layout>
</template>

<script>
/* eslint-disable */
import { AreaUpload, WangEditor } from '@/components'
import { userFields } from '@/graphql/field.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import gql from 'graphql-tag'

export default {
  name: 'UpdateContent',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    custom: {},
    model: {
      type: String,
      required: true
    }
  },
  components: {
    AreaUpload, WangEditor
  },
  data() {
    return {
      form: {},
      fields: [],
      fieldNames: [],
      rules: {}
    }
  },
  computed: {},
  mounted() {
    this.getFieldList()
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      let self = this
      this.$refs.createForm.validate(valid => {
        if (valid) {
          let data = {}
          console.log(self.form)
          self.fields.forEach(item => {
            data[item.name] = self.form[item.name]
          })
          console.log(data)
          let apiName = 'userCreate' + self.custom.name
          self.$apollo
            .mutate({
              mutation: gql`mutation ${apiName} ($data: ${self.custom.name}Input!) { 
                ${apiName} (data: $data) {
                  ${self.fieldNames.join(',')}
                }
              }`,
              variables: {
                data: data
              },
              fetchPolicy: 'no-cache',
              context: {
                uri: api.projectUri + store.state.common.currentProject.id
              }
            })
            .then(() => {
              this.$emit('cancel')
            })
            .catch(err => {
              this.$message.warning(formatGraphErr(err.message))
            })
        } else {
          return false
        }
      })
    },
    getFieldList() {
      let self = this
      self.$apollo
        .query({
          query: userFields,
          variables: {
            more: {
              custom_id: self.custom.id
            }
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          let customs = data.data.userFields.items
          let items = []
          let itemNames = []
          let rules = {}
          customs.forEach(element => {
            items.push(element)
            itemNames.push(element.name)
            if (element.is_required) {
              rules[element.name] = [{ required: true, message: '请输入' + element.zh_name, trigger: 'blur' }]
            }
          })
          self.rules = rules
          self.fields = items
          self.fieldNames = itemNames
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    richValueChange(values) {
      let value = values[0]
      let name = values[1]
      this.form[name] = value
    }
  }
}
</script>
<style lang="less" scoped>
.content-body {
  box-sizing: border-box;
  min-width: 0px;
  max-width: 720px;
  margin: 30px auto;
}
</style>
