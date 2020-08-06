import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('field_type', function(value) {
  if (value === 'SINGLE_TEXT') {
    return '单行文本'
  } else if (value === 'MULTI_TEXT') {
    return '多行文本'
  } else if (value === 'RICH_TEXT') {
    return '富文本'
  } else if (value === 'ASSET') {
    return '附件'
  } else if (value === 'REFERENCE') {
    return '关联模型'
  }
})
