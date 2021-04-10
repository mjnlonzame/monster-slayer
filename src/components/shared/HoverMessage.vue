<template>
  <div class="tool-tip" v-if="message">
    <slot>
    </slot>
    <span class="tool-tip-text">{{this.message}}</span>
  </div>
</template>

<script>

export default {
  name: 'HoverMessage',
  props: {
    message: String,
  },

};
</script>

<style scoped>
.inline-icon {
  display: inline-block;
}

.tool-tip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tool-tip .tool-tip-text {
  visibility: hidden;
  width: 250px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tool-tip:hover .tool-tip-text {
  visibility: visible;
}
</style>
