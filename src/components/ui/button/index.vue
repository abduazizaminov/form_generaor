<template>
  <button
    :disabled="props.disabled"
    :type="props.type"
    class="button"
    :class="classes"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  theme?: string;
  size?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const classes = computed(() => ({
  [`button__${props.theme}`]: !!props.theme,
  [`button__${props.size}`]: !!props.size,
}));
</script>

<style lang="scss" scoped>
.button {
  padding: 8px 12px;
  user-select: none;
  cursor: pointer;
  background-color: var(--grey);
  text-align: center;
  color: var(--text-primary);
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  transition-duration: 200ms;
  box-sizing: border-box;

  &__primary {
    background-color: var(--main-primary);
    color: var(--cards-white);
    outline: none;
  }
  &__error {
    background-color: var(--error);
    border: 1px solid var(--error);
    color: var(--cards-white);
    padding: 7px 12px;
  }
  &__error_outline {
    background-color: var(--cards-white);
    border: 1px solid var(--error);
    color: var(--error);
    padding: 7px 12px;
  }
  &__success {
    background-color: var(--success);
    border: 1px solid var(--success);
    color: var(--cards-white);
    outline: none;
  }
  &__lg {
    padding: 12px 20px;
    line-height: 20px;
    font-size: 14px;
  }
  &__md {
    padding: 10px 12px;
    line-height: 20px;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    &:hover {
      opacity: 0.4;
    }
  }
  &:hover {
    opacity: 0.85;
  }
}
</style>
