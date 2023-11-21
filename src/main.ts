import { createApp } from 'vue'
import antd from 'ant-design-vue'

import router from './router'
import App from './App.vue'
import i18n from './lang'
import store from './store'
import './styles/index.less'

const app = createApp(App)

app.use(i18n).use(antd).use(store).use(router)

app.mount('#app')
