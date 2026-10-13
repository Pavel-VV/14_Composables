<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  }
})

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
  <div>
    <label>{{labelCust}} <input :type="typeFild"/></label>
    <span></span>
  </div>
</template>

<style scoped>
</style>