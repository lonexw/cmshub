<template>
  <div class="relative">
    <header class="padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey">
      <bg-tag :active="true">Asset</bg-tag>
    </header>
    <a-table
      class="content-table"
      size="middle"
      rowKey="id"
      v-if="data.length > 0"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 1200, y: 'calc(100vh - 10px)', scrollToFirstRowOnChange: true }"
    >
      <template slot="url" slot-scope="url, record">
        <preview-image :src="url" height="30px" v-if="record.type.indexOf('image') > -1"></preview-image>
        <span v-else>{{ url }}</span>
      </template>
      <template slot="action" slot-scope="record">
        <a @click="selectItem(record)">选择</a>
      </template>
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
        @change="change"
        @showSizeChange="showSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { BgTag } from '@/components'
import { userAssets } from '@/graphql/asset.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import PreviewImage from '@/components/PreviewImage'

export default {
  name: 'AssetPicker',
  props: {
    formName: {
      type: String,
      default: ''
    },
    isMultiple: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BgTag,
    PreviewImage
  },
  data() {
    const columns = [
      {
        title: '文件名',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '预览',
        dataIndex: 'url',
        scopedSlots: { customRender: 'url' }
      },
      {
        title: '大小',
        dataIndex: 'file_size'
      },
      {
        title: '上传时间',
        dataIndex: 'created_at'
      },
      {
        title: '选择',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        this.select_num = selectedRows.length
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
        this.$emit('selectChange', record, this.formName, this.isMultiple)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    }
    return {
      rowSelection,
      columns,
      data: [],
      select_num: 0,
      show_create: false,
      total: 30,
      search: {
        paginator: {
          page: 1,
          limit: 10
        }
      },
      loading: false
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    showSizeChange(current, size) {
      this.search.paginator.limit = size
      this.getList()
    },
    change(page, pageSize) {
      this.search.paginator.page = page
      this.search.paginator.limit = pageSize
      this.getList()
    },
    getList() {
      let self = this
      self.loading = true
      self.$apollo
        .query({
          query: userAssets,
          variables: self.search,
          fetchPolicy: 'no-cache',
          context: {
            uri: api.projectUri + store.state.common.currentProject.id
          }
        })
        .then(data => {
          self.data = data.data.userAssets.items
          self.total = data.data.userAssets.cursor.total
          self.loading = false
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
          self.loading = false
        })
    },
    selectItem(record) {
      this.$emit('selectChange', record, this.formName, this.isMultiple)
    }
  }
}
</script>
<style lang="less">
.content-table {
  .ant-table-body {
    min-height: 210px;
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
