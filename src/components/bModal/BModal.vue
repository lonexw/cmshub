<template>
  <a-modal
    :visible="visible"
    :title="title"
    :footer="footer"
    @cancel="cancel"
    :closable="false"
    :width="width"
    centered
    class="relative"
  >
    <a-button
      type="primary"
      shape="circle"
      icon="close"
      size="small"
      style="position: absolute; right: 10px; top: 10px;"
      @click="cancel"
    />
    <slot></slot>
  </a-modal>
</template>

<script>
export default {
  name: 'BModal',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Object,
      default: undefined
    },
    width: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped></style>
