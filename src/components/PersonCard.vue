<script setup>
import Button from "@/components/Button.vue";

const props = defineProps({
  firstName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default: "",
  },

  lastName: {
    type: String,
    default: "",
  },

  id: {
    type: Number,
    required: true,
  },

  isModalOpen: {
    type: Boolean,
    required: true,
    default: false,
  },

  adress: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["showModal", "deleteSelectedUser"]);
</script>

<template>
  <div class="personCard">
    <div class="personCard-body">
      <h4
        class="personCard-firstName"
        @click="
          $emit(
            'showModal',
            +id,
            firstName,
            lastName,
            img,
            email,
            phone,
            adress
          )
        "
      >
        {{ firstName }}
      </h4>

      <div class="personCard-img">
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

      <a class="personCard-email" :href="'mailto:' + email">{{ email }}</a>

      <Button
        text="Delete user"
        @click="$emit('deleteSelectedUser', +id)"
      ></Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personCard {
  width: 100%;
  max-width: 300px;

  transition: scale 0.3s;

  &:hover {
    scale: (105%);
  }

  &-body {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    border-radius: 20px;
  }

  &-firstName,
  &-email,
  &-img {
    margin-bottom: 16px;
    font-size: 16px;
    color: white;

    @include small-mobile {
      margin-bottom: 10px;
    }
  }

  &-firstName {
    padding: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    font-weight: 700;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    @include small-mobile {
      padding: 4px;
      margin-bottom: 4px;
    }
  }

  &-img {
    border-radius: 40px;
    overflow: hidden;
    width: 128px;
    height: 128px;

    @include small-mobile {
      width: 80px;
      height: 80px;
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
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>
