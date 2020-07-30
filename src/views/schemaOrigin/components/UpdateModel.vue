<template>
  <div>
    <a-modal title="创建 模型" :visible="visible" :footer="null" @cancel="cancel" :maskClosable="false">
      <a-form-model layout="vertical" :model="form" ref="createForm" :rules="rules">
        <a-form-model-item label="展示名称" prop="zh_name">
          <div class="text-sm text-gray margin-bottom-xs">
            项目中将展示这个名称（中文、字母、数字、下划线）
          </div>
          <a-input v-model="form.zh_name" placeholder="请输入展示名称" />
        </a-form-model-item>
        <a-form-model-item label="API ID" prop="name">
          <div class="text-sm text-gray margin-bottom-xs">
            用于通过 API 访问此模型的 ID（字母、数字、下划线，字母开头）
          </div>
          <a-input v-model="form.name" placeholder="请输入 API ID" />
        </a-form-model-item>
        <a-form-model-item label="API ID 复数形式" prop="plural_name">
          <div class="text-sm text-gray margin-bottom-xs">
            API ID 复数形式（字母、数字、下划线，字母开头）
          </div>
          <a-input v-model="form.name" placeholder="API ID 复数形式" />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description">
          <a-input v-model="form.description" type="textarea" placeholder="请输入描述" />
        </a-form-model-item>
        <a-form-model-item style="margin-bottom: 0;" class="text-right">
          <a-button @click="cancel" class="margin-right-sm">
            取消
          </a-button>
          <a-button type="primary" @click="submit">
            确认
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'UpdateModel',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {},
  data() {
    return {
      form: {},
      rules: {
        zh_name: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入 API ID', trigger: 'blur' }],
        plural_name: [{ required: true, message: '请输入 API ID 的复数形式', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
