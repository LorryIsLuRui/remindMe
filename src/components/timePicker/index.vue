<template>
    <div class="time-picker-wrap">
        <!-- <picker mode="time" value="{{time}}">

        </picker> -->
        <!-- <div class="year">
            <span  v-for="(ele,index) in displayYearsArray" v-bind:key="index">hxnikujwdeheijkfchcbc</span>
            <p v-for="(ele,index) in displayYearsArray" v-bind:key="index">{{index}}</p>
        </div>
        <div class="month">
            <p v-for="(ele,index) in displayMonthsArray" v-bind:key="index">{{ele}}</p>
        </div>
        <div class="date">
            <p v-for="(ele,index) in displayDatesArray" v-bind:key="index">{{ele}}</p>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        // currTime:new Date(),
        return {
            
        }
    },
    computed:{
        // displayYearsArray(){
        //     currTime=new Date();
        //     const nowYear=currTime.getFullYear();
        //     return [nowYear-1,nowYear,nowYear+1];
        // },
        // displayMonthsArray(){
        //     currTime=new Date();
        //     const nowMonth=currTime.getMonth();
        //     return [nowMonth-1,nowMonth,nowMonth+1];
        // },
        // displayDatesArray(){
        //     currTime=new Date();
        //     const nowDate=currTime.getDate();
        //     return [nowDate-1,nowDate,nowDate+1];
        // }
    },
    mounted(){
        console.log("aaqs");
        console.log(this.displayYearsArray);
        this.displayYearsArray=[1,2,3,4,5];
    }
}
</script>

<style lang="scss" scoped>
    .time-picker-wrap{
        width: 100%;
        display: none;
        position: absolute;
        z-index: 10000000;
        bottom: 0;;
        height: 240rpx;
        border: 1px solid yellowgreen;
        color: black;
        div{
            border: 1px solid red;
            flex: 1;
        }
    }
</style>


