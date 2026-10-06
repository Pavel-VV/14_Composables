<script setup>
import { ref, watch, watchEffect, onMounted, onBeforeMount } from "vue";
import { useValidationForm } from './useValidationForm';
import { useLocalStorage } from './useLocalStorage';

const formInput = {
  email: '',
  password: '',
  agree: false,
}

const key = 'signapDraft';

const errorsForm = ref({
  email: null,
  password: null,
  agree: null,
});


const loading = ref(false);

const toastInfo = (msg)=>alert(msg);

const { value: storData } = useLocalStorage(key, formInput);
useValidationForm(storData);

watch(storData, () => {
  const validationInput = useValidationForm(storData);

  Object.assign(errorsForm.value, validationInput.value);

  },
  {deep: true},
);

async function submitForm() {
  if (errorsForm.value.email || errorsForm.value.password || errorsForm.value.agree) return
  loading.value = true;

  try{
    await new Promise(r => setTimeout(r, 4000))
    toastInfo('account created');
  } finally {
    storData.value.email = '';
    storData.value.password = '';
    storData.value.agree = false;
    loading.value = false;
    console.log(loading.value)
  }
}


</script>

<template>
  <div class="wrap-form">
    <form class="form-style" @submit.prevent = "submitForm">
      <div>
        Form
      </div>
      <input class="input-form" v-model="storData.email">
      <span class="error-form" v-if="errorsForm.email">{{ errorsForm.email }}</span>

      <input class="input-form" v-model="storData.password">
      <span class="error-form" v-if="errorsForm.password">{{ errorsForm.password }}</span>

      <label><input id="agree" type="checkbox" v-model="storData.agree"> I agree</label>
      <span class="error-form" v-if="errorsForm.agree">{{ errorsForm.agree }}</span>

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
