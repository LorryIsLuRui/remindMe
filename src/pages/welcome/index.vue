<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <p class="nick-name-class">{{userInfo.nickName}}</p>
      </div>
    </div>

    <h1>年纪大了记忆力不好？总是忘记要做的事？拖延症越来越严重？欢迎Remind Me，一款老年人必备且必置顶的小程序</h1>
    <button v-if="showLoginBtn" open-type="getUserInfo" @getuserinfo="getUserInfo">Start</button>
    <a v-if="!showLoginBtn" href="../index/main" class="start">Start</a>
  </div>
</template>

<script>
import taskCard from '@/components/taskCard/index.vue'
// import store from "../../vuex/store.js";
import { mapState,mapActions } from "vuex";
export default {
  data () {
    return {
      motto: 'GO',
      userInfo: {},
    }
  },
  computed: {
    showLoginBtn(){
      return true;
    },
  },
  // store,
  components: {
    taskCard
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo (e) {
      // 调用登录接口
      const url = '../index/main'
      if(!this.$store.state.userinfo && e.mp.detail.userInfo){
        console.log(e.mp.detail);
        this.userInfo = e.mp.detail.userInfo;
        this.$store.commit('setUserInfo',this.userInfo);
        wx.navigateTo({ url });
      }
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         console.log(res);
              //  this.userInfo = res.userInfo;
              // this.$store.commit('setUserInfo',res.userInfo);
      //       },
      //       fail:(err)=>{
      //         console.log(err);
      //       }
      //     })
      //   },
      //   fail:(err)=>{
      //     console.log(err);
      //   }
      // })
    },
    clickHandle (msg, ev) {
      // console.log('clickHandle:', msg, ev);
      // console.log(this.userInfo);
    }
  },

  created () {
    if(this.$store.state.userinfo){
      this.showLoginBtn=false;
    }else{
      this.showLoginBtn=true;
    }
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  mounted(){
    
  },
}
</script>

<style scoped>
h1{
  margin: 50px auto;
  font-size: 35rpx;
  padding:50rpx;
    color:#666;
}
.nick-name-class{
  font-size:30rpx;


}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.start {
  display: inline-block;
  margin: 0px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
