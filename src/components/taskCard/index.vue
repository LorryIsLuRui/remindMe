<template>
  <div class="task-card-panel">
       

    <p class="task-name">
      <span class="label">任务</span>
      <!-- 表示添加task显示 input，用户输入 -->
      <input type="text" v-if="obj.id==0" required v-model="taskName">
      
      <span v-else>
        <span>{{obj.name}}</span>
        <wxc-icon color="#fff" size="36" type="search"
                  v-if="type!='userInfoPage'"  @click="showCurrTaskInfo" class="show-curr-task-info-btn"></wxc-icon>
        <wxc-icon color="#fff" size="36" type="check"
                  v-if="type!='userInfoPage'"  @click="completeCurrTask" class="complete-curr-task-btn"></wxc-icon>
      </span>
    </p>
    <p class="from">
      <span class="label">From：</span>
      <!-- 时间选择器 只有是增加任务、编辑任务时才显示-->
        <picker v-if="obj.id==0" mode="time" :value="fromTime" start="00:01" end="21:01" @change="bindStartTimeChange" style="display:inline-block;">
            <view class="picker">
              <span>{{fromTime}}</span>
            </view>
        </picker>
      <!-- <input type="time" v-if="obj.id==0" required v-model="fromTime" @click="showTimePicker" class="section_title"> -->
      <span v-else>{{obj.from}}</span>
    </p>
    <p class="to">
      <span class="label">To：</span>
      <!-- 时间选择器 只有是增加任务、编辑任务时才显示-->
        <picker v-if="obj.id==0" mode="time" :value="toTime" start="23:49" end="21:01" @change="bindEndTimeChange" style="display:inline-block;">
            <view class="picker">
              
              <span>{{toTime}}</span>
            </view>
        </picker>
      
      <span v-else>{{obj.to}}</span>
    </p>
    
    <p class="status" v-if="obj.id!=0">
      <span class="label">状态</span>
      <!-- <span v-if="obj.id==0">{{isCreating}}</span> -->
      <span>{{obj.status}}</span>
    </p>
    <p v-if="type=='userInfoPage'" class="satisfied-num-p">
      <span class="label">
        满意度
      </span>
      <span>
        {{obj.satisfiedNum}}
      </span>
    </p>
    <p v-if="obj.id==0" @click="closeAddTask" class="btn-class-complete-add">
       <wxc-icon color="#fff" size="36" type="right"></wxc-icon>
    </p>
    <p v-if="isDeleting==true" @click="deleteTask" class="btn-class-delete">
       <wxc-icon color="#fff" size="36" type="close"></wxc-icon>
    </p>
    <p v-if="type=='userInfoPage'" class="good-logo">
      优秀
    </p>
  </div>
  
</template>

<script>
export default {
  data(){
    return {
      isCreating:'creating',
      taskName:'',
      fromTime:'0:01',
      toTime:'23:59',
      type:String,
      time:'12:01',
      timePickerClick:0,//0 表示start时间  1 表示end
      // isShowWarning:false,
    }
  },
  computed:{
    isDeleting(){
      return this.$store.state.willDeleteTaskState; 
    },
  },
  props: {
    obj:{
      id:Number,
      name:String,
      from:Date,
      to:Date,
      actualEndTime:Date,
      status:String,
      satisfiedNum:Number,
      desc:String,
    },
    type:String,
    allData:Array,
    index:Number,
  },
  methods:{
    deleteTask(){
      console.log(this.index);
      this.allData.some((ele,index)=>{
        if(index===this.index){
          this.allData.splice(index,1);
          this.$store.commit('endDeleteTask',true);
          this.$store.commit('willDeleteTask',false);
          return true;
        }
      })
    },
    closeAddTask(){
      //先检测用户是否填完所有新任务必填内容,若所有内容合格，
      // 则更改新任务状态为pending，隐去此按钮，并向总的数据数组push当前任务内容
      if(!this.taskName||this.fromTime==undefined||this.toTime==undefined){
        console.log("please input");
        this.$store.commit('showAddWarning',true);//填写内容不合格，显示警示框
      }else{
        this.isCreating='pending';
        this.allData.shift();
        this.allData.push({
          id:this.allData.length,
          name:this.taskName,
          from:this.fromTime,
          to:this.toTime,
          actualEndTime:this.toTime,
          status:'pending',
          satisfiedNum:0,
          desc:'new',
        });
        this.$store.commit('addTask',false);
        this.$store.commit('handleTimePicker',false);

        // console.log(this.allData);
      }
      
    },
    showCurrTaskInfo(){
      // console.log('this.$store.state.willDeleteTaskState----'+this.$store.state.willDeleteTaskState);
      // console.log('this.$store.state.addTaskState----'+this.$store.state.addTaskState);;
        if(this.$store.state.willDeleteTaskState||this.$store.state.addTaskState){
            return;
        }else{
            //进入当前任务详情页
            console.log('showCurrTaskInfo');
            const url = '../taskInfoPage/main?para='+this.obj.name;
            wx.navigateTo({ url })
        }
    },
    completeCurrTask(){
      console.log("完成当前任务");
      // console.log(this.obj.to);
      const now=new Date();
      // if(now<new Date(this.obj.to)){
        this.$store.commit('completeTask','advance');
        // this.destory();
        // this.deleteTask();当完成此任务时，隐藏掉此组件，status改为completed

      // }
    },
    bindStartTimeChange: function(e) {
      this.fromTime=e.target.value;
    },
    bindEndTimeChange: function(e) {
      this.toTime=e.target.value;
    },
  },
  beforeCreate(){
    // console.log(this.$store.state);
  },
  created(){
    // console.log(this.$refs);
  },
  mounted(){
    console.log('mounted');
    console.log(this.obj);
  },
  beforeDestory(){
    alert("删除此任务");
  },
  destory(){
    alert("destory");
  }
}
</script>

<style lang="scss">
.task-card-panel{
  position:relative;

  font-size: 29rpx;
  background: #ffc200;
  width:90%;
  font-size:29rpx;
  background:#ffc200;
  margin:auto;
  margin-bottom:60rpx;
  // padding:20rpx 0px;
  padding:20rpx;
  box-shadow:1px 1px 5px rgba(0,0,0,.5);
  border-radius:20rpx;
  box-sizing:border-box;


  p,div{
    height:60rpx;
    line-height: 60rpx;
    .label{
      display: inline-block;
      width:130rpx;
      text-align: left; 
      padding-left:20rpx;

    }
    input{
      border-bottom:1px solid black;
      // width:100rpx;
      display:inline-block;


    }
    
    &.btn-class-delete,&.btn-class-complete-add{
      text-align:center;

      background:rgba(0,0,0,.5);
      width:160rpx;
      margin:auto;
      margin-top:40rpx;
      line-height:50rpx;
      height:50rpx;
      border-radius:10rpx;

    }
    &.good-logo{
      position:absolute;
        z-index: 1000;

      width:140rpx;
      height:140rpx;
      font-size:38rpx;
      border:6rpx solid red;
      border-radius:50%;
      top:-30rpx;
      right:-30rpx;
      line-height:140rpx;
      transform:rotateZ(50deg);
      font-weight:700;
      text-align:center;

    }
    span{
      .show-curr-task-info-btn,.complete-curr-task-btn{
        display: inline-block;
        width: 80rpx;
        height: 80rpx;
        margin-left: 40rpx;
      }
    }
  }
}
</style>
