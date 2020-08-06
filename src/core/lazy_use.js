import Vue from 'vue'
import VueStorage from 'vue-ls'
import {
  Layout,
  Pagination,
  Progress,
  Upload,
  Table,
  Empty,
  Divider,
  Dropdown,
  ConfigProvider,
  Button,
  Form,
  FormModel,
  Row,
  Col,
  Switch,
  Checkbox,
  Modal,
  Menu,
  message,
  notification,
  Alert,
  Icon,
  Input,
  Popover,
  Tooltip,
  Avatar,
  Select,
  List
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Progress)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(Empty)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(ConfigProvider)
Vue.use(Icon)
Vue.use(Alert)
Vue.use(Modal)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Popover)
Vue.use(Avatar)
Vue.use(Select)
Vue.use(List)
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
