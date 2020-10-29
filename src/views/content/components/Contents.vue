<template>
  <div class="relative">
    <header class="padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey">
      <bg-tag :active="true">{{ custom ? custom.zh_name + '列表' : '' }}</bg-tag>
      <a-button type="primary" @click="add()"> <a-icon type="plus" />新增 </a-button>
    </header>
    <div class="flex align-center padding-lr-sm solid-bottom line-grey" style="height: 36px;">
      <span class="margin-right-sm">{{ select_num }} 选中</span>
      <div class="flex" v-show="select_num > 0" @click="batchDelete">
        <bg-tag class="text-red"> <a-icon type="delete" class="margin-right-xxs" /> 删除 </bg-tag>
        <!-- <bg-tag class="text-green"> <a-icon type="up-square" class="margin-right-xxs" /> 发布 </bg-tag>
        <bg-tag class="text-yellow"> <a-icon type="close-square" class="margin-right-xxs" /> 不发布 </bg-tag> -->
      </div>
    </div>
    <div class="flex justify-center margin-top-sm">
      <a-pagination
        showSizeChanger
        showQuickJumper
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :pageSize="search.paginator.limit"
        :defaultCurrent="1"
        :pageSizeOptions="['10', '30', '50', '100']"
        @change="change"
        @showSizeChange="showSizeChange"
      />
    </div>
    <a-table
      size="middle"
      rowKey="id"
      :rowSelection="rowSelection"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      :locale="{ emptyText: '暂无数据' }"
      :scroll="columns.length > 5 ? { x: 2000 } : { x: 100 }"
    >
    </a-table>
    <a-modal
      :maskClosable="false"
      :width="referenceModal.width"
      :title="referenceModal.title"
      :visible="referenceModal.visible"
      @cancel="closeReferenceDialog"
      :footer="null"
    >
      <ContentShow
        :custom-id="referenceModal.field.reference_custom_id"
        :ids="referenceModal.ids"
        v-if="referenceModal.visible"
      ></ContentShow>
      <div style="text-align: right;">
        <a-button @click="closeReferenceDialog" class="margin-right-sm">关闭</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { BgTag, ContentShow } from '@/components'
import { userFields } from '@/graphql/field.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import gql from 'graphql-tag'
/* eslint-disable */
import PreviewImage from '@/components/PreviewImage'

export default {
  name: 'Contents',
  props: {
    custom: {}
  },
  components: {
    BgTag, PreviewImage, ContentShow
  },
  data() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.select_num = selectedRows.length
        let ids = []
        selectedRows.forEach((element) => {
          ids.push(element.id)
        })
        this.ids = ids
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    }
    return {
      rowSelection,
      columns: [],
      data: [],
      fields: [],
      fieldNames: [],
      select_num: 0,
      ids: [],
      show_create: false,
      total: 0,
      search: {
        paginator: {
          page: 1,
          limit: 30
        }
      },
      referenceModal: {
        title: '关联信息',
        visible: false,
        width: '80%',
        item: {},
        field: {},
        data: [],
        fields: [],
        fieldNames: [],
        ids: []
      },
      loading: false
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.getFieldList()
  },
  methods: {
    add(item) {
      this.$emit('update', item)
    },
    batchDelete() {
      let self = this
      let apiName = 'userDeleteBatch' + self.custom.name
      this.$confirm({
        title: '确认删除选中数据吗？',
        confirmLoading: true,
        onOk() {
          self.$apollo
            .mutate({
              mutation: gql`mutation ${apiName} ($ids: [Int]!) { 
                ${apiName} (ids: $ids)
              }`,
              variables: {
                ids: self.ids
              },
              fetchPolicy: 'no-cache',
              context: {
                uri: api.projectUri + store.state.common.currentProject.id
              }
            })
            .then(() => {
              self.getContentList()
              self.select_num = 0
              self.ids = []
            })
            .catch(err => {
              self.$message.warning(formatGraphErr(err.message))
            })
        }
      })
    },
    deleteItem(item) {
      let self = this
      let apiName = 'userDelete' + self.custom.name
      this.$confirm({
        title: '确认删除吗？',
        confirmLoading: true,
        onOk() {
          self.$apollo
            .mutate({
              mutation: gql`mutation ${apiName} ($id: Int!) { 
                ${apiName} (id: $id)
              }`,
              variables: {
                id: item.id
              },
              fetchPolicy: 'no-cache',
              context: {
                uri: api.projectUri + store.state.common.currentProject.id
              }
            })
            .then(() => {
              self.getContentList()
            })
            .catch(err => {
              self.$message.warning(formatGraphErr(err.message))
            })
        }
      })
    },
    showSizeChange(current, size) {
      this.search.paginator.limit = size
      this.getContentList()
    },
    change(page, pageSize) {
      this.search.paginator.page = page
      this.search.paginator.limit = pageSize
      this.getContentList()
    },
    getFieldList() {
      this.data = []
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
          let columns = []
          customs.forEach(element => {
            if (element.name != '__typename') {
              items.push(element)
              if (element.type == 'ASSET') {
                columns.push({
                  title: element.zh_name,
                  dataIndex: element.name,
                  customRender: (text, record) => {
                    if (element.is_multiple) {
                      let children = []
                      record[element.name + 'Asset'].forEach(assetItem => {
                        if (assetItem) {
                          let child = self.$createElement("div", {
                            domProps: {
                              innerHTML: '<img src=' + assetItem.url + ' height="30px" />'
                            }
                          })
                          children.push(child)
                        }
                      })
                      return children
                    } else {
                      let data = record[element.name + 'Asset']
                      if (data) {
                        let url = record[element.name + 'Asset'].url
                        if (record[element.name + 'Asset'].type.indexOf('image') > -1) {
                          return <preview-image src={url} height="30px"></preview-image>
                        }
                        return url
                      }
                      return ''
                    }
                  }
                })
              } else if (element.type == 'REFERENCE') {
                columns.push({
                  title: element.zh_name,
                  dataIndex: element.name,
                  customRender: (text, record) => {
                    let child = self.$createElement("a", {
                      domProps: {
                        innerHTML: text
                      },
                      on: {
                        click: function () {
                          self.showReferenceDialog(record, element, text)
                        }
                      }
                    })
                    return child
                  }
                })
              } else if (element.type == 'SINGLE_TEXT') {
                  columns.push({
                      title: element.zh_name,
                      dataIndex: element.name,
                      ellipsis: true
                  })
              }
              itemNames.push(element.name)
            }
          })
          columns.push({
            title: '添加时间',
            dataIndex: 'created_at'
          })
          itemNames.push('created_at')
          columns.push({
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            customRender: (text, record) => {
              let children = []
              let child = self.$createElement("a", {
                domProps: {
                  innerHTML: '编辑'
                },
                on: {
                  click: function () {
                    self.add(record)
                  }
                }
              })
              let childSpan = self.$createElement("span", {
                domProps: {
                  innerHTML: '|',
                  width: '10px'
                }
              })
              let childDelete = self.$createElement("a", {
                domProps: {
                  innerHTML: '删除'
                },
                on: {
                  click: function () {
                    self.deleteItem(record)
                  }
                }
              })
              children.push(child)
              children.push(childSpan)
              children.push(childDelete)
              return children
            }
          })
          self.fields = items
          self.columns = columns
          self.fieldNames = itemNames
          this.getContentList()
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    getContentList() {
      this.data = []
      let self = this
      self.loading = true
      let apiName = 'user' + self.custom.plural_name
      let fieldFormat = 'id, created_at'
      self.fields.forEach(item => {
        fieldFormat += `,${item.name}`
        if (item.type == 'ASSET') {
          fieldFormat += `,${item.name}Asset {
            created_at,
            updated_at,
            id,
            name,
            url,
            type
          }`
        }
        if (item.type == 'REFERENCE') {
          fieldFormat += `,${item.name}Reference {
            created_at,
            updated_at,
            id,
            title
          }`
        }
      }) 

      self.$apollo
        .query({
          query: gql`query ${apiName} ($paginator: PaginatorInput, $more: ${self.custom.name}PaginatorInput) { 
            ${apiName} (paginator: $paginator, more: $more) { 
            items { 
              ${fieldFormat}
            },
            cursor { total } 
            }
          }`,
          variables: self.search,
          fetchPolicy: 'no-cache',
          context: {
            uri: api.projectUri + store.state.common.currentProject.id
          }
        })
        .then(data => {
          self.data = data.data[apiName].items
          self.total = data.data[apiName].cursor.total
          self.loading = false
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
          self.loading = false
        })
    },
    showReferenceDialog(item, field, text) {
      this.referenceModal.item = item
      this.referenceModal.field = field
      if (typeof text === 'string') {
        this.referenceModal.ids = [text]
      } else {
        this.referenceModal.ids = text
      }
      this.referenceModal.visible = true
    },
    closeReferenceDialog() {
      this.referenceModal.visible = false
    }
  }
}
</script>
<style lang="less">
.content-table {
  .ant-table-body {
    min-height: calc(~"100vh - 210px");
  }
  .ant-table-placeholder {
    display: none;
  }
}
</style>
<style lang="less" scoped>
// .empty-content {
//   position: absolute;
//   top: 400px;
//   left: 0;
//   right: 0;
//   margin: auto;
// }
</style>
