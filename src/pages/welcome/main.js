import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config:{
        "usingComponents":{
            "wxc-toast":"../../../packages/@minui/wxc-toast/dist/index"
        }
    }
}
