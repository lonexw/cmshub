<template>
  <div class="relative">
    <a-table
      class="content-table"
      size="middle"
      v-if="data.length > 0"
      rowKey="id"
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
    <a-empty class="empty-content" v-if="data.length == 0" />
  </div>
</template>

<script>
import { BgTag } from '@/components'
import { userFields } from '@/graphql/field.graphql'
import { userCustom } from '@/graphql/custom.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import gql from 'graphql-tag'
/* eslint-disable */
import PreviewImage from '@/components/PreviewImage'

export default {
  name: 'ContentShow',
  props: {
    customId: {},
    ids: {
      type: Array,
      default: []
    }
  },
  components: {
    BgTag, PreviewImage
  },
  data() {
    return {
      columns: [],
      data: [],
      custom: {},
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
    this.search.more = {
      ids: this.ids
    }
    this.getCustom()
  },
  methods: {
    add() {
      this.$emit('update')
    },
    showSizeChange(current, size) {
      this.search.paginator.limit = size
    },
    getCustom() {
      let self = this
      self.$apollo
        .query({
          query: userCustom,
          variables: {
            id: self.customId
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          let custom = data.data.userCustom
          self.custom = custom
          this.getFieldList()
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    getFieldList() {
      this.data = []
      let self = this
      self.$apollo
        .query({
          query: userFields,
          variables: {
            more: {
              custom_id: self.customId
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
