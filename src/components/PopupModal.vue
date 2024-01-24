<script setup>
import { watch } from "vue";

const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false,
    required: true,
  },

  closeButtonIcon: {
    type: String,
    default: "close-button.svg",
  },

  closeOutsideClick: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => props.modalActive,
  () => {
    if (props.modalActive) document.documentElement.classList.add("modal-open");
    else document.documentElement.classList.remove("modal-open");
  }
);

const emit = defineEmits(["close"]);

const outsideClick = () => {
  if (props.closeOutsideClick) {
    emit("close");
  }
};
</script>

<template>
  <transition name="modal-animation">
    <div
      v-show="modalActive"
      class="popup-modal"
      :class="{ 'is-open': modalActive }"
      @click="outsideClick"
    >
      <div @click.stop class="popup-modal-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          class="inner-close-button"
          @click.stop="$emit('close')"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
        <slot />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.popup-modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(11, 18, 26, 0.5);

  z-index: 100;

  .popup-modal-inner {
    position: absolute;
    background: white;

    border-radius: 20px;
    z-index: 101;

    .inner-close-button {
      cursor: pointer;
      position: absolute;
      right: 31px;
      top: 31px;
      z-index: 1;

      transform: scaleY(0.8);
      transition: transform 0.3s;

      &:hover {
        transform: scaleY(0.8);
      }
    }
  }

  &.is-open {
    .inner-close-button {
      transform: scaleY(1);
    }
  }
}
</style>
