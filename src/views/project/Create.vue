<template>
  <div>
    <h1 class="text-lg margin-bottom">创建新项目</h1>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @submit="handleSubmit"
    >
      <a-row :gutter="32">
        <a-col :span="12">
          <a-form-model-item label="项目名称" prop="name">
            <a-input
              size="large"
              v-model="form.name"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="项目描述" prop="description">
            <a-input
              size="large"
              v-model="form.description"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <div class="flex justify-center margin-top">
        <a-button type="link" class="margin-right" :loading="submit_loading" @click="cancel">取消</a-button>
        <a-button type="primary" html-type="submit" :loading="submit_loading">
          {{ formData && formData.id > 0 ? '保存' : '创建' }}
        </a-button>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import { userCreateProject, userUpdateProject } from '@/graphql/project.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'

export default {
  components: {},
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '请输入项目描述', trigger: 'blur' }
        ]
      },
      submit_loading: false
    }
  },
  created() {
    this.form = Object.assign({}, this.formData)
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    goSchema() {
      this.$router.push({ name: 'Schema' })
    },
    handleSubmit(e) {
      e.preventDefault()
      let self = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          self.$apollo
          .mutate({
            mutation: self.formData && self.formData.id > 0 ? userUpdateProject : userCreateProject,
            variables: {
              id: self.formData && self.formData.id > 0 ? self.formData.id : '',
              name: self.form.name,
              description: self.form.description
            },
            fetchPolicy: 'no-cache'
          })
          .then(response => {
            store
              .dispatch(
                'SetCurrentProject',
                self.formData && self.formData.id > 0
                  ? response.data.userUpdateProject
                  : response.data.userCreateProject
              )
              .then(() => {
                this.$router.push({ name: 'Schema' })
              })
            this.goSchema()
          })
          .catch(err => {
            this.$message.warning(formatGraphErr(err.message))
          })
        }
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
