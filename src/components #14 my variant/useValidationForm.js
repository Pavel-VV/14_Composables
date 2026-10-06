import { ref, toValue } from 'vue';

export function useValidationForm(formInput){
  const errorsForm = ref({
    email: null,
    password: null,
    agree: null,
  })

  errorsForm.value.email = formInput.value.email.includes("@") ? null : 'Please enter email';
  errorsForm.value.password = formInput.value.password.length >= 8 ? null : 'Please enter more than 8 characters';
  errorsForm.value.agree = formInput.value.agree ? null : 'Please checked agree';

  return errorsForm;
}