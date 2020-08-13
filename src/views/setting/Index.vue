<template>
  <div class="main">
    <a-card title="接口信息">
      <div @click.prevent="copyDocumentUrl">
        接口文档地址：<a-input v-model="form.document_url" disabled />
      </div>
      <div @click.prevent="copyApiUrl">
        接口对接地址：<a-input v-model="form.api_url" disabled />
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      form: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  computed: {
    ...mapState({
      project: state => state.common.currentProject
    })
  },
  mounted() {
    this.form = {
      document_url: process.env.VUE_APP_API_URL + 'graphql-playground',
      api_url: process.env.VUE_APP_API_URL + 'graphql?Project-Id=' + this.project.id
    }
  },
  methods: {
    copyApiUrl() {
      this.copy(this.form.api_url)
    },
    copyDocumentUrl() {
      this.copy(this.form.document_url)
    },
    copy(value) {
      var _input = document.createElement('input')
      _input.value = value
      document.body.appendChild(_input)
      _input.select()
      document.execCommand('Copy')
      this.$message.success('复制成功')
      document.body.removeChild(_input)
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  padding-top: 50px;
}
</style>
