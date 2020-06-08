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
              <template v-else-if="item.type == 'ASSET'">
                <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                  <div v-for="(itemAsset, index) in form[item.name + 'Asset']" :key="index">
                    <tag closable @close="removeAsset(itemAsset, item.name)">{{ itemAsset.name }}</tag>
                  </div>
                  <a-button @click="showAssetDialog(item)">选择</a-button>
                </a-form-model-item>
              </template>
              <template v-else-if="item.type == 'REFERENCE'">
                <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                  <div v-for="(itemReference, index) in form[item.name]" :key="index">
                    <tag closable @close="removeAsset(itemReference, item.name)">{{ itemReference.name }}</tag>
                  </div>
                  <a-button @click="showReferenceDialog(item)">选择</a-button>
                </a-form-model-item>
              </template>
            </template>
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
    <a-modal
      :maskClosable="false"
      :width="assetModal.width"
      :title="assetModal.title"
      :visible="assetModal.visible"
      @cancel="closeAssetDialog"
      :footer="null"
    >
      <asset-picker
        @selectChange="assetSelectChange"
        :form-name="assetModal.item.name"
        :is-multiple="assetModal.item.is_multiple"
      ></asset-picker>
      <div style="text-align: right;">
        <a-button @click="closeAssetDialog" class="margin-right-sm">关闭</a-button>
      </div>
    </a-modal>
    <a-modal
      :maskClosable="false"
      :width="referenceModal.width"
      :title="referenceModal.title"
      :visible="referenceModal.visible"
      @cancel="closeReferenceDialog"
      :footer="null"
    >
      <reference-picker
        @selectChange="referenceSelectChange"
        :form-name="referenceModal.item.name"
        :is-multiple="referenceModal.item.is_multiple"
        :custom-id="referenceModal.item.reference_custom_id"
      ></reference-picker>
      <div style="text-align: right;">
        <a-button @click="closeReferenceDialog" class="margin-right-sm">关闭</a-button>
      </div>
    </a-modal>
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
import AssetPicker from '@/views/asset/components/AssetPicker'
import { ReferencePicker } from '@/components'
import { Tag } from 'ant-design-vue'

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
    AreaUpload, WangEditor, AssetPicker, Tag, ReferencePicker
  },
  data() {
    return {
      form: {},
      fields: [],
      fieldNames: [],
      rules: {},
      assetModal: {
        title: '选择关联附件',
        visible: false,
        width: '80%',
        item: {}
      },
      referenceModal: {
        title: '选择关联表',
        visible: false,
        width: '80%',
        item: {}
      },
      formShow: true
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
          self.fields.forEach(item => {
            if (item.type == 'ASSET' || item.type == 'REFERENCE') {
              let assetItems = []
              if (item.is_multiple) {
                self.form[item.name + 'Asset'].forEach(assetItem => {
                  assetItems.push(assetItem.id)
                })
                data[item.name] = assetItems
              } else {
                data[item.name] = self.form[item.name + 'Asset'].length > 0 ? self.form[item.name + 'Asset'][0].id : ''
              }
            } else {
              data[item.name] = self.form[item.name]
            }
          })
          let apiName = 'userCreate'
          if (self.form.id) {
            apiName = 'userUpdate'
            data['id'] = self.form.id
          }
          apiName = apiName + self.custom.name
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
          self.formShow = false
          const updateData = self.data
          customs.forEach(element => {
            items.push(element)
            itemNames.push(element.name)
            if (element.is_required) {
              rules[element.name] = [{ required: true, message: '请输入' + element.zh_name, trigger: 'blur' }]
            }
            if (element.type == 'RICH_TEXT') {
              self.form[element.name] = ''
            }
            self.form[element.name] = updateData[element.name]
            if (element.type == 'ASSET' || element.type == 'REFERENCE') {
              let type = ''
              if (element.type == 'ASSET') {
                type = 'Asset'
              } else if (element.type == 'REFERENCE') {
                type = 'Reference'
              }
              let assetItems = []
              if (element.is_multiple) {
                assetItems = updateData[element.name + type]
              } else {
                if (updateData[element.name + type]) {
                  assetItems = [updateData[element.name + type]]
                }
              }
              self.form[element.name + type] = assetItems
            }
          })
          if (updateData.id) {
            self.form['id'] = updateData.id
          } else {
            self.form['id'] = undefined
          }
          self.rules = rules
          self.fields = items
          self.fieldNames = itemNames
          self.formShow = true
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    richValueChange(values) {
      let value = values[0]
      let name = values[1]
      this.form[name] = value
    },
    showAssetDialog(item) {
      this.assetModal.item = item
      this.assetModal.visible = true
    },
    closeAssetDialog() {
      this.assetModal.visible = false
    },
    assetSelectChange(value, name, is_multiple) {
      this.selectChange('asset', value, name, is_multiple)
    },
    removeAsset(item, name) {
      let data = []
      this.form[name + 'Asset'].forEach(formItem => {
        if (formItem.id != item.id) {
          data.push(formItem)
        }
      })
      this.form[name + 'Asset'] = data
    },
    showReferenceDialog(item) {
      this.referenceModal.item = item
      this.referenceModal.visible = true
    },
    closeReferenceDialog() {
      this.referenceModal.visible = false
    },
    selectChange(type, value, name, is_multiple) {
      if (is_multiple) {
        let data = []
        let isExist = false
        if (this.form[name + 'Asset'] && this.form[name + 'Asset'].length > 0) {
          this.form[name + 'Asset'].forEach(item => {
            if (item.id == value.id) {
              isExist = true
            }
          })
        }
        if (!isExist) {
          if (this.form[name + 'Asset'] && this.form[name + 'Asset'].length > 0) {
            this.form[name + 'Asset'].push(value)
          } else {
            this.form[name + 'Asset'] = [value]
          }
        }
      } else {
        this.form[name + 'Asset'] = [value]
        if (type == 'asset') {
          this.closeAssetDialog()
        } else {
          this.closeReferenceDialog()
        }
      }
    },
    referenceSelectChange(value, name, is_multiple) {
      this.selectChange('reference', value, name, is_multiple)
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
