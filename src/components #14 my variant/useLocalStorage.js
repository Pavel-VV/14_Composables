import { ref, toValue, onMounted, onBeforeMount, watch, watchEffect } from 'vue';

export function useLocalStorage(key, formData) {
  // console.log('hi')
  const value = ref(formData);

  onBeforeMount(() => {
    try{
    // watchEffect(() => {
    //   const hasData = window.localStorage.getItem(toValue(key));
    //   if(!hasData) return;

    //   const storData = JSON.parse(hasData);
    //   Object.assign(value.value, storData);
    // })
    (() => {
      const hasData = window.localStorage.getItem(toValue(key));
      if(!hasData) return;

      const storData = JSON.parse(hasData);
      Object.assign(value.value, storData);
    })();


    watchEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value.value))
    });

    // watch(value.value, () => {
    //   console.log('hi')
    //   localStorage.setItem(key, JSON.stringify(value.value))
    // }, {deep: true});

    }catch{
      console.log('err');
    }

  })

  return { value }
}