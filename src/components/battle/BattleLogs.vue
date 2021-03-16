<template>
  <div class="action-logs-box border border-dark">
    <div v-for="(actionLog, index) in actionLogs.slice().reverse().splice(0,6)" :key="index">
      <input
        type="text"
        :value="actionLog"
        :style="{backgroundColor : index % 2 === 0 ? 'skyblue' : 'orange'}"
        class="form-control action-log log-text"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        readonly
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleLog',
  props: {
    actionLogs: Array,
  },
};
</script>

<style scoped>
.action-log {
  text-align: center;
  margin-bottom: 5px;
  font-size: 0.8rem;
}

.log-text {
  max-width: 100%;
}

.action-logs-box {
  overflow-y: scroll;
  margin-bottom: 10px;
  min-height: 290px;
  padding: 20px;
  text-align: center;
}
</style>
