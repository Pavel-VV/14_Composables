<script setup>
import { ref, watch, watchEffect, onMounted, computed } from "vue";

const formInput = ref({
  email: '',
  password: '',
  agree: false,
})

const errorsForm = ref({
  email: null,
  password: null,
  agree: null,
})

const loading = ref(false);

const toastInfo = (msg)=>alert(msg);

// watchEffect(()=>{
//   errorsForm.value.email = formInput.value.email.includes("@") ? null : 'Please enter email';
//   errorsForm.value.password = formInput.value.password.length >= 8 ? null : 'Please enter more than 8 characters';
//   errorsForm.value.agree = formInput.value.agree ? null : 'Please checked agree';
// })

const errorEmail = computed(() => {
  return formInput.value.email.includes("@") ? null : 'Please enter email';
})

const errorPassword = computed(() => {
  return formInput.value.password.length >= 8 ? null : 'Please enter more than 8 characters';
})

const errorAgree = computed(() => {
  return formInput.value.agree ? null : 'Please checked agree';
})



onMounted(()=>{
  try {
    const raw = localStorage.getItem('signapDraft');
    if(!raw) return;
    const data = JSON.parse(raw);
    Object.assign(formInput.value, data)
  } catch {
    console.log(err);
  }
})

watch(formInput, () => {
  localStorage.setItem('signapDraft', JSON.stringify(formInput.value));
}, {deep: true},)

async function submitForm() {
  // if (errorsForm.value.email || errorsForm.value.password || errorsForm.value.agree) return
  if (errorEmail.value || errorPassword.value || errorAgree.value) return
  console.log('hi')
  loading.value = true;

  try{
    await new Promise(r => setTimeout(r, 4000))
    toastInfo('account created');
  } finally {
    formInput.value = {
      email: '',
      password: '',
      agree: false,
    }
    // localStorage.removeItem('signapDraft');
    loading.value = false;
    console.log(localStorage.getItem('signapDraft'))
  }
}


</script>

<template>
  <div class="wrap-form">
    <form class="form-style" @submit.prevent = "submitForm">
      <div>
        Form
      </div>
      <input class="input-form" v-model="formInput.email">
      <span class="error-form" v-if="errorEmail">Input email adress</span>

      <input class="input-form" v-model="formInput.password">
      <span class="error-form" v-if="errorPassword">{{ errorPassword }}</span>

      <label><input id="agree" type="checkbox" v-model="formInput.agree"> I agree</label>
      <span class="error-form" v-if="errorAgree">Checked agree</span>

      <button class="button-form" :disabled="loading" @click.prevent="submitForm">Create account</button>
    </form>
  </div>
</template>

<style scoped>
.wrap-form {
  display: flex;
  flex-direction: column;
  margin: 100px 200px;
  border: 2px solid black;
  padding: 20px;
}

.form-style {
  display: flex;
  flex-direction: column;
}

.input-form {
  margin-bottom: 20px;
}

.error-form {
  color: red;
  font-size: 15px;
}

.button-form {
  width: 200px;
  height: 40px;
  margin-top: 30px;
}

</style>
