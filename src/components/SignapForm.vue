<script setup>
import { ref, watch, watchEffect } from "vue";
// import { useValidationForm } from '../composables/useValidationForm';
import { useDraftState } from '../composables/useDraftState';
import { useValidation, validationRules } from '../composables/useValidation';
import { useFormState } from '../composables/useFormState';

const formInput = {
  email: '',
  password: '',
  agree: false,
}

const key = 'signapDraft';

const form = useDraftState(key, formInput);

// const errorsForm = ref({
//   email: null,
//   password: null,
//   agree: null,
// });

const { state: formState, handlers, markAllBlurred, resetAll, isBlurred, blurredClick, markBlurred, markTouched } = useFormState(form.value);

const { errors, isValid, validateAll } = useValidation(form.value, {
  email: [validationRules.email('Please enter email')],
  password: [validationRules.minLength(8, 'Please enter more than 8 characters')],
  agree: [validationRules.required('Please checked agree')],
});

const loading = ref(false);

const toastInfo = (msg)=>alert(msg);

// const { value: storData } = useLocalStorage(key, formInput);
// useValidationForm(storData);
// useValidationForm(form);

// watch(form, () => {
//   const validationInput = useValidationForm(form);

//   Object.assign(errorsForm.value, validationInput.value);

//   },
//   {deep: true},
// );
console.log(isBlurred("email"))
console.log(formState.value.password.blurred)
async function submitForm() {
  markAllBlurred();
  console.log(isValid.value)
  if(!isValid.value) return
  loading.value = true;

  try{
    await new Promise(r => setTimeout(r, 4000))
    toastInfo('account created');
  } finally {
    form.value.email = '';
    form.value.password = '';
    form.value.agree = false;
    loading.value = false;
    resetAll();
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
      <input class="input-form" v-model="form.email" v-on="handlers.email"/>
      <span class="error-form" v-if="errors.email && formState.email.blurred">{{ errors.email }}</span>

      <input class="input-form" v-model="form.password" v-on="handlers.password">
      <span class="error-form" v-if="errors.password && formState.password.blurred">{{ errors.password }}</span>

      <label><input id="agree" type="checkbox" v-model="form.agree"> I agree</label>
      <span class="error-form" v-if="errors.agree && formState.agree.blurred">{{ errors.agree }}</span>

      <button class="button-form" :disabled="loading" @click.prevent="submitForm">Create account</button>
    </form>
    <button @click="blurredClick(false)">click</button>
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
