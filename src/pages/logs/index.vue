<template>
  <div>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <taskCard :text="(index + 1) + ' . ' + log"></taskCard>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import taskCard from '@/components/taskCard/index.vue'

export default {
  components: {
    taskCard
  },

  data () {
    return {
      logs: []
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
