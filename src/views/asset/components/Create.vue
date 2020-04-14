<template>
  <div>
    <h1 class="text-lg margin-bottom">上传附件</h1>
    <a-form :form="form">
      <a-upload :fileList="fileList" :multiple="false" :remove="handleRemove" :beforeUpload="beforeUpload">
        <a-button> <a-icon type="upload" /> 选择要上传的文件 </a-button>
      </a-upload>
      <div class="flex justify-center margin-top">
        <a-button type="link" class="margin-right" :loading="submit_loading" @click="cancel">取消</a-button>
        <a-button type="primary" @click="handleUpload" :loading="submit_loading">创建</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import { userCreateProject } from '@/graphql/project.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import { uploadImage } from '@/graphql/index'

export default {
  components: {},
  data() {
    return {
      fileList: [],
      form: this.$form.createForm(this),
      submit_loading: false
    }
  },
  created() {},
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    goSchema() {
      this.$router.push({ name: 'Schema' })
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      this.submit_loading = true
      uploadImage(formData).then(res => {
        this.submit_loading = false
        if (res.code == 200) {
          this.fileList = []
          this.$message.success('上传成功')
          this.$emit('ok')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.form.validateFields((err, values) => {
        if (err) {
          return
        }
        self.$apollo
          .mutate({
            mutation: userCreateProject,
            variables: {
              id: '',
              name: values.name,
              description: values.description
            },
            fetchPolicy: 'no-cache'
          })
          .then(response => {
            store.commit('SetCurrentProject', response.data.userCreateProject)
            this.goSchema()
          })
          .catch(err => {
            this.$message.warning(formatGraphErr(err.message))
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.project-header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
}
.project-footer {
  background-color: white;
  position: fixed;
  z-index: 2;
  bottom: 0;
  width: 100%;
}
.project-body {
  width: 960px;
  margin: 0 auto 50px auto;
  padding-top: 90px;
  .project {
    position: relative;
    z-index: 1;
    transform: scale(1);
    top: 0;
    margin-left: 32px;
    margin-bottom: 32px;
    width: 200px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 48px 32px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgb(240, 242, 247);
    transition: all 0.3s ease 0s;
    .add-icon {
      font-size: 80px;
      color: #6663fd;
    }
    .icon {
      width: 80px;
      height: 80px;
      background-color: black;
      color: rgb(255, 255, 255);
      font-size: 32px;
      line-height: 80px;
      text-align: center;
      font-weight: 600;
      margin-left: auto;
      margin-right: auto;
      border-radius: 8px;
    }
  }

  .project:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 20px;
    transform: scale(1.01);
    top: -5px;
  }
}
</style>
