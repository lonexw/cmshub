<template>
  <div>
    <img :src="src" v-if="src" :height="height" @click="handlePreview" class="pointer" />
    <b-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </b-modal>
  </div>
</template>

<script>
import BModal from '@/components/bModal'

export default {
  name: 'PreviewImage',
  props: {
    src: {
      type: String,
      required: false,
      default: undefined
    },
    height: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: ''
    }
  },
  watch: {},
  components: {
    BModal
  },
  computed: {},
  mounted() {},
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview() {
      this.previewImage = this.src
      this.previewVisible = true
    }
  }
}
</script>

<style lang="less" scoped></style>
