<template>
  <div class="relative">
    <header class="padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey">
      <bg-tag :active="true">{{ custom ? custom.name : '' }}</bg-tag>
      <a-button type="primary" @click="add"> <a-icon type="plus" />新增 </a-button>
    </header>
    <div class="flex align-center padding-lr-sm solid-bottom line-grey" style="height: 36px;">
      <span class="margin-right-sm">{{ select_num }} 选中</span>
      <div class="flex" v-show="select_num > 0">
        <bg-tag class="text-red"> <a-icon type="delete" class="margin-right-xxs" /> 删除 </bg-tag>
        <!-- <bg-tag class="text-green"> <a-icon type="up-square" class="margin-right-xxs" /> 发布 </bg-tag>
        <bg-tag class="text-yellow"> <a-icon type="close-square" class="margin-right-xxs" /> 不发布 </bg-tag> -->
      </div>
    </div>
    <a-table
      class="content-table"
      size="middle"
      v-if="data.length > 0"
      rowKey="id"
      :rowSelection="rowSelection"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 1200, y: 'calc(100vh - 210px)', scrollToFirstRowOnChange: true }"
    >
    </a-table>
    <a-empty class="empty-content" v-if="data.length == 0 && !loading" />
    <div class="flex justify-center margin-top-sm">
      <a-pagination
        showSizeChanger
        showQuickJumper
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :pageSize="search.paginator.limit"
        :defaultCurrent="1"
        :pageSizeOptions="['10', '30', '50', '100']"
        @showSizeChange="showSizeChange"
      />
    </div>
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
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        this.select_num = selectedRows.length
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
      show_create: false,
      total: 30,
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
    showSizeChange(current, size) {
      this.search.paginator.limit = size
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
                      let assets = null
                      record[element.name + 'Asset'].forEach(assetItem => {
                        if (assetItem) {
                          assets += <img src={assetItem.url} />
                        }
                      })
                      return assets
                    } else {
                      let data = record[element.name + 'Asset']
                      if (data) {
                        let url = record[element.name + 'Asset'].url
                        if (record[element.name + 'Asset'].type.indexOf('image') > -1) {
                          // return <img src={url} />
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
              } else {
                columns.push({
                  title: element.zh_name,
                  dataIndex: element.name
                })
              }
              itemNames.push(element.name)
            }
          })
          columns.push({
            title: '操作',
            dataIndex: 'action',
            customRender: (text, record) => {
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
              return child
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
      let fieldFormat = 'id'
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
