import { ref, computed, watchEffect } from 'vue';

export function useValidation(data, rules) {
  const errors = ref(
    Object.keys(data).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    },{})
  )

  async function validateFild(fild){
    const fildRules = rules[fild];
    if(!fildRules){
      errors.value[fild] = null;
      return true;
    }

    for(const rule of fildRules) {
      let isValidFild = await rule.validator(data[fild]);
      if(!isValidFild){
        errors.value[fild] = rule.message;
        return false;
      }
    }

    errors.value[fild] = null
    return true
  }

  function validateAll(){
    let isValid = true;

    for(const fild in data){
      if(!validateFild(fild)){
        isValid = false
      }
    }
    return isValid
  }
  const isValid = computed(() => {
    console.log(Object.values(errors.value).every((error) => error === null))
    return Object.values(errors.value).every((error) => error === null)
  })

  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => error !== null)
  })

  watchEffect(() => {
    validateAll()

    // console.log(errors.value)
    // console.log(isValid.value);
  })

  return {
    errors,
    isValid,
    hasErrors,
    validateAll,
    validateFild,
  }
}

export const validationRules = {
  email: (message = 'invalid email address') => ({
    validator: async (value) => {
      await new Promise(r => setTimeout(r, 5000));
     return /.+@.+\..+/.test(value)
    },
    message,
  }),

  // minLength: (min, message) => ({
  //   validator: (value) => value.length >= min,
  //   message: message || `Minimum length is ${min} characters`,
  // }),

  minLength: (min, message) => ({
   async validator (value) {
      await new Promise((r) => setTimeout(r, 5000))
      // debugger;
      return value.length >= min
    },
    message: message || `Minimum length is ${min} characters`,
  }),

  required: (message = 'You must agree') => ({
    validator: (value) => value === true,
    message,
  })
}
