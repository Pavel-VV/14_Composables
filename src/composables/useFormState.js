import { ref, computed } from 'vue';

export function useFormState(fields){
  const state = ref(
    Object.keys(fields).reduce((acc, key) => {
      acc[key] = {
        touched: false,
        blurred: false,
      };
      return acc;
    }, {})
  );

  function markTouched(field){
    state.value[field].touched = true
  }

  function markBlurred(field){
    // debugger;
    state.value[field].touched = true;
    state.value[field].blurred = true;
  }

  function resetField(field){
    state.value[field].touched = false;
    state.value[field].blurred = false;
  }

  function resetAll(){
    Object.keys(state.value).forEach((field) => {
      state.value[field].touched = false;
      state.value[field].blurred = false;
    })
  }

  function isTouched(field){
    return state.value[field].touched
  }

  function isBlurred(field){
    return state.value[field].blurred
  }

  function hasAnyTouched(){
    Object.values(state.value).some(fieldState => fieldState.touched)
  }

  function areAllTouched(){
    Object.values(state.value).every(fieldState => fieldState.touched)
  }

  function markAllBlurred(){
    Object.keys(state.value).forEach(key => {
      const field = key;
      state.value[field].blurred = true;
      state.value[field].touched = true;
    })
  }

  function blurredClick(bulean){
    state.value.email.blurred = bulean
  }
  const handlers = computed(() => {
    return Object.keys(fields).reduce((acc, key) => {
      // debugger
      const field = key
      acc[field] = {
        focus: () => markTouched(field),
        blur: () => markBlurred(field),
      };
      return acc;
    }, {})
  })

  // const handlers = computed(() => {
  //   return Object.keys(fields).reduce(
  //     (acc, key) => {
  //       const field = key
  //       acc[field] = {
  //         focus: () => markTouched(field),
  //         blur: () => markBlurred(field),
  //       }
  //       return acc
  //     },
  //     {}
  //   )
  // })

  return {
    state,
    handlers,
    markTouched,
    markBlurred,
    markAllBlurred,
    resetField,
    resetAll,
    isTouched,
    isBlurred,
    hasAnyTouched,
    areAllTouched,
    blurredClick,
  }
}