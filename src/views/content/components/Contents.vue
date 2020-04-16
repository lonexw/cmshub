<template>
  <div class="relative">
    <header class="padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey">
      <bg-tag :active="true">Admin</bg-tag>
      <a-button type="primary" @click="add"> <a-icon type="plus" />新增 </a-button>
    </header>
    <div class="flex align-center padding-lr-sm solid-bottom line-grey" style="height: 36px;">
      <span class="margin-right-sm">{{ select_num }} 选中</span>
      <div class="flex" v-show="select_num > 0">
        <bg-tag class="text-red"> <a-icon type="delete" class="margin-right-xxs" /> 删除 </bg-tag>
        <bg-tag class="text-green"> <a-icon type="up-square" class="margin-right-xxs" /> 发布 </bg-tag>
        <bg-tag class="text-yellow"> <a-icon type="close-square" class="margin-right-xxs" /> 不发布 </bg-tag>
      </div>
    </div>
    <a-table
      class="content-table"
      size="middle"
      rowKey="id"
      :rowSelection="rowSelection"
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :scroll="{ x: 1200, y: 'calc(100vh - 210px)', scrollToFirstRowOnChange: true }"
    >
    </a-table>
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
    <a-empty class="empty-content" />
  </div>
</template>

<script>
import { BgTag } from '@/components'
import { userFields } from '@/graphql/field.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import gql from 'graphql-tag'

export default {
  name: 'Contents',
  props: {
    custom: {}
  },
  components: {
    BgTag
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
      }
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.getFieldList()
  },
  methods: {
    add() {
      this.$emit('update')
    },
    showSizeChange(current, size) {
      this.search.paginator.limit = size
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
          let columns = []
          customs.forEach(element => {
            if (element.name != '__typename') {
              items.push(element)
              columns.push({
                title: element.zh_name,
                dataIndex: element.name
              })
              itemNames.push(element.name)
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
      let apiName = 'user' + self.custom.plural_name
      self.$apollo
        .query({
          query: gql`query ${apiName} ($paginator: PaginatorInput, $more: ${self.custom.name}PaginatorInput) { 
            ${apiName} (paginator: $paginator, more: $more) { 
            items { 
              ${self.fieldNames.join(',')}
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
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    }
  }
}
</script>
<style lang="less">
.content-table {
  .ant-table-body {
    min-height: calc(~'100vh - 210px');
  }
  .ant-table-placeholder {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.empty-content {
  position: absolute;
  top: 400px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
