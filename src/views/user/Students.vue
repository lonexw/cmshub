<template>
  <div>
    <page-view title="">
      <a-card :bordered="false" class="margin-bottom-xs">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="16">
              <a-col :md="6">
                <a-form-item label="集团名称">
                  <a-input placeholder="请输入集团名称" allowClear v-model="search.more.name" />
                </a-form-item>
              </a-col>
              <a-col :md="6">
                <a-form-item label="集团名称">
                  <a-input placeholder="请输入集团名称" allowClear v-model="search.more.name" />
                </a-form-item>
              </a-col>
              <a-col :md="6">
                <a-form-item label="法人姓名">
                  <a-input placeholder="请输入法人姓名" allowClear v-model="search.more.corporate_name" />
                </a-form-item>
              </a-col>
              <a-col :md="6">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="getGroups">查询</a-button>
                  <a-button style="margin-left: 8px" @click="resetSearch">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'" />
                  </a>
                </span>
              </a-col>
            </a-row>
            <a-row :gutter="16" v-show="advanced" class="last">
              <a-col :md="6">
                <a-form-item label="管理员姓名">
                  <a-input placeholder="请输入管理员姓名" allowClear v-model="search.more.manager_name" />
                </a-form-item>
              </a-col>
              <a-col :md="6">
                <a-form-item label="代理人姓名">
                  <a-input placeholder="请输入代理人姓名" allowClear v-model="search.more.proxy_user_name" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-card>
      <a-card :bordered="false">
        <!-- <a-button type="primary" class="margin-bottom-xs" @click="edit({ type: 'create' })">新建集团</a-button> -->
        <a-table
          :scroll="{ x: 1500 }"
          rowKey="id"
          :columns="columns"
          :dataSource="data.items"
          :loading="loading"
          @change="handleTableChange"
          :pagination="{
            showSizeChanger: true,
            showQuickJumper: false,
            pageSize: search.paginator.limit,
            total: data.cursor.total
          }"
        >
          <template slot="area" slot-scope="record">
            {{ record.province ? record.province.name : '' }}{{ record.city ? '/' + record.city.name : ''
            }}{{ record.district ? '/' + record.district.name : '' }}
          </template>
          <template slot="action" slot-scope="record">
            <a href="javascript:;" class="margin-right-sm" @click="addKindergarten(record)">新增园所</a>
            <a-dropdown>
              <a class="ant-dropdown-link" href="#">更多<a-icon type="down" /> </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="detail(record)">详情</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="del(record)">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
      </a-card>
    </page-view>
  </div>
</template>

<script>
import { PageView } from '@/layouts'

export default {
  components: {
    PageView
  },
  data () {
    const columns = [
      {
        title: '编号',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '集团名称',
        width: 200,
        dataIndex: 'name'
      },
      {
        title: '法人姓名',
        width: 100,
        dataIndex: 'corporate_name'
      },
      {
        title: '所属区域',
        width: 200,
        scopedSlots: { customRender: 'area' }
      },
      {
        title: '管理园所',
        width: 100,
        dataIndex: 'kindergartens_count'
      },
      {
        title: '集团管理员',
        width: 150,
        dataIndex: 'manager_name'
      },
      {
        title: '代理人',
        width: 150,
        dataIndex: 'proxyUser.name'
      },
      {
        title: '签约时间',
        width: 150,
        dataIndex: 'sign_date'
      },
      {
        title: '备注',
        dataIndex: 'remark'
      },
      {
        title: '操作',
        width: 150,
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      advanced: false,
      group: {},
      loading: false,
      columns,
      data: {
        items: [],
        cursor: {
          total: 0
        }
      },
      search: {
        paginator: {
          page: 1,
          limit: 10
        },
        more: {}
      }
    }
  },
  mounted () {
    this.getGroups()
  },
  methods: {
    addKindergarten (record) {},
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    detail (record) {},
    closeDetail () {},
    edit (mode) {},
    del (record) {},
    closeEdit (data) {},

    async getGroups () {},
    resetSearch () {},
    handleTableChange (pagination, filters, sorter) {
      this.search.paginator.page = pagination.current
      this.search.paginator.limit = pagination.pageSize
      this.getGroups()
    }
  }
}
</script>

<style lang="less" scoped></style>
