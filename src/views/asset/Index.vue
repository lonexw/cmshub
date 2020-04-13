<template>
  <div>
    <assets v-show="!show_update" @update="update"></assets>
    <update-content :data="content" model="资源" v-show="show_update" @cancel="cancelUpdate"></update-content>
  </div>
</template>

<script>
import Assets from './components/Assets'
import UpdateContent from '../content/components/UpdateContent'

export default {
  components: {
    UpdateContent,
    Assets
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
    update(item) {
      this.content = item || {}
      this.show_update = true
    }
  }
}
</script>
<style lang="less" scoped></style>
