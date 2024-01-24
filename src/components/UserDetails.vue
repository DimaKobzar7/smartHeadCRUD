<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  firstName: {
    type: String,
    required: true,
  },

  img: {
    type: String,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  adress: {
    type: String,
  },

  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["updateUser"]);

const newUpdatedData = ref({
  id: +props.id,
  adress: props.adress,
  phone: props.phone,
});

const showInputs = ref({
  addressEntered: false,
  phoneEntered: false,
});

const showSubmitBtn = ref(false);

const isPrinting = ref({
  adress: false,
  phone: false,
});

const invalidPhoneNumber = ref("");

const setPrinting = (input) => {
  if (input === "phone") {
    isPrinting.value.phone = true;
    isPrinting.value.adress = false;
  } else {
    isPrinting.value.phone = false;
    isPrinting.value.adress = true;
  }
};

watch(
  [() => newUpdatedData, () => isPrinting],
  () => {
    showSubmitBtn.value = true;

    if (props.phone === newUpdatedData.value.phone && isPrinting.value.phone) {
      showSubmitBtn.value = false;
    }

    if (
      props.adress === newUpdatedData.value.adress &&
      isPrinting.value.adress
    ) {
      showSubmitBtn.value = false;
    }

    if (
      props.phone !== newUpdatedData.value.phone ||
      props.adress !== newUpdatedData.value.adress
    ) {
      showSubmitBtn.value = true;
    }
  },

  { deep: true }
);

const changeFieldData = (input) => {
  if (input === "phone") {
    showInputs.value.phoneEntered = true;
  } else {
    showInputs.value.addressEntered = true;
  }
};

const validatePhoneNumber = () => {
  const phoneRegex = /^(\+\d{1,})?\d{10,15}$/g;

  if (newUpdatedData.value.phone === "") {
    return true;
  }

  if (phoneRegex.test(+newUpdatedData.value.phone)) {
    invalidPhoneNumber.value = "";

    return true;
  } else {
    invalidPhoneNumber.value =
      "Invalid phone number. Please enter numbers ranging from 10 to 15.";

    return false;
  }
};

const updateUserData = () => {
  if (!validatePhoneNumber()) {
    return;
  }

  showInputs.value.addressEntered = false;
  showInputs.value.phoneEntered = false;

  if (showSubmitBtn.value) {
    emit("updateUser", newUpdatedData.value);
    invalidPhoneNumber.value = "";
    showSubmitBtn.value = false;
  }
};
</script>

<template>
  <div class="user-details">
    <div class="user-details-img">
      <img v-if="props.img" :src="img" alt="person-img" />
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path
          d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
        />
      </svg>
    </div>
    <h4 class="user-details-firstName">
      <span>First name:</span> {{ firstName }}
    </h4>

    <h5 class="user-details-lastName">
      <span>Last name:</span> {{ lastName }}
    </h5>

    <span class="user-details-text">Email:</span>
    <a class="user-details-email" :href="'mailto:' + email">
      {{ email }}
    </a>
    <div class="user-details-phone">
      Phone number:

      <input
        v-if="!phone || showInputs.phoneEntered"
        class="user-details-input"
        :class="{ 'is-invalid': invalidPhoneNumber }"
        type="tel"
        placeholder="Enter phone"
        v-model="newUpdatedData.phone"
        @input="setPrinting('phone')"
      />

      <span
        v-else
        @click="changeFieldData('phone')"
        title="click to change phone"
        >{{ phone }}</span
      >
      <br />
      <p v-if="invalidPhoneNumber" class="error-message">
        {{ invalidPhoneNumber }}
      </p>
    </div>
    <div class="user-details-residence">
      Residence address:

      <input
        v-if="!adress || showInputs.addressEntered"
        class="user-details-input"
        type="text"
        placeholder="Enter adress"
        v-model="newUpdatedData.adress"
        @input="setPrinting('adress')"
      />
      <span
        v-else
        @click="changeFieldData('adress')"
        title="click to change adress"
        >{{ adress }}</span
      >

      <button
        class="user-details-submit"
        type="submit"
        @click="updateUserData"
        v-if="showSubmitBtn"
      >
        Save changes

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

      <div class="user-details-clue" v-else-if="adress || phone">
        Click on the address or phone number if you want to change them!
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-details {
  padding: 16px;

  touch-action: none;
  -ms-touch-action: none;

  @include small-mobile {
    padding: 12px;
  }

  &-firstName,
  &-lastName,
  &-email,
  &-phone,
  &-residence,
  &-img {
    margin-bottom: 12px;

    font-size: 16px;
    color: white;

    @include small-mobile {
      margin-bottom: 8px;
    }

    span {
      font-weight: 400;
      cursor: pointer;
    }
  }

  &-residence {
    margin-bottom: 0;
  }

  &-input {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    padding: 10px;
    width: 100%;
    color: black;
    appearance: none;
    outline: none;
    border: none;
    border-radius: 20px;
    margin-top: 10px;
    border: 1px solid transparent;

    @include small-mobile {
      margin-top: 6px;
      padding: 6px;
    }
  }

  &-email {
    display: inline-block;

    margin-left: 10px;
  }

  &-text {
    font-size: 16px;
    color: white;
  }

  &-phone,
  &-residence {
    span {
      font-weight: 700;

      display: inline-block;
      word-break: break-word;
    }
  }

  &-img {
    border-radius: 40px;
    overflow: hidden;
    width: 128px;
    height: 128px;

    margin: 0px auto 16px;

    @include small-mobile {
      width: 85px;
      height: 85px;
      margin: 0px auto 10px;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    svg {
      width: 128px;
      height: 128px;
      fill: white;

      @include small-mobile {
        width: 85px;
        height: 85px;
      }
    }
  }

  &-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
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

    @include small-mobile {
      padding: 4px 6px;
    }

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

  &-clue {
    margin-top: 10px;
    text-align: center;
    color: black;
    height: 42px;
  }
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}

.is-invalid {
  border: 1px solid red;
}
</style>
