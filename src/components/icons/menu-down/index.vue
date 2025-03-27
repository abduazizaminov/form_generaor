<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M3.33333 5.6665L8 10.3332L12.6667 5.6665H3.33333Z"
      :fill="props.fill"
      fill-opacity="0.6"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  fill: { type: String, default: "var(--text-primary)" },
});
</script>
