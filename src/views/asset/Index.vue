<template>
  <div>
    <assets v-if="!show_update" @update="update"></assets>
    <asset-create v-else @cancel="cancelUpdate" @ok="ok"></asset-create>
  </div>
</template>

<script>
import Assets from './components/Assets'
import AssetCreate from './components/Create'

export default {
  components: {
    Assets,
    AssetCreate
  },
  data() {
    return {
      content: {
        id: 1
      },
      show_update: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    cancelUpdate() {
      this.show_update = false
    },
    ok() {
      this.show_update = false
    },
    update(item) {
      this.content = item || {}
      this.show_update = true
    }
  }
}
</script>
<style lang="less" scoped></style>
