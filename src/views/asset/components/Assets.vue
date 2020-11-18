<template>
  <div class="relative">
    <header class="padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey">
      <bg-tag :active="true">附件管理</bg-tag>
      <div>
        <a-button type="primary" @click="add"> <a-icon type="plus" />新增 </a-button>
        <a-button type="primary" @click="batchAdd" style="margin-left: 10px;">
          <a-icon type="plus" />批量上传
        </a-button>
      </div>
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
      :pagination="false"
      :scroll="{ x: 1200, y: 'calc(100vh - 210px)', scrollToFirstRowOnChange: true }"
    >
      <template slot="url" slot-scope="url, record">
        <preview-image :src="url" height="30px" v-if="record.type.indexOf('image') > -1"></preview-image>
        <span v-else>{{ url }}</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { BgTag } from '@/components'
import { userAssets, userDeleteBatchAsset } from '@/graphql/asset.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import PreviewImage from '@/components/PreviewImage'

export default {
  name: 'Contents',
  props: {},
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
      }
    ]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.select_num = selectedRows.length
        let ids = []
        selectedRows.forEach(element => {
          ids.push(element.id)
        })
        this.ids = ids
      }
    }
    return {
      rowSelection,
      columns,
      data: [],
      select_num: 0,
      ids: [],
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
  mounted() {
    this.getList()
  },
  methods: {
    add() {
      this.$emit('update')
    },
    batchAdd() {
      this.$emit('batchAdd')
    },
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
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    batchDelete() {
      let self = this
      this.$confirm({
        title: '确认删除选中数据吗？',
        confirmLoading: true,
        onOk() {
          self.$apollo
            .mutate({
              mutation: userDeleteBatchAsset,
              variables: {
                ids: self.ids
              },
              fetchPolicy: 'no-cache',
              context: {
                uri: api.projectUri + store.state.common.currentProject.id
              }
            })
            .then(() => {
              self.$message.success('删除成功')
              self.getList()
              self.select_num = 0
              self.ids = []
            })
            .catch(err => {
              self.$message.warning(formatGraphErr(err.message))
            })
        }
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
// .empty-content {
//   position: absolute;
//   top: 400px;
//   left: 0;
//   right: 0;
//   margin: auto;
// }
</style>
