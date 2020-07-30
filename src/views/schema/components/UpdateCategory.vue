<template>
  <div>
    <a-modal
      :title="(this.id ? '编辑' : '创建') + '分类'"
      :visible="visible"
      :footer="null"
      @cancel="cancel"
      :maskClosable="false"
    >
      <a-form-model layout="vertical" :model="form" ref="createForm" :rules="rules">
        <a-form-model-item label="名称" prop="title">
          <a-input v-model="form.title" placeholder="请输入名称" />
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
import { userCreateCategory, userUpdateCategory, userCategory } from '@/graphql/category.graphql'
import { formatGraphErr } from '@/utils/util'
export default {
  name: 'UpdateCategory',
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
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      categories: []
    }
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.getCategory()
      }
    }
  },
  computed: {},
  mounted() {
    if (this.id) {
      this.getCategory()
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
              mutation: self.id ? userUpdateCategory : userCreateCategory,
              variables: {
                data: self.form
              },
              fetchPolicy: 'no-cache'
            })
            .then(() => {
              self.$emit('cancel')
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
    getCategory() {
      let self = this
      self.$apollo
        .query({
          query: userCategory,
          variables: {
            id: self.id
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          const custom = data.data.userCategory
          self.form = {
            id: custom.id,
            title: custom.title
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
