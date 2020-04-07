<template>
  <base-page title="Schema">
    <template v-slot:sider>
      <div class="flex justify-between align-center">
        <bg-tag :toggle="true" :toggleDirection="toggleDirection" @click.native="toggleModels">Models</bg-tag>
        <bg-tag class="text-blue text-sm"><a-icon type="plus" /> 添加</bg-tag>
      </div>
      <div ref="models" :class="(show_models ? '' : 'hidden') + ' margin-top-xs models'">
        <bg-tag class="flex align-center margin-left-xs text-black">
          Asset
          <span class="tag bg-gray margin-left-xs">system</span>
        </bg-tag>
      </div>
    </template>
    <template v-slot:content>
      <h1>Here might be a page title</h1>
    </template>
  </base-page>
</template>

<script>
import { BasePage, BgTag } from '@/components'

export default {
  components: {
    BasePage,
    BgTag
  },
  data() {
    return {
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
