<template>
  <div>
    <a-upload-dragger
      name="file"
      :multiple="true"
      :fileList="files"
      :beforeUpload="beforeUpload"
      :disabled="loading"
      :customRequest="handleChange"
      :remove="handleRemove"
    >
      <div>
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击上传或将文件拖动到此处</p>
      </div>
    </a-upload-dragger>
  </div>
</template>

<script>
let OSS = require('ali-oss')
let readableSize = require('readable-size')
import moment from 'moment'
import { getAliyunOssSts } from '@/graphql/common.graphql'

export default {
  name: 'BatchUpload',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    data(newVal) {
      this.newData = newVal
    }
  },
  data() {
    return {
      files: [],
      percent: 0,
      newData: {},
      loading: false
    }
  },
  mounted() {},
  methods: {
    del() {
      this.newData = Object.assign({}, this.newData, { url: null })
    },
    beforeUpload() {
      return true
    },
    handleRemove(file) {
      console.log(file)
      let files = []
      this.files.forEach(item => {
        if (item.uid != file.uid) {
          files.push(item)
        }
      })
      this.files = files
      this.$emit('change', this.files)
    },
    async handleChange(info) {
      const that = this
      this.percent = 0
      this.loading = true
      const sts = await this.$apollo.query({
        query: getAliyunOssSts,
        variables: {}
      })
      const aliyunOssSts = sts.data.getAliyunOssSts
      if (!aliyunOssSts.sts_token) {
        this.loading = false
        this.$message.error('上传权限验证失败，请重试')
        return false
      }

      let client = new OSS({
        region: aliyunOssSts.region,
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
        accessKeyId: aliyunOssSts.access_key_id,
        accessKeySecret: aliyunOssSts.access_key_secret,
        stsToken: aliyunOssSts.sts_token,
        bucket: aliyunOssSts.bucket
      })
      //   var tempCheckpoint
      let file_name = 'uploads/' + moment().format('YYYYMMDDHHmmss') + '-' + info.file.name
      try {
        // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        await client.multipartUpload(file_name, info.file, {
          mime: info.file.type
        })
        this.loading = false
        const url = `https://${aliyunOssSts.bucket}.${aliyunOssSts.region}.aliyuncs.com/${file_name}`
        that.newData = Object.assign({}, this.newData, {
          url: url,
          mime: info.file.type,
          name: info.file.name,
          size: readableSize(info.file.size),
          width: '',
          height: '',
          uid: info.file.uid
        })

        if (that.newData.mime.indexOf('image') > -1) {
          // 获取宽高
          var reader = new FileReader()
          reader.readAsDataURL(info.file)
          reader.onload = function(theFile) {
            var image = new Image()
            image.src = theFile.target.result
            image.onload = function() {
              // console.log('图片的宽度为' + this.width + ',长度为' + this.height)
              that.newData = Object.assign({}, that.newData, {
                width: this.width,
                height: this.height
              })
            }
          }
        }
        this.files.push(this.newData)
        that.$emit('change', this.files)
      } catch (e) {
        console.log('upload-fail', e)
        this.loading = false
        this.$message.error('上传失败，请重试')
        return false
      }
    }
  }
}
</script>
<style lang="less"></style>
