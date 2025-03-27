<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
  >
    <path
      d="M8.75 0.75L3.59375 6L1.25 3.61364"
      :stroke="props.fill"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  fill: { type: String, default: "white" },
});
</script>
