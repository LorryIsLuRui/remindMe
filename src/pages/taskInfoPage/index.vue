<template>
    <div class="task-info-wrap">
        <ul>
            <li>
                <span class="label">任务：</span>
                <span>{{taskName}}</span>
            </li>
            <li>

            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            taskName:'',
        }
    },
    mounted(){
        this.taskName=this.$root.$mp.query.para;
        console.log(this.$root.$mp.query.para);//查看当前任务名称
    }
}
</script>
<style lang="scss" scoped>
    .task-info-wrap{
        width: 100%;
        padding: 100rpx;
        font-size: 30rpx;
        .label{
            display: inline-block;
            width: 90rpx;
            
            margin-right: 20rpx;
        }
    }
</style>


