<template>
  <div class="main">
    <a-card title="接口信息">
      <div @click.prevent="copyDocumentUrl">接口文档地址：<a-input v-model="form.document_url" disabled /></div>
      <div @click.prevent="copyApiUrl">接口对接地址：<a-input v-model="form.api_url" disabled /></div>
    </a-card>
    <a-card title="token管理" style="margin-top: 20px;">
      <a-button type="primary" @click="createToken">
        创建token
      </a-button>
      <a-table
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="data"
        :loading="loading"
        :pagination="false"
        :locale="{ emptyText: '暂无数据' }"
        :scroll="columns.length > 5 ? { x: 2000 } : { x: 100 }"
      >
        <template slot="scopes" slot-scope="scopes">
          <span v-if="scopes.includes('OPEN')">
            开放
          </span>
          <span v-else>
            <span v-if="scopes.includes('QUERY')">
              查询
            </span>
            <span v-if="scopes.includes('MUTATION')">
              增删改
            </span>
          </span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="edit(record)">编辑</a> |
          <a href="javascript:;" @click="remove(record)">删除</a>
        </template>
      </a-table>
    </a-card>
    <a-modal
      v-model="tokenFormVisible"
      :title="tokenForm && tokenForm.id ? '编辑token' : '创建token'"
      @ok="submitToken"
    >
      <a-form-model :model="tokenForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="token">
          <a-input v-model="tokenForm.token" />
          <a-button type="primary" @click="randToken">
            生成token
          </a-button>
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="tokenForm.description" />
        </a-form-model-item>
        <a-form-model-item label="对应权限">
          <a-select mode="multiple" placeholder="请选择权限" v-model="tokenForm.scopes">
            <a-select-option v-for="(item, index) in ['QUERY', 'MUTATION', 'OPEN']" :key="index" :value="item">
              <span v-if="item === 'QUERY'">查询</span>
              <span v-else-if="item === 'MUTATION'">增删改</span>
              <span v-else-if="item === 'OPEN'">开放</span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="对应模型">
          <div :style="{ borderBottom: '1px solid #E9E9E9' }">
            <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
              全选/取消
            </a-checkbox>
          </div>
          <a-checkbox-group v-model="checkedList" :options="customList" @change="onChange" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userTokens, userCreateToken, userUpdateToken, userDeleteToken } from '@/graphql/token.graphql'
import { userCustoms } from '@/graphql/custom.graphql'
import { formatGraphErr } from '@/utils/util'

export default {
  components: {},
  data() {
    return {
      form: {},
      tokenFormVisible: false,
      tokenForm: {},
      columns: [
        {
          title: 'token',
          dataIndex: 'token'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '权限',
          dataIndex: 'scopes',
          scopedSlots: { customRender: 'scopes' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      customList: [],
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  computed: {
    ...mapState({
      project: state => state.common.currentProject
    })
  },
  mounted() {
    this.form = {
      document_url: process.env.VUE_APP_API_URL + 'graphql-playground',
      api_url: process.env.VUE_APP_API_URL + 'graphql?Project-Id=' + this.project.id
    }
    this.getList()
    this.userCustoms()
  },
  methods: {
    copyApiUrl() {
      this.copy(this.form.api_url)
    },
    copyDocumentUrl() {
      this.copy(this.form.document_url)
    },
    copy(value) {
      var _input = document.createElement('input')
      _input.value = value
      document.body.appendChild(_input)
      _input.select()
      document.execCommand('Copy')
      this.$message.success('复制成功')
      document.body.removeChild(_input)
    },
    userCustoms() {
      let self = this
      self.$apollo
        .query({
          query: userCustoms,
          variables: {
            paginator: {
              limit: 100
            }
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          const customList = data.data.userCustoms.items
          const items = []
          customList.forEach(element => {
            items.push({
              value: element.id,
              label: element.zh_name
            })
          })
          self.customList = items
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.customList.length
      this.checkAll = checkedList.length === this.customList.length
    },
    onCheckAllChange(e) {
      const self = this
      const items = []
      if (e.target.checked) {
        self.customList.forEach(element => {
          items.push(element.value)
        })
      }
      self.checkedList = items
      self.indeterminate = false
      self.checkAll = e.target.checked
    },
    getList() {
      let self = this
      self.$apollo
        .query({
          query: userTokens,
          variables: {},
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          self.data = data.data.userTokens.items
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    createToken() {
      this.tokenForm = {}
      this.checkedList = []
      this.tokenFormVisible = true
    },
    edit(item) {
      this.tokenForm = Object.assign({}, item)
      const items = []
      item.custom_ids.forEach(element => {
        items.push('' + element)
      })
      this.checkedList = items
      this.tokenFormVisible = true
    },
    randToken() {
      const token = new Date().getTime()
      this.tokenForm.token = token
      this.tokenForm = Object.assign({}, this.tokenForm)
    },
    submitToken() {
      let self = this
      let params = {}
      if (self.tokenForm && self.tokenForm.id) {
        params.id = self.tokenForm.id
      }
      params.custom_ids = self.checkedList
      params.token = self.tokenForm.token
      params.description = self.tokenForm.description
      params.scopes = self.tokenForm.scopes
      self.$apollo
        .mutate({
          mutation: self.tokenForm && self.tokenForm.id ? userUpdateToken : userCreateToken,
          variables: {
            data: params
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.$message.success('保存成功')
          self.tokenForm = {}
          self.tokenFormVisible = false
          self.getList()
        })
        .catch(error => {
          this.$message.warning(formatGraphErr(error.message))
        })
    },
    remove(item) {
      let self = this
      self.$apollo
        .mutate({
          mutation: userDeleteToken,
          variables: {
            id: item.id
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.$message.success('删除成功')
          self.tokenForm = {}
        })
        .catch(error => {
          this.$message.warning(formatGraphErr(error.message))
        })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  padding-top: 50px;
}
</style>
