import { axios } from '@/utils/request'

export function uploadImage(parameter) {
  return axios({
    url: 'api/upload-image',
    method: 'post',
    data: parameter
  })
}
