<template>
  <base-page title="内容">
    <template v-slot:sider>
      <div class="flex justify-between align-center">
        <bg-tag :toggle="true" :toggleDirection="toggleDirection" @click.native="toggleModels">Models</bg-tag>
      </div>
      <div ref="models" :class="(show_models ? '' : 'hidden') + ' margin-top-xs models'">
        <bg-tag class="flex align-center margin-left-xs text-black" :active="true">
          用户
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
    this.models_height = this.$refs.models.offsetHeight + 'px'
    this.$refs.models.style.height = this.models_height
  },
  methods: {
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
