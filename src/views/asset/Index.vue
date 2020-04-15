<template>
  <div>
    <assets v-if="show_list" @batchAdd="showBatch" @update="update"></assets>
    <asset-create v-if="show_create" @cancel="cancelUpdate" @ok="ok"></asset-create>
    <asset-create-batch v-if="show_batch" @cancel="cancelBatch" @ok="ok"></asset-create-batch>
  </div>
</template>

<script>
import Assets from './components/Assets'
import AssetCreate from './components/Create'
import AssetCreateBatch from './components/CreateBatch'

export default {
  components: {
    Assets,
    AssetCreate,
    AssetCreateBatch
  },
  data() {
    return {
      content: {
        id: 1
      },
      show_list: true,
      show_create: false,
      show_batch: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    cancelUpdate() {
      this.show_list = true
      this.show_create = false
    },
    cancelBatch() {
      this.show_batch = false
      this.show_create = false
      this.show_list = true
    },
    showBatch() {
      this.show_batch = true
      this.show_list = false
      this.show_create = false
    },
    ok() {
      this.show_list = true
      this.show_batch = false
      this.show_create = false
    },
    update(item) {
      this.content = item || {}
      this.show_create = true
      this.show_list = false
      this.show_batch = false
    }
  }
}
</script>
<style lang="less" scoped></style>
