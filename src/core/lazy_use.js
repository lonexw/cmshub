import Vue from 'vue'
import VueStorage from 'vue-ls'
import {
  Layout,
  ConfigProvider,
  Button,
  Form,
  Row,
  Col,
  Switch,
  Checkbox,
  Modal,
  message,
  notification,
  Alert,
  Icon,
  Input,
  Popover,
  Tooltip
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(ConfigProvider)
Vue.use(Icon)
Vue.use(Alert)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Popover)
Vue.use(message)
Vue.use(notification)
Vue.use(Tooltip)
Vue.use(VueStorage, {
  namespace: 'pro__',
  name: 'ls',
  storage: 'local'
})

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
