<template>
  <div>
    <a-modal
      :title="(this.id ? '编辑' : '创建') + '字段'"
      :visible="visible"
      :footer="null"
      @cancel="cancel"
      :maskClosable="false"
    >
      <a-form-model layout="vertical" :model="form" ref="createForm" :rules="rules" v-show="!showReference">
        <template>
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
          <template v-if="type === 'REFERENCE'">
            <a-form-model-item label="关联模型">
              <a-select v-model="form.reference_custom_id" placeholder="请选择关联模型">
                <a-select-option :value="item.id" v-for="(item, index) in customs" :key="index">
                  {{ item.name }} ({{ item.zh_name }})
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </template>
        </template>
        <a-form-model-item style="margin-bottom: 0;" class="text-right">
          <a-button @click="cancel" class="margin-right-sm">
            取消
          </a-button>
          <template v-if="type === 'REFERENCE' && !id">
            <a-button type="primary" @click="showReferenceFun">
              配置关联字段信息
            </a-button>
          </template>
          <template v-else>
            <a-button type="primary" @click="submit">
              确认
            </a-button>
          </template>
        </a-form-model-item>
      </a-form-model>
      <a-form-model layout="vertical" :model="referenceForm" v-show="showReference">
        <a-divider>关联模型信息</a-divider>
        <a-form-model-item label="展示名称">
          <div class="text-sm text-gray margin-bottom-xs">
            项目中将展示这个名称（中文、字母、数字、下划线）
          </div>
          <a-input v-model="referenceForm.zh_name" placeholder="请输入展示名称" />
        </a-form-model-item>
        <a-form-model-item label="API ID">
          <div class="text-sm text-gray margin-bottom-xs">
            用于通过 API 访问此字段的 ID（字母、数字、下划线，字母开头）
          </div>
          <a-input v-model="referenceForm.name" placeholder="请输入 API ID" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="referenceForm.description" type="textarea" placeholder="请输入描述" />
        </a-form-model-item>
        <a-form-model-item label="是否复数">
          <a-switch v-model="referenceForm.is_multiple" />
        </a-form-model-item>
        <a-form-model-item style="margin-bottom: 0;" class="text-right">
          <template v-if="type === 'REFERENCE'">
            <a-button @click="cancel" class="margin-right-sm">
              取消
            </a-button>
            <template v-if="showReference">
              <a-button type="primary" @click="showReference = false">
                返回
              </a-button>
              <a-button type="primary" @click="submit">
                确认
              </a-button>
            </template>
          </template>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { userCreateField, userUpdateField, userField } from '@/graphql/field.graphql'
import { userCustoms } from '@/graphql/custom.graphql'
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
    fieldType: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {
      form: {},
      referenceForm: {},
      rules: {
        zh_name: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入 API ID', trigger: 'blur' }]
      },
      type: '',
      categories: [],
      customs: [],
      showReference: false
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
      this.type = this.fieldType
      this.getCustomList()
      if (!this.id) {
        this.form = {}
        this.form.type = this.type
        this.form.custom_id = this.customId
      }
      this.showReference = false
    }
  },
  computed: {},
  mounted() {
    this.getCustomList()
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
          let formData = Object.assign({}, self.form)
          if (self.type === 'REFERENCE') {
            if (!formData.id) {
              formData.reference_field = self.referenceForm
            }
          }
          self.$apollo
            .mutate({
              mutation: self.id ? userCreateField : userUpdateField,
              variables: {
                data: formData
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
            is_multiple: field.is_multiple,
            reference_custom_id: field.reference_custom_id ? '' + field.reference_custom_id : undefined,
            custom_id: field.custom_id,
            type: field.type,
            description: field.description
          }
          self.type = field.type
          if (field.hasReferenceField) {
            self.referenceForm = {
              name: field.hasReferenceField.name,
              zh_name: field.hasReferenceField.zh_name,
              description: field.hasReferenceField.description,
              is_multiple: field.hasReferenceField.is_multiple
            }
          } else {
            self.referenceForm = {}
          }
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    getCustomList() {
      let self = this
      self.$apollo
        .query({
          query: userCustoms,
          variables: {
            paginator: {
              limit: 100
            }
          },
          fetchPolicy: 'no-cache'
        })
        .then(data => {
          self.customs = data.data.userCustoms.items
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
        })
    },
    showReferenceFun() {
      this.showReference = true
      if (!this.form.reference_field) {
        this.form.reference_field = {}
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
