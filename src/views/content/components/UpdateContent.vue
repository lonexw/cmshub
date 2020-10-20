<template>
  <a-layout class="layout">
    <a-layout style="background-color: white; margin-right: 240px">
      <a-layout-header class="header light" style="height: 50px; line-height: 50px;">
        <div class="flex align-center padding-lr-sm text-bold pointer text-black" @click="cancel">
          <a-icon class="margin-right-xs" type="left" /> {{ dataForm && dataForm.id ? '编辑' : '创建' }} {{ model }}
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="content-body padding-lr-sm">
          <a-form-model layout="vertical" :model="form" ref="createForm" :rules="rules" v-if="formShow">
            <template v-for="(item, index) in fields">
              <template v-if="item.type == 'SINGLE_TEXT'">
                <template v-if="item.is_mult_language == true && showEnglish == true">
                  {{item.zh_name}}
                  <a-form-model-item label="CN" :prop="item.name" :key="index">
                    <a-input v-model="form[item.name]" :placeholder="'请输入' + item.zh_name" @change="formValueChange" />
                  </a-form-model-item>
                  <a-form-model-item :label="checkCode" :prop="item.name" :key="index">
                    <a-input v-model="enForm[item.name]" :placeholder="'请输入' + item.zh_name" @change="enFormValueChange" />
                  </a-form-model-item>
                </template>
                <template v-else>
                  <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                    <a-input v-model="form[item.name]" :placeholder="'请输入' + item.zh_name" @change="formValueChange" />
                  </a-form-model-item>
                </template>
              </template>
              <template v-else-if="item.type == 'MULTI_TEXT'">
                <template v-if="item.is_mult_language == true && showEnglish == true">
                  {{item.zh_name}}
                  <a-form-model-item label="CN" :prop="item.name" :key="index">
                    <a-input v-model="form[item.name]" type="textarea" :placeholder="'请输入' + item.zh_name" />
                  </a-form-model-item>
                  <a-form-model-item :label="checkCode" :prop="item.name" :key="index">
                    <a-input v-model="enForm[item.name]" type="textarea" :placeholder="'请输入' + item.zh_name" />
                  </a-form-model-item>
                </template>
                <template v-else>
                  <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                    <a-input v-model="form[item.name]" type="textarea" :placeholder="'请输入' + item.zh_name" />
                  </a-form-model-item>
                </template>
              </template>
              <template v-else-if="item.type == 'RICH_TEXT'">
                <template v-if="item.is_mult_language == true && showEnglish == true">
                  {{item.zh_name}}
                  <a-form-model-item label="CN" :prop="item.name" :key="index">
                    <WangEditor v-model="form[item.name]" @change="richValueChange" :name="item.name"></WangEditor>
                  </a-form-model-item>
                  <a-form-model-item label="EN" :prop="item.name" :key="index">
                    <WangEditor v-model="enForm[item.name]" @change="richValueChange" :name="item.name"></WangEditor>
                  </a-form-model-item>
                </template>
                <template v-else>
                  <a-form-model-item :label="item.zh_name" :prop="item.name" :key="index">
                    <WangEditor v-model="form[item.name]" @change="richValueChange" :name="item.name"></WangEditor>
                  </a-form-model-item>
                </template>
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
                  <a-input v-model="form[item.name]" type="hidden" v-if="item.is_required" />
                  <div v-for="(itemReference, index) in form[item.name + 'Reference']" :key="index">
                    <tag closable @close="removeReference(itemReference, item.name)">{{ itemReference.title }}</tag>
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
        <div v-if="!(dataForm && dataForm.id)" class="text-sm text-grey margin-left-xs" style="font-style: italic;">
          保存后显示
        </div>
        <div v-else class="text-sm text-grey">
          <div class="flex justify-between"><span>创建</span><span>2020-04-09 18:17:54</span></div>
          <div class="flex justify-between"><span>更新</span><span>2020-04-09 18:17:54</span></div>
        </div>
      </div>
      <div class="margin-tb">
        <div class="text-df margin-bottom-xs">发布于</div>
        <div v-if="!(dataForm && dataForm.id)" class="text-sm text-grey margin-left-xs" style="font-style: italic;">
          尚未发布
        </div>
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
      <div class="text-df margin-tb">
        <div class="margin-bottom-xs">其它语言</div>
        <div class="text-sm text-grey margin-left-xs" style="font-style: italic;">
          <a-radio-group :options="customList" v-model="checkCode" @change="onChange" />
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
        v-if="assetModal.visible"
        @selectChange="assetSelectChange"
        :form-name="assetModal.item.name"
        :is-multiple="assetModal.item.is_multiple"
      ></asset-picker>
      <div style="text-align: right;">
        <a-button type="primary" @click="batchAdd" style="margin-right: 5px"> <a-icon type="plus" />上传 </a-button>
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
    <a-modal
      :maskClosable="false"
      :width="uploadModal.width"
      :title="uploadModal.title"
      :visible="uploadModal.visible"
      @cancel="closeUploadDialog"
      :footer="null"
    >
      <div>
        <a-layout style="background-color: white; margin-right: 240px">
          <a-layout-content>
            <div class="content-body padding-lr-sm">
              <a-form-model layout="vertical" :model="uploadForm" ref="form">
                <a-form-model-item label="" prop="url">
                  <batch-upload v-if="uploadModal.visible" :data="{ id: 1 }" @change="handleChange"></batch-upload>
                </a-form-model-item>
              </a-form-model>
            </div>
          </a-layout-content>
        </a-layout>
      </div>
      <div style="text-align: right;">
        <a-button type="primary" @click="handleUpload" :loading="submit_loading">创建</a-button>
        <a-button @click="closeUploadDialog" class="margin-right-sm">关闭</a-button>
      </div>
    </a-modal>
  </a-layout>
</template>

<script>
/* eslint-disable */
import { AreaUpload, WangEditor, BatchUpload, ReferencePicker } from '@/components'
import { userFields, userTranslateFields } from '@/graphql/field.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import gql from 'graphql-tag'
import AssetPicker from '@/views/asset/components/AssetPicker'
import { Tag } from 'ant-design-vue'
import { userCreateBatchAsset } from '@/graphql/asset.graphql'
import { userLanguages, userLanguageCode } from '@/graphql/language.graphql'

export default {
  name: 'UpdateContent',
  props: {
    custom: {}
  },
  props: {
    dataForm: {
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
    AreaUpload, WangEditor, AssetPicker, Tag, ReferencePicker, BatchUpload
  },
  data() {
    return {
      fileList: [],
      uploadForm: this.$form.createForm(this),
      submit_loading: false,
      checkCode: '',
      form: {},
      enForm: {},
      fields: [],
      translateFields: [],
      fieldNames: [],
      customList: [],
      showEnglish: false,
      rules: {
        title: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      assetModal: {
        title: '选择关联附件',
        visible: false,
        width: '80%',
        item: {}
      },
      uploadModal: {
          title: '上传',
          visible: false,
          width: '80%'
      },
      referenceModal: {
        title: '选择关联表',
        visible: false,
        width: '80%',
        item: {}
      },
      formShow: true,
      typeTexts: {
        ASSET: 'Asset',
        REFERENCE: 'Reference'
      }
    }
  },
  computed: {},
  mounted() {
     this.getFieldList()
     this.userTranslateFields()
  },
  methods: {
    goSchema() {
        this.$router.push({ name: 'Schema' })
    },
    handleChange(data) {
        this.fileList = data
    },
    getUserItemTranslate() {
      let self = this
      self.enForm = {}
      let apiName = 'user' + self.custom.name + 'ItemTranslate'
      const id = this.dataForm.id
      let fieldFormat = ''
        self.translateFields.forEach((item, index)=> {
            if (index == 0) {
                fieldFormat += `${item.name}`
            } else{
                fieldFormat += `,${item.name}`
            }
        })
        self.$apollo
          .query({
              query: gql`query ${apiName} ($id: Int!, $code: String) {
            ${apiName} (id: $id, code: $code) {
              ${fieldFormat}
              }
          }`,
              variables: {
                  id: id,
                  code: self.checkCode
              },
              fetchPolicy: 'no-cache',
              context: {
                  uri: api.projectUri + store.state.common.currentProject.id
              }
            })
          .then(data => {
               self.enForm = data.data[apiName]
               delete self.enForm.__typename
          })
          .catch(err => {
              this.$message.warning(formatGraphErr(err.message))
          })
    },
    handleUpload(e) {
        e.preventDefault()
        let self = this
        if (this.fileList.length === 0) {
            this.$message.warning('请上传文件')
            return
        }
        let data = []
        this.fileList.forEach(element => {
            data.push({
                name: element.name,
                url: element.url,
                type: element.mime,
                file_size: element.size,
                is_system: 'false'
            })
        })
        self.$apollo
            .mutate({
                mutation: userCreateBatchAsset,
                variables: {
                    data: data
                },
                fetchPolicy: 'no-cache',
                context: {
                    uri: api.projectUri + store.state.common.currentProject.id
                }
            })
            .then(() => {
                self.closeUploadDialog()
                self.fileList = []
            })
            .catch(err => {
                this.$message.warning(formatGraphErr(err.message))
            })
    },
    batchAdd() {
        this.showUploadDialog()
    },
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
              const assetItems = []
              if (item.is_multiple) {
                const value = self.form[item.name + self.typeTexts[item.type]]
                if (value && value.length > 0) {
                  self.form[item.name + self.typeTexts[item.type]].forEach(assetItem => {
                    assetItems.push(assetItem.id)
                  })
                }
                data[item.name] = assetItems
              } else {
                const value = self.form[item.name  + self.typeTexts[item.type]]
                data[item.name] = value && value.length > 0 ? value[0].id : undefined
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
          if (JSON.stringify(self.enForm) !== "{}") {
              data['translate'] = self.enForm
          } else {
              data['translate'] = ''
          }
          data['code'] = self.checkCode
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
            },
            paginator: {
              limit: 100
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
          const updateData = self.dataForm
          customs.forEach(element => {
            items.push(element)
            itemNames.push(element.name)
            if (element.is_required) {
              let messageText = '请输入'
              if (element.type == 'ASSET' || element.type == 'REFERENCE') {
                messageText = '请选择'
              }
              rules[element.name] = [{  type: 'string', required: true, message: messageText + element.zh_name, trigger: 'blur' }]
            }
            if (updateData && updateData.id) {
              if (element.type == 'RICH_TEXT') {
                self.form[element.name] = ''
              }
              self.form[element.name] = updateData[element.name]
              if (element.type == 'ASSET' || element.type == 'REFERENCE') {
                const type = self.typeTexts[element.type]
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
            }
          })
          if (updateData && updateData.id) {
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
    userTranslateFields() {
      let self = this
        self.$apollo
            .query({
            query: userTranslateFields,
            variables: {
                more: {
                    custom_id: self.custom.id
                },
                paginator: {
                    limit: 100
                }
            },
            fetchPolicy: 'no-cache'
        })
            .then(data => {
                let customs = data.data.userTranslateFields.items
                self.translateFields = customs
                self.getAllLanguages()
                self.getCheckCode()
            })
            .catch(err => {
                this.$message.warning(formatGraphErr(err.message))
            })
    },
    getAllLanguages() {
      let self = this
      self.$apollo
        .query({
            query: userLanguages,
            variables: {},
            fetchPolicy: 'no-cache'
        })
        .then(data => {
          const customList = data.data.userLanguages.items
          const items = []
          const checkItems = []
          customList.forEach(element => {
            items.push({
                value: element.code,
                label: element.language.name,
            })
            if (self.translateFields.length > 0 && self.dataForm.id) {
                self.showEnglish = true
            } else {
                self.showEnglish = false
            }
          })
          self.customList = items
        })
        .catch(err => {
            this.$message.warning(formatGraphErr(err.message))
        })
    },
    getCheckCode() {
      let self = this
      if (self.dataForm.id) {
        self.$apollo
          .query({
              query: userLanguageCode,
              variables: {id: this.dataForm.id},
              fetchPolicy: 'no-cache'
          })
          .then(data => {
              if (data.data.userLanguageCode) {
                  self.checkCode = data.data.userLanguageCode
                  self.getUserItemTranslate()
                  self.showEnglish = true
              } else {
                  self.showEnglish = false
              }
          })
          .catch(err => {
              this.$message.warning(formatGraphErr(err.message))
          })
      }
    },
    onChange(e) {
        console.log(e.target.value)
      if (e.target.value) {
          this.showEnglish = true
      }
      this.checkCode = e.target.value
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
      let dataIds = []
      this.form[name + 'Asset'].forEach(formItem => {
        if (formItem.id != item.id) {
          data.push(formItem)
          if (item.is_multiple) {
            dataIds.push(formItem.id)
          } else {
            dataIds = formItem.id
          }
        }
      })
      this.form[name + 'Asset'] = data
      this.form[name] = dataIds
    },
    removeReference(item, name) {
      let data = []
      let dataIds = []
      this.form[name + 'Reference'].forEach(formItem => {
        if (formItem.id != item.id) {
          data.push(formItem)
          if (item.is_multiple) {
            dataIds.push(formItem.id)
          } else {
            dataIds = formItem.id
          }
        }
      })
      this.form[name + 'Reference'] = data
      this.form[name] = dataIds
    },
    showReferenceDialog(item) {
      this.referenceModal.item = item
      this.referenceModal.visible = true
    },
    closeReferenceDialog() {
      this.referenceModal.visible = false
    },
    showUploadDialog() {
        this.fileList = []
        this.assetModal.visible = false
        this.uploadModal.visible = true
    },
    closeUploadDialog() {
        this.uploadModal.visible = false
        this.assetModal.visible = true
    },
    selectChange(type, value, name, is_multiple) {
      let typeName = ''
      if (type == 'asset') {
        typeName = 'Asset'
      } else {
        typeName = 'Reference'
      }
      if (is_multiple) {
        let data = []
        let isExist = false
        if (this.form[name + typeName] && this.form[name + typeName].length > 0) {
          this.form[name + typeName].forEach(item => {
            if (item.id == value.id) {
              isExist = true
            }
          })
        }
        if (!isExist) {
          if (this.form[name + typeName] && this.form[name + typeName].length > 0) {
            if (!this.form[name + typeName]) {
              this.form[name + typeName] = []
            }
            const assets = this.form[name + typeName]
            if (!assets) {
              assets = []
            }
            assets.push(value)
            this.form[name + typeName] = assets
          } else {
            this.form[name + typeName] = [value]
          }
          if (is_multiple) {
            const assets = this.form[name]
            if (!assets) {
              assets = []
            }
            assets.push(value.id)
            this.form[name] = assets
          } else {
            this.form[name] = value.id
          }
        }
        this.$refs.createForm.clearValidate()
      } else {
        this.form[name + typeName] = [value]
        if (is_multiple) {
          const assets = this.form[name]
          if (!assets) {
            assets = []
          }
          assets.push(value.id)
          this.form[name] = assets
        } else {
          this.form[name] = value.id
        }
        this.$refs.createForm.clearValidate()
        if (type == 'asset') {
          this.closeAssetDialog()
        } else {
          this.closeReferenceDialog()
        }
      }
    },
    referenceSelectChange(value, name, is_multiple) {
      this.selectChange('reference', value, name, is_multiple)
    },
    formValueChange() {
      this.form = Object.assign({}, this.form)
    },
    enFormValueChange() {
      this.enForm = Object.assign({}, this.enForm)
    },
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
.project-header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
}
.project-footer {
  background-color: white;
  position: fixed;
  z-index: 2;
  bottom: 0;
  width: 100%;
}
.project-body {
  width: 960px;
  margin: 0 auto 50px auto;
  padding-top: 90px;
  .project {
    position: relative;
    z-index: 1;
    transform: scale(1);
    top: 0;
    margin-left: 32px;
    margin-bottom: 32px;
    width: 200px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 48px 32px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgb(240, 242, 247);
    transition: all 0.3s ease 0s;
    .add-icon {
      font-size: 80px;
      color: #6663fd;
    }
    .icon {
      width: 80px;
      height: 80px;
      background-color: black;
      color: rgb(255, 255, 255);
      font-size: 32px;
      line-height: 80px;
      text-align: center;
      font-weight: 600;
      margin-left: auto;
      margin-right: auto;
      border-radius: 8px;
    }
  }

  .project:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 20px;
    transform: scale(1.01);
    top: -5px;
  }
}
</style>
