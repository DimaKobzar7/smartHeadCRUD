<script setup>
defineProps({
  text: String,
  required: true,
});
</script>

<template>
  <div class="button">{{ text }}</div>
</template>

<style lang="scss" scoped>
.button {
  padding: 8px 10px;
  max-width: 150px;
  text-align: center;
  cursor: pointer;

  font-size: 16px;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  border-radius: 30px;
  background-color: white;

  border: 1px solid transparent;

  color: black;

  transition: background-color 0.4s, color 0.4s, border-color 0.4s;

  @include small-mobile {
    padding: 6px 8px;
  }

  &:hover {
    background-color: transparent;
    border: 1px solid white;
    color: white;
  }
}
</style>
