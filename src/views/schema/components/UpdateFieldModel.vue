<template>
  <div>
    <a-modal
      :title="(this.id ? '编辑' : '创建') + '字段'"
      :visible="visible"
      :footer="null"
      @cancel="cancel"
      :maskClosable="false"
    >
      <a-form-model layout="vertical" :model="form" ref="createForm" :rules="rules">
        <a-form-model-item label="展示名称" prop="zh_name">
          <div class="text-sm text-gray margin-bottom-xs">
            项目中将展示这个名称（中文、字母、数字、下划线）
          </div>
          <a-input v-model="form.zh_name" placeholder="请输入展示名称" />
        </a-form-model-item>
        <a-form-model-item label="API ID" prop="name">
          <div class="text-sm text-gray margin-bottom-xs">
            用于通过 API 访问此字段的 ID（字母、数字、下划线，字母开头）
          </div>
          <a-input v-model="form.name" placeholder="请输入 API ID" />
        </a-form-model-item>
        <a-form-model-item label="是否必填">
          <a-switch v-model="form.is_required" />
        </a-form-model-item>
        <a-form-model-item label="是否唯一">
          <a-switch v-model="form.is_unique" />
        </a-form-model-item>
        <!-- <a-form-model-item label="是否复数">
          <a-switch v-model="form.is_multiple" />
        </a-form-model-item> -->
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
import { userCreateField, userUpdateField, userField } from '@/graphql/field.graphql'
import { formatGraphErr } from '@/utils/util'
export default {
  name: 'UpdateFieldModel',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      default: 0
    },
    customId: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {
      form: {},
      rules: {
        zh_name: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入 API ID', trigger: 'blur' }]
      },
      categories: []
    }
  },
  watch: {
    id(newVal) {
      this.form = {}
      if (newVal) {
        this.getField()
      }
    },
    visible() {
      if (!this.id) {
        this.form = {}
        this.form.type = this.type
        this.form.custom_id = this.customId
      }
    }
  },
  computed: {},
  mounted() {
    if (this.id) {
      this.getField()
    } else {
      this.form.type = this.type
      this.form.custom_id = this.customId
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      const self = this
      this.$refs.createForm.validate(valid => {
        if (valid) {
          self.$apollo
            .mutate({
              mutation: self.id ? userCreateField : userUpdateField,
              variables: {
                data: self.form
              },
              fetchPolicy: 'no-cache'
            })
            .then(() => {
              self.$emit('cancel', true)
            })
            .catch(err => {
              self.$message.warning(formatGraphErr(err.message))
            })
            .finally(() => {
              self.submit_loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getField() {
      let self = this
      self.$apollo
        .query({
          query: userField,
          variables: {
            id: self.id
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          const field = data.data.userField
          self.form = {
            id: field.id,
            name: field.name,
            zh_name: field.zh_name,
            is_required: field.is_required,
            is_unique: field.is_unique,
            // is_multiple: field.is_multiple,
            custom_id: field.custom_id,
            type: field.type,
            description: field.description
          }
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    }
  }
}
</script>
<style lang="less" scoped></style>
