<template>
    <div class="index-wrap">
        <div class="clearFloat">
            <header>
                <span class="userinfo-img" @click="toUserInfoPage">
                    <img :src="userInfo.avatarUrl" alt="用户头像" srcset="">
                </span>
            </header>
        </div>
        <div class="btn-group">
                <wxc-icon type="add"  size="60rpx" @click="addTask" v-bind:class="{btnAddClass:isAdding}"></wxc-icon>
                <wxc-icon type="no" size="60rpx"  @click="deleteTask" v-bind:class="{btnDeleteClass:isDeleting}"></wxc-icon>
                <wxc-icon type="star-active" size="60rpx"  @click="editTask"></wxc-icon>
        </div>
        <div class="task-list">
            <!-- type="index"表示是在主页显示的card =》 所以只显示 任务名称、起始时间、当前状态. .-->
            <taskCard v-for="(obj,index) in taskInfosList" v-bind:key="obj.name" :obj="obj" :type="showWhichCard" :allData="taskInfosList" :index="index"/>
        </div>

        <!-- 警示框 -->

        <wxc-toast :is-show="isShowAddWarning" text="请按照要求输入新任务内容~" @click="hideWarningBox"></wxc-toast>

        <wxc-toast :is-show="completeTask==='advance'" text="恭喜你提前完成此任务~" @click="handleCompleteTask('advance')"></wxc-toast>

        <wxc-toast :is-show="completeTask==='normal'" text="恭喜你完成此任务" @click="handleCompleteTask('normal')"></wxc-toast>

        <!-- timepicker -->
        <timePicker v-if="isShowTimePicker"></timePicker>

        <!-- 用户点击完成某条任务时弹出遮罩层，遮罩层上显示star组件 -->
        <!-- <div class="rate-wrap" @click="countRate">
            <wxc-rate value="20" count="5"></wxc-rate>
            <p>关闭</p>
        </div> -->
    </div>
</template>
 
<script>
import taskCard from '../../components/taskCard/index.vue';
import timePicker from '../../components/timePicker/index.vue';
import store from "../../vuex/store.js";
export default {
    data(){
        return {
            userInfo:{},
            toast:{
                show:false,
            },
            taskInfosList:[],
            isDeleteStatus:false,//控制用户是否点击了删除按钮
            showWhichCard:'indexPage',
            score:100,
        }
    },
    computed:{
        isDeleting(){
            return this.$store.state.willDeleteTaskState;
        },
        isAdding(){//用户是否点击了添加按钮，若点击了此时不能做任何操作。
            this.showWhichCard='indexPageAdd'
            return this.$store.state.addTaskState;
        },
        isShowAddWarning(){
            return this.$store.state.isShowAddWarning;
        },
        isShowTimePicker(){
            return this.$store.state.isShowTimePickerState;
        },
        completeTask(){
            return this.$store.state.completeTaskState;
        }
    },
    components:{
        taskCard,
        timePicker,  
    },
    methods:{
        toUserInfoPage(){
            if(this.isDeleting||this.isAdding){
                return;
            }else{
                console.log("toUserInfoPage");
                const url = '../userInfoPage/main'
                wx.navigateTo({ url })
            }
            
        },
        addTask(){
            if(this.isDeleting||this.isAdding){
                return;
            }else{
                console.log("addTask");
                this.$store.commit('addTask',true);

                this.isAdding=true;
                this.taskInfosList.unshift({
                    id:0,
                    name:'',
                    from:new Date(),
                    to:new Date(),
                    actualEndTime:new Date(),
                    status:'',
                    satisfiedNum:0,
                    desc:'',
                });
            }
        },
        deleteTask(e){
            if(this.isAdding){
                return;
            }else{
                this.isDeleteStatus=!this.$store.state.willDeleteTaskState;
                if(this.isDeleteStatus){
                    this.$store.commit('willDeleteTask',true);
                    this.$store.commit('endDeleteTask',false);
                    
                }else{
                    this.$store.commit('endDeleteTask',true);
                    this.$store.commit('willDeleteTask',false);
                }
            }
             
        },
        editTask(){
            if(this.isDeleting||this.isAdding){
                return;
            }else{
                console.log("editTask");
            }
            
        },
        hideWarningBox(){
            this.$store.commit('showAddWarning',false);
        },
        handleCompleteTask(para){
            this.$store.commit('completeTask',null);
        }
        // countRate(){
        //     console.log("star");
        //     //mpvue不支持在组件上绑定事件！！！

        // },
    },
    mounted(){
        // 获取当前用户所有未完成的任务
        console.log(this.$store.state.isShowAddWarning);
        this.isDeleteStatus=this.$store.state.willDeleteTaskState;
        this.taskInfosList=[
            {
                id:1,
                name:'1fff',
                from:new Date(),
                to:new Date(),
                actualEndTime:new Date(),
                status:'pending',
                satisfiedNum:0,
                desc:'a',
            },
            {
                id:2,
                name:'2fff',
                from:new Date(),
                to:new Date(),
                actualEndTime:new Date(),
                status:'pending',
                satisfiedNum:0,
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

<style lang="scss" scoped>
@import '../../common/common.css';
.index-wrap{
    header{
        width: 70rpx;
        height: 70px;
        position:fixed;
        z-index: 1000;
        right:10px;
        top: 100px;
        .userinfo-img{
            img{
                width:60rpx;
                height:60rpx;
                border-radius:50%;
            }
        }
    }
    .btn-group{
        width:100%;
        height:100rpx;
        line-height:100rpx;
        position:absolute;
        top:20rpx;
        display:flex;

        wxc-icon{
            flex:1;
            text-align:center;
            &.btnDeleteClass,&.btnAddClass{
                background:#eee;
                border-radius:50rpx 50rpx 0 0;

            }
        }
    }
    .task-list{
        margin-top: 150rpx;
        border-top:1px solid #eee;
        padding-top:40rpx;
    }
    
}
</style>



