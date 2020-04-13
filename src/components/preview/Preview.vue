<template>
  <div>
    <img :src="src" v-if="src && type === 'image'" :height="height" @click="handlePreview" class="pointer" />
    <a-icon v-else type="file-text" :style="{ fontSize: height, color: '#08c' }" />
    <b-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </b-modal>
  </div>
</template>

<script>
import BModal from '@/components/bModal'

export default {
  name: 'Preview',
  props: {
    mime: {
      type: String
    },
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
      previewImage: '',
      type: 'file'
    }
  },
  watch: {
    mime(newVal) {
      if (newVal.indexOf('image') > -1) {
        this.type = 'image'
        return
      }

      this.type = 'file'
    }
  },
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
