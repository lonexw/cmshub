<template>
  <base-page title="内容">
    <template v-slot:sider>
      <div class="flex justify-between align-center">
        <bg-tag :toggle="true" :toggleDirection="toggleDirection" @click.native="toggleModels">Models</bg-tag>
      </div>
      <div ref="models" :class="(show_models ? '' : 'hidden') + ' margin-top-xs models'" v-if="customs.length > 0">
        <bg-tag
          class="flex align-center margin-left-xs text-black"
          :active="item.active"
          v-for="(item, index) in customs"
          :key="index"
        >
          {{ item.zh_name }}
        </bg-tag>
      </div>
    </template>
    <template v-slot:content>
      <contents v-show="!show_update" @update="update"></contents>
      <update-content :data="content" model="Admin" v-show="show_update" @cancel="cancelUpdate"></update-content>
    </template>
  </base-page>
</template>

<script>
import { BasePage, BgTag } from '@/components'
import Contents from './components/Contents'
import UpdateContent from './components/UpdateContent'
import { userCustoms } from '@/graphql/custom.graphql'
import { formatGraphErr } from '@/utils/util'

export default {
  components: {
    UpdateContent,
    Contents,
    BasePage,
    BgTag
  },
  data() {
    return {
      content: {
        id: 1
      },
      customs: [],
      show_update: true,
      show_models: true,
      models_height: '0px'
    }
  },
  computed: {
    toggleDirection: function() {
      return this.show_models ? 'down' : 'right'
    }
  },
  mounted() {
    // this.models_height = this.$refs.models.offsetHeight + 'px'
    // this.$refs.models.style.height = this.models_height
    this.getCustomList()
  },
  methods: {
    getCustomList() {
      let self = this
      self.$apollo
        .query({
          query: userCustoms,
          variables: {},
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          let customs = data.data.userCustoms.items
          let items = []
          customs.forEach(element => {
            items.push(Object.assign(element, {
              active: false
            }))
          })
          self.customs = items
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    toggleModels() {
      this.show_models = !this.show_models
      this.$refs.models.style.height = this.show_models ? this.models_height : '0px'
    },
    cancelUpdate() {
      this.show_update = false
    },
    update(item) {
      this.content = item || {}
      this.show_update = true
    }
  }
}
</script>
<style lang="less" scoped>
.models {
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}
</style>
