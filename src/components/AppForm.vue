<script setup>
import { ref } from "vue";
import { useUserInfoStore } from "../../store/userInfoStore";

import { createNewUser } from "../../src/api/index";

const formData = ref({
  first_name: "",
  email: "",
  last_name: "No data",
});

const userInfoStore = useUserInfoStore();

const isNameValid = ref(true);
const isEmailValid = ref(true);

const validateName = () => {
  if (!formData.value.first_name.length) {
    isNameValid.value = false;
  } else {
    isNameValid.value = true;
  }
};

const validateEmail = () => {
  isEmailValid.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email);
};

const submitForm = async () => {
  validateName();
  validateEmail();

  if (isNameValid.value && isEmailValid.value) {
    const newUser = await createNewUser(
      import.meta.env.VITE_USERS_URL,
      formData.value
    );

    userInfoStore.personsData.push(newUser);

    resetForm();
  }
};

const resetForm = () => {
  formData.value = {
    first_name: "",
    email: "",
  };
  isNameValid.value = true;
  isEmailValid.value = true;
};
</script>

<template>
  <form class="appForm" novalidate @submit.prevent="submitForm">
    <h2 class="appForm-title">Add new user!</h2>
    <div class="appForm-body">
      <div class="appForm-wrap">
        <label class="appForm-label" for="name">Name:</label>

        <input
          v-model="formData.first_name"
          type="text"
          id="name"
          class="appForm-input"
          :class="{ 'is-invalid': !isNameValid }"
          placeholder="Enter name"
        />
        <div v-if="!isNameValid" class="error-message">Please enter name.</div>
      </div>

      <div class="appForm-wrap">
        <label class="appForm-label" for="email">Email:</label>

        <input
          v-model="formData.email"
          type="email"
          id="email"
          class="appForm-input"
          :class="{ 'is-invalid': !isEmailValid }"
          placeholder="Enter email"
        />

        <div v-if="!isEmailValid" class="error-message">
          Please enter a valid email address.
        </div>
      </div>
    </div>

    <button class="appForm-submit" type="submit">
      Submit

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm120-160v-80h320v80H320Zm0-120v-80h320v80H320Zm0-120v-80h320v80H320Zm360-80v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"
        />
      </svg>
    </button>
  </form>
</template>

<style lang="scss" scoped>
.appForm {
  background-color: black;
  border-radius: 20px;
  padding: 20px;
  max-width: 300px;
  width: 100%;

  &-title {
    color: white;
    font-size: 34px;
    margin-bottom: 8px;

    @include tablet {
      font-size: 30px;
    }
  }

  &-wrap {
    height: 90px;

    @include tablet {
      margin-bottom: 8px;
    }

    @media (max-width: 310px) {
      height: 110px;
      margin-bottom: 0;
    }
  }

  &-label {
    display: inline-block;
    margin-bottom: 8px;
    color: white;
  }

  &-input {
    padding: 10px;
    width: 100%;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;

    color: black;
    appearance: none;
    outline: none;
    border: none;
    border-radius: 20px;
    border: 1px solid transparent;

    &::placeholder {
      color: black;
    }
  }

  &-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    width: 100%;
    font-family: "Montserrat", sans-serif;

    cursor: pointer;

    font-size: 16px;
    font-weight: 400;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    border-radius: 30px;
    background-color: white;

    border: 1px solid transparent;

    color: black;

    transition: background-color 0.4s, color 0.4s, border-color 0.4s;

    &:hover {
      background-color: transparent;
      border: 1px solid white;
      color: white;

      svg {
        transition: fill 0.4s;
        fill: white;
      }
    }
  }

  &-body {
    margin-bottom: 8px;

    @media (max-width: 310px) {
      margin-bottom: 0;
    }
  }
}

.is-invalid {
  border: 1px solid red;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
</style>
