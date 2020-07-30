<template>
  <base-page title="模型">
    <template v-slot:sider>
      <div class="flex justify-between align-center">
        <bg-tag :toggle="true" :toggleDirection="toggleDirection" @click.native="toggleModels">Models</bg-tag>
        <bg-tag class="text-blue text-sm" @click.native="showCreate"><a-icon type="plus" /> 添加</bg-tag>
      </div>
      <div ref="models" :class="(show_models ? '' : 'hidden') + ' margin-top-xs models'">
        <bg-tag class="flex align-center margin-left-xs text-black" :active="true">
          Asset
          <span class="tag bg-gray margin-left-xs">system</span>
        </bg-tag>
      </div>
    </template>
    <template v-slot:content>
      <div class="text-center" style="margin-top: 200px;" v-if="init">
        <h1 class="text-xxxl">开启项目</h1>
        <h1 class="text-xxxl">创建第一个 模型</h1>
        <a-button type="primary" size="large" @click="showCreate"><a-icon type="plus" />创建 模型</a-button>
      </div>
      <detail-model v-else :visible="show_create"></detail-model>
      <update-model :visible="show_create" @cancel="cancelCreate"></update-model>
    </template>
  </base-page>
</template>

<script>
import { BasePage, BgTag } from '@/components'
import UpdateModel from './components/UpdateModel'
import DetailModel from './components/DetailModel'

export default {
  components: {
    BasePage,
    BgTag,
    UpdateModel,
    DetailModel
  },
  data() {
    return {
      init: false,
      show_models: true,
      show_create: false,
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
    showCreate() {
      this.show_create = true
    },
    cancelCreate() {
      this.show_create = false
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
