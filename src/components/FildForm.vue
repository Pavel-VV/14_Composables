<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  error: {
    // type: String || null,
    required: true,
  },
  fildState: {
    type: Boolean,
    required: true,
  },
})
console.log(props.fildState)
console.log(props.error)

const labelCust = computed(() => {
  if(props.label === 'agree') return 'I agree'
  return props.label
})

const typeFild = computed(() => {
  if(props.label == 'agree') return 'checkbox'
  return 'text'
})

const typeCheck = "checkbox"

</script>

<template>
  <div class="fild-style">
    <label>{{labelCust}} <input :type="typeFild"/></label>
    <span class="error-form" v-if="error && fildState">{{error}}</span>
  </div>
</template>

<style scoped>
.error-form {
  color: red;
  font-size: 15px;
}

.fild-style {
  display: flex;
  flex-direction: column;
}
</style>