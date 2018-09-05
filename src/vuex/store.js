// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo:null,
    willDeleteTaskState:false,
    addTaskState:false,
    endDeleteState:false,//退出删除状态
    isShowAddWarning:false,//当用户新添加任务时，如果没有按要求填写，则显示警示框,
    isShowTimePickerState:false,//是否在主页展示timepicker，默认不展示。
    completeTaskState:false,
  },
  mutations: {
    setUserInfo:(state,info)=>{
      const obj=state;
      obj.userinfo=info;
    },
    willDeleteTask:(state,para)=>{
      const obj=state;
      obj.willDeleteTaskState=para;
    },
    endDeleteTask:(state,para)=>{
      state.endDeleteState=para;
    },
    addTask:(state,para)=>{
      state.addTaskState=para;
    },
    showAddWarning(state,para){
      state.isShowAddWarning=para;
    },
    handleTimePicker(state,para){
      state.isShowTimePickerState=para;
    },
    completeTask(state,para){
      state.completeTaskState=para;
    }
  }
})

export default store
