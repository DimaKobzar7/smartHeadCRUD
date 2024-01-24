<script setup>
import { watch } from "vue";
import { useUserInfoStore } from "../../store/userInfoStore";
import { useFilterStore } from "../../store/filterStore";

const userInfoStore = useUserInfoStore();
const filterStore = useFilterStore();

watch(
  () => filterStore.searchRequest,
  () => {
    filterStore.personsDataFilter = filterStore
      .doFiltering(
        userInfoStore.personsData,
        filterStore.searchRequest,
        "first_name",
        "email",
        "last_name"
      )
      .reverse();
  }
);
</script>

<template>
  <div class="filter">
    <label class="filter-label">
      <input
        class="filter-input"
        type="text"
        placeholder="Enter your search term here"
        v-model="filterStore.searchRequest"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  max-width: 300px;
  width: 100%;
  &-label {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &-text {
    font-size: 16px;
  }

  &-input {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    padding: 10px;
    width: 100%;
    background-color: black;
    color: white;
    appearance: none;
    outline: none;
    border: none;
    border-radius: 20px;

    &::placeholder {
      color: white;
    }
  }
}
</style>
