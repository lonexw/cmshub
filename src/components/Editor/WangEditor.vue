<template>
  <div :class="prefixCls">
    <div ref="editor" class="editor-wrapper"></div>
  </div>
</template>

<script>
import WEditor from 'wangeditor'

export default {
  name: 'WangEditor',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-wang'
    },
    name: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data() {
    return {
      editor: null,
      editorContent: null
    }
  },
  watch: {
    value(val) {
      this.editorContent = val
      this.editor.txt.html(val)
      this.$emit('change', [this.editorContent, this.name])
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      this.editor = new WEditor(this.$refs.editor)
      // this.editor.onchangeTimeout = 200
      this.editor.customConfig.onchange = html => {
        this.editorContent = html
        this.$emit('change', [this.editorContent, this.name])
      }
      this.editor.create()
    }
  }
}
</script>

<style lang="less" scoped>
.ant-editor-wang {
  .editor-wrapper {
    text-align: left;
  }
}
</style>
