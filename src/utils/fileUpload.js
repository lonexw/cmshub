import { getAliyunOssSts } from '@/graphql/common.graphql'
import apolloProvider from '@/utils/apolloProvider'

const OSS = require('ali-oss')
export const fileClient = {
  client: null,
  createClient: function(data) {
    if (!this.client) {
      this.client = getClient(data)
    }
    return this
  },
  uploadFile: function(dataF) {
    return new Promise((resolve, reject) => {
      const nowName = `project/${new Date().getTime()}`
      apolloProvider.defaultClient
        .query({
          query: getAliyunOssSts,
          variables: {}
        })
        .then(data => {
          const aliyunOssSts = data.data.getAliyunOssSts
          const uploadFileObj = aliyunOssSts
          this.createClient(uploadFileObj)
          this.client
            .put(nowName, dataF.localfile)
            .then(() => {
              resolve(this.client.get(nowName))
            })
            .catch(err => {
              reject(err)
              console.error('error: %j', err)
            })
        })
    })
  }
}

const getClient = function(getAlOssSts) {
  const data = getAlOssSts
  return new OSS({
    region: data.region,
    // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
    accessKeyId: data.access_key_id,
    accessKeySecret: data.access_key_secret,
    stsToken: data.sts_token,
    bucket: data.bucket
  })
}

export const getFileURL = file => {
  let getUrl = null
  if (window.createObjectURL !== undefined) {
    // basic
    getUrl = window.createObjectURL(file)
  } else if (window.URL !== undefined) {
    // mozilla(firefox)
    getUrl = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    getUrl = window.webkitURL.createObjectURL(file)
  }
  return getUrl
}
