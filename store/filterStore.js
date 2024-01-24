import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const personsDataFilter = ref([]);

  const searchRequest = ref("");

  const doFiltering = (originArr, searchCriterion, ...fields) => {
    return originArr.filter((user) => {
      return fields.some((field) => {
        const fieldValue = user[field] && user[field].toString().toLowerCase();
        return fieldValue && fieldValue.includes(searchCriterion.toLowerCase());
      });
    });
  };

  return {
    personsDataFilter,
    searchRequest,
    doFiltering,
  };
});
