<template>
  <div>
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="show" :src="url" class="ant-upload-avatar" />
      <div v-else>
        <a-icon :type="upload_loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">
          {{ uploadText }}
        </div>
      </div>
    </a-upload>
  </div>
</template>

<script>
import { fileClient } from '@/utils/fileUpload'

export default {
  name: 'UploadImage',
  props: {
    value: {
      type: String,
      default: undefined
    },
    uploadText: {
      type: String,
      default: '上传'
    }
  },
  data() {
    return {
      upload_loading: false,
      url: '',
      show: false
    }
  },
  watch: {
    value(newVal) {
      this.url = newVal
      if (this.url) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  mounted() {
    this.url = this.value
    if (this.url) {
      this.show = true
    } else {
      this.show = false
    }
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      if (!isJpgOrPng) {
        this.$message.error('请上传图片格式!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片需小于2MB!')
        return false
      }
      this.submitLogo(file)
      return false
    },
    async submitLogo(file) {
      const fileResult = await fileClient.uploadFile({
        localfile: file
      })
      const logo = fileResult.res.requestUrls[0]
      this.url = logo
      if (this.url) {
        this.show = true
        this.$emit('input', this.url)
        this.$emit('change', this.url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  .ant-upload {
    width: 128px;
    height: 128px;
  }
}
.ant-upload-select-picture-card {
  i {
    font-size: 32px;
    color: #999;
  }
}
.ant-upload-select-picture-card {
  .ant-upload-avatar {
    width: 128px;
    height: 128px;
  }
  .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
</style>
