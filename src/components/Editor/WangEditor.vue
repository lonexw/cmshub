<template>
  <div :class="prefixCls">
    <div ref="editor" class="editor-wrapper"></div>
  </div>
</template>

<script>
import WEditor from 'wangeditor'
import { ossUpload } from '@/utils/oss'

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
      editorContent: null,
      menus: [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
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
      this.editor.onchangeTimeout = 200
      this.editor.customConfig.menus = this.menus // menu菜单
      this.editor.customConfig.customUploadImg = async (files, insert) => {
        const res = await ossUpload(files[0])
        insert(res.url)
        this.$message.success('上传成功')
      }
      this.editor.customConfig.onchange = html => {
        this.editorContent = html
        this.$emit('change', [this.editorContent, this.name])
      }
      this.editorContent = this.value
      this.editor.create()
      this.editor.txt.html(this.value)
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
<style>
.w-e-menu {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}
</style>
