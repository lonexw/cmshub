<template>
  <div class="relative">
    <header class="padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey">
      <bg-tag :active="true">Asset</bg-tag>
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
        :total="85"
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

export default {
  name: 'Contents',
  props: {},
  components: {
    BgTag
  },
  data() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' }
      },
      {
        title: 'Cash Assets',
        className: 'column-money',
        dataIndex: 'money'
      },
      {
        title: 'Address',
        dataIndex: 'address'
      }
    ]

    const data = []
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
      columns,
      data,
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
  computed: {},
  mounted() {},
  methods: {
    add() {
      this.$emit('update')
    },
    showSizeChange(current, size) {
      this.search.paginator.limit = size
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
