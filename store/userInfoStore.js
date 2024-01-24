import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfoStore = defineStore("userInfoStore", () => {
  const personsData = ref([]);

  const showLoader = ref(false);

  const modalUserInfo = ref({});

  return {
    personsData,
    showLoader,
    modalUserInfo,
  };
});
