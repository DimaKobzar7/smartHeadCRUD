<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserInfoStore } from "../../store/userInfoStore";
import { useFilterStore } from "../../store/filterStore";
import {
  getUsersInfo,
  saveDataToDB,
  loadDataFromDB,
  updateUserInfo,
  deleteUser,
} from "../../src/api/index";

import PersonalCard from "@/components/PersonCard.vue";
import Filter from "@/components/Filter.vue";
import AppForm from "@/components/AppForm.vue";
import PopupModal from "@/components/PopupModal.vue";
import UserDetails from "@/components/UserDetails.vue";

const userInfoStore = useUserInfoStore();
const filterStore = useFilterStore();
const isModalOpen = ref(false);

onMounted(async () => {
  if (localStorage.getItem("usersDatabase") === null) {
    const initialData = await getUsersInfo(import.meta.env.VITE_USERS_URL);

    userInfoStore.personsData = initialData.data;

    saveDataToDB(userInfoStore.personsData);
  } else {
    userInfoStore.personsData = loadDataFromDB();
  }
});

watch(
  () => userInfoStore.personsData,
  () => {
    filterStore.personsDataFilter = userInfoStore.personsData;
    saveDataToDB(userInfoStore.personsData);

    filterStore.personsDataFilter = filterStore
      .doFiltering(
        userInfoStore.personsData,
        filterStore.searchRequest,
        "first_name",
        "email",
        "last_name"
      )
      .reverse();
  },
  { deep: true }
);

const deleteSelectedUser = (userId) => {
  deleteUser(import.meta.env.VITE_USERS_URL, +userId);

  const delUser = userInfoStore.personsData.filter((user) => {
    return +user.id !== +userId;
  });

  userInfoStore.personsData = delUser;
};

const updateUser = async (userData) => {
  const updatedUser = await updateUserInfo(
    import.meta.env.VITE_USERS_URL,
    +userData.id,
    userData
  );

  const newUserData = (userInfoStore.modalUserInfo = Object.assign(
    userInfoStore.modalUserInfo,
    updatedUser
  ));

  userInfoStore.personsData = userInfoStore.personsData.map((user) => {
    if (+user.id === +newUserData.id) {
      return newUserData;
    }

    return user;
  });
};

const showModal = (id, firstName, lastName, img, email, phone, adress) => {
  userInfoStore.modalUserInfo = {
    id,
    first_name: firstName,
    last_name: lastName,
    avatar: img,
    email,
    phone,
    adress,
  };

  isModalOpen.value = true;
};

const getInitialData = async () => {
  const initialData = await getUsersInfo(import.meta.env.VITE_USERS_URL);

  userInfoStore.personsData = initialData.data;

  saveDataToDB(userInfoStore.personsData);
};
</script>

<template>
  <div class="mainPage">
    <div class="container">
      <div class="mainPage-wrap">
        <AppForm />
        <Filter />
      </div>

      <main class="mainPage-content">
        <PersonalCard
          v-for="personData in filterStore.personsDataFilter"
          :firstName="personData.first_name"
          :adress="personData.adress"
          :phone="personData.phone"
          :email="personData.email"
          :img="personData.avatar"
          :key="+personData.id"
          :id="+personData.id"
          :lastName="personData.last_name"
          :isModalOpen="isModalOpen"
          @showModal="showModal"
          @deleteSelectedUser="deleteSelectedUser"
        />

        <p
          class="mainPage-text"
          v-if="
            !filterStore.personsDataFilter.length && filterStore.searchRequest
          "
        >
          There are no matches for your search query
        </p>

        <div
          class="mainPage-empty"
          v-if="
            !filterStore.personsDataFilter.length && !filterStore.searchRequest
          "
        >
          <p class="mainPage-text">Ooops, looks like you deleted all users.</p>
          <p class="mainPage-text">
            You can add new ones through the form or return the six default
            users by clicking on the button below.
          </p>
          <div class="mainPage-btn" @click="getInitialData">
            Return six default users
          </div>
        </div>
      </main>
    </div>
  </div>

  <Teleport to="body">
    <PopupModal
      class="mainPage-modal"
      @close="isModalOpen = false"
      :modal-active="isModalOpen"
    >
      <UserDetails
        v-if="isModalOpen"
        @updateUser="updateUser"
        :img="userInfoStore.modalUserInfo.avatar"
        :firstName="userInfoStore.modalUserInfo.first_name"
        :lastName="userInfoStore.modalUserInfo.last_name"
        :email="userInfoStore.modalUserInfo.email"
        :phone="userInfoStore.modalUserInfo.phone"
        :adress="userInfoStore.modalUserInfo.adress"
        :id="+userInfoStore.modalUserInfo.id"
      />
    </PopupModal>
  </Teleport>
</template>

<style lang="scss" scoped>
.mainPage {
  padding: 60px 0;

  @include small-mobile {
    padding: 24px 0;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  &-wrap {
    margin-bottom: 24px;
    display: flex;
    align-items: flex-end;
    gap: 28px;
    justify-content: center;

    @include tablet {
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
  }

  &-empty {
    text-align: center;
  }

  &-text {
    font-size: 16px;
    margin-bottom: 16px;
  }

  &-btn {
    display: flex;
    align-items: center;

    justify-content: center;
    margin: 0 auto;
    padding: 8px 10px;
    width: 100%;
    font-family: "Montserrat", sans-serif;

    cursor: pointer;

    max-width: 300px;

    font-size: 16px;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    border-radius: 30px;
    background-color: black;

    border: 1px solid transparent;

    color: white;

    transition: background-color 0.4s, color 0.4s, border-color 0.4s;

    &:hover {
      background-color: transparent;
      border: 1px solid black;
      color: black;
    }
  }

  &-modal {
    &-body {
      padding: 16px;
      text-align: center;
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
    }

    &-input {
      font-size: 16px;
      padding: 10px;
      width: 100%;
      color: black;
      appearance: none;
      outline: none;
      border: none;
      border-radius: 20px;
      margin-top: 10px;
    }

    &-firstName {
      font-weight: 700;
    }

    &-email {
      display: inline-block;

      margin-left: 10px;
    }

    &-text {
      font-size: 16px;
      color: white;
    }

    :deep(.popup-modal-inner) {
      transform: translate(-50%, -50%);
      left: 50%;

      top: 40%;

      width: 100%;

      background-color: #baabab;
      max-height: 100vh;
      overflow: auto;
      max-width: 350px;

      @include small-mobile {
        top: 30%;
      }

      .inner-close-button {
        z-index: 200;

        right: 10px;
        top: 10px;
        fill: white;
      }
    }
  }
}
</style>
