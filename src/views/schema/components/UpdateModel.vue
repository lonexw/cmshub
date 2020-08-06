<template>
  <div>
    <a-modal
      :title="(this.id ? '编辑' : '创建') + '模型'"
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
            用于通过 API 访问此模型的 ID（字母、数字、下划线，字母开头）
          </div>
          <a-input v-model="form.name" placeholder="请输入 API ID" />
        </a-form-model-item>
        <a-form-model-item label="API ID 复数形式" prop="plural_name">
          <div class="text-sm text-gray margin-bottom-xs">
            API ID 复数形式（字母、数字、下划线，字母开头）
          </div>
          <a-input v-model="form.plural_name" placeholder="API ID 复数形式" />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description">
          <a-input v-model="form.description" type="textarea" placeholder="请输入描述" />
        </a-form-model-item>
        <a-form-model-item label="所属分类" prop="category_id">
          <a-select v-model="form.category_id">
            <a-select-option :value="item.id" v-for="item in categories" :key="item.id">
              {{ item.title }}
            </a-select-option>
          </a-select>
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
import { userCreateCustom, userUpdateCustom, userCustom } from '@/graphql/custom.graphql'
import { userCategories } from '@/graphql/category.graphql'
import { formatGraphErr } from '@/utils/util'
export default {
  name: 'UpdateModel',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data() {
    return {
      form: {},
      rules: {
        zh_name: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入 API ID', trigger: 'blur' }],
        plural_name: [{ required: true, message: '请输入 API ID 的复数形式', trigger: 'blur' }],
        category_id: [{ required: true, message: '请选择分类', trigger: 'blur' }]
      },
      categories: []
    }
  },
  watch: {
    id(newVal) {
      this.form = {}
      if (newVal) {
        this.getCustom()
      }
    },
    visible() {
      this.getCategories()
    }
  },
  computed: {},
  mounted() {
    if (this.id) {
      this.getCustom()
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
              mutation: self.id ? userUpdateCustom : userCreateCustom,
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
    getCustom() {
      let self = this
      self.$apollo
        .query({
          query: userCustom,
          variables: {
            id: self.id
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          const custom = data.data.userCustom
          self.form = {
            id: custom.id,
            name: custom.name,
            zh_name: custom.zh_name,
            description: custom.description,
            plural_name: custom.plural_name,
            category_id: custom.category_id + ''
          }
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    getCategories() {
      let self = this
      self.$apollo
        .query({
          query: userCategories,
          variables: {},
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          self.categories = data.data.userCategories.items
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    }
  }
}
</script>
<style lang="less" scoped></style>
