import Vue from 'vue'
import App from './index'
import './index.json';
const app = new Vue(App)
app.$mount()
export default {
    config:{
        "usingComponents":{
            "wxc-toast":"../../../packages/@minui/wxc-toast/dist/index",
            "wxc-button":"../../../packages/@minui/wxc-button/dist/index",
            "wxc-icon":"../../../packages/@minui/wxc-icon/dist/index",
            "wxc-rate":"../../../packages/@minui/wxc-rate/dist/index",
        }
    }
}
