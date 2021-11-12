import Vue from 'vue'
import { Aside, Container, Header, Main, Message, MessageBox, Tree, Switch } from 'element-ui'

// 将组件全局挂在到VUe原形实例
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Tree)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Switch)
