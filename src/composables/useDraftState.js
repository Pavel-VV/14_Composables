import { useLocalStorage } from "@vueuse/core";

export function useDraftState(key, initialState) {
  return useLocalStorage(key, initialState, {
    serializer: {
      read: (value) => {
        try {
          return JSON.parse(value);
        } catch {
          return initialState;
        }
      },
      write: (value) => JSON.stringify(value)
    }
  })
}