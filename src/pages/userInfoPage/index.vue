<template>
  <div class="userinfo-page-wrap">
    <header>
      <span class="userinfo-img">
          <img :src="userInfo.avatarUrl" alt="用户头像" srcset="">
      </span>
  </header>
  <h2>任务清单</h2>
  <div class="all-task-list">
    <taskCard v-for="(obj,index) in taskInfosList" v-bind:key="obj.id" :obj="obj" type="userInfoPage" :allData="taskInfosList" :index="index"/>
  </div>
  </div>
</template>

<script>
import taskCard from '../../components/taskCard/index.vue';
export default {
  data () {
    return {
      userInfo:{},
      taskInfosList:[],
    }
  },
  // store,
  components:{
        taskCard,
  },

  methods: {
  },

  created () {
  },
  mounted(){
    // 获取当前用户所有的任务信息
    this.taskInfosList=[
            {
                id:1,
                name:'1fff',
                from:new Date(),
                to:new Date(),
                actualEndTime:new Date(),
                status:'已完成',
                satisfiedNum:100,
                desc:'a',
            },
            {
                id:2,
                name:'2fff',
                from:new Date(),
                to:new Date(),
                actualEndTime:new Date(),
                status:'已完成',
                satisfiedNum:100,
                desc:'b',
            },
            {
                id:3,
                name:'唉呀妈呀',
                from:new Date(),
                to:new Date(),
                actualEndTime:new Date(),
                status:'已完成',
                satisfiedNum:100,
                desc:'a',
            },
            {
                id:4,
                name:'哈哈哈',
                from:new Date(),
                to:new Date(),
                actualEndTime:new Date(),
                status:'已完成',
                satisfiedNum:100,
                desc:'b',
            }
        ]
  },
  beforeMount(){
        this.userInfo=this.$store.state.userinfo;
        // console.log(this.$store.state);
  },
}
</script>

<style scoped lang="scss">
  .userinfo-page-wrap{
    header{
        width: 180rpx;
        height: 140rpx;
        margin:20rpx auto;
        .userinfo-img{
            img{
                width:160rpx;
                height:160rpx;
                border-radius:50%;
            }
        }
    }
    h2{
      margin:80rpx 0px;
      margin-bottom:60rpx;
      text-align:center;
      border:1px solid #eee;
      padding:20rpx 0px;
      font-size:34rpx;
      font-weight:700;
      color:white;
      background:#ffc200;
    }
    
  }
</style>
