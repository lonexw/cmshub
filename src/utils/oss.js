import { fileClient } from '@/utils/fileUpload'

// 文件扩展名提取
export function fileType(fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1)
}

export function ossUpload(file) {
  return new Promise((resolve, reject) => {
    fileClient
      .uploadFile({
        localfile: file
      })
      .then(fileResult => {
        const logo = fileResult.res.requestUrls[0]
        let urlResult = logo
        if (urlResult) {
          const data = {
            url: urlResult,
            type: file.name ? fileType(file.name) : 'html'
          }
          resolve(data)
        } else {
          reject('上传失败')
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
