<template>
  <div>
    <p class="error-message" v-if="hasError">{{errorMessage}}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorValidation',
  props: {
    hasError: Boolean,
    errorMessage: String,
  },

};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
