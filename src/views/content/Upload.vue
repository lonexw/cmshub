<template>
  <div>
    <a-layout style="background-color: white; margin-right: 240px">
      <a-layout-content>
        <div class="content-body padding-lr-sm">
          <a-form-model layout="vertical" :model="form" ref="form">
            <a-form-model-item label="" prop="url">
              <batch-upload :data="{ id: 1 }" @change="handleChange"></batch-upload>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-layout-content>
      <div class="flex justify-center margin-top">
        <a-button type="primary" @click="handleUpload" :loading="submit_loading">创建</a-button>
      </div>
    </a-layout>
  </div>
</template>

<script>
import { userCreateBatchAsset } from '@/graphql/asset.graphql'
import { formatGraphErr } from '@/utils/util'
import store from '@/store'
import api from '@/config/api'
import { BatchUpload } from '@/components'

export default {
  components: {
    BatchUpload
  },
  data() {
    return {
      fileList: [],
      form: this.$form.createForm(this),
      submit_loading: false
    }
  },
  created() {},
  methods: {
    goSchema() {
      this.$router.push({ name: 'Schema' })
    },
    handleChange(data) {
      this.fileList = data
    },
    handleUpload(e) {
      e.preventDefault()
      let self = this
      if (this.fileList.length == 0) {
        this.$message.warning('请上传文件')
        return
      }
      let data = []
      this.fileList.forEach(element => {
        data.push({
          name: element.name,
          url: element.url,
          type: element.mime,
          file_size: element.size,
          is_system: 'false'
        })
      })
      self.$apollo
        .mutate({
          mutation: userCreateBatchAsset,
          variables: {
            data: data
          },
          fetchPolicy: 'no-cache',
          context: {
            uri: api.projectUri + store.state.common.currentProject.id
          }
        })
        .then(() => {
          self.$router.push({ path: '/content' })
        })
        .catch(err => {
          this.$message.warning(formatGraphErr(err.message))
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
