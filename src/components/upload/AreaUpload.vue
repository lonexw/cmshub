<template>
  <div>
    <a-upload-dragger
      v-show="!newData.url"
      name="file"
      :multiple="false"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      :disabled="loading"
      :customRequest="handleChange"
    >
      <div v-show="!loading">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击上传或将文件拖动到此处</p>
      </div>
      <a-progress v-show="loading" type="circle" :percent="percent" />
    </a-upload-dragger>
    <div v-show="newData.url">
      <div class="flex align-center">
        <preview :src="newData.url" :mime="newData.mime" height="120px" class="margin-right-sm"></preview>
        <div class="flex align-end">
          <div class="text-sm">
            <div class="margin-bottom-xs">文件名：{{ newData.name }}</div>
            <div class="margin-bottom-xs">大小：{{ newData.size }}</div>
            <div class="margin-bottom-xs">宽：{{ newData.width }}</div>
            <div>高：{{ newData.height }}</div>
          </div>
          <div>
            <a-button type="link" @click="download">下载</a-button>
            <a-button type="link" @click="del">删除</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let OSS = require('ali-oss')
let readableSize = require('readable-size')
import moment from 'moment'
import { Preview } from '@/components'
import { getAliyunOssSts } from '@/graphql/common.graphql'

export default {
  name: 'AreaUpload',
  components: {
    Preview
  },
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
    download() {
      console.log(this.newData)

      window.open(this.newData.url)
    },
    beforeUpload(file) {
      console.log('beforeUpload', file)

      return true
    },
    async handleChange(info) {
      console.log('handleChange', info)

      const that = this
      this.percent = 0
      this.loading = true
      const sts = await this.$apollo.query({
        query: getAliyunOssSts,
        variables: {}
      })
      console.log(sts)
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
          progress: function(p, checkpoint) {
            console.log(checkpoint)

            // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发继续上传。
            // tempCheckpoint = checkpoint
            that.percent = parseInt(p * 100)
          },
          // meta: { year: 2020, people: 'test' },
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
          height: ''
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

        console.log('newData', this.newData)

        that.$emit('change', this.newData)
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
