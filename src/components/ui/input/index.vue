<template>
  <div class="input_container">
    <input
      ref="inputElement"
      class="custom_input"
      v-bind="attrs"
      :class="classes"
      :type="props.type"
      @input="updateValue"
      :value="modelValue"
      :autofocus="props.autofocus"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    />
    <p v-if="props.error" class="error_text">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";

interface Props {
  error?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  autofocus?: boolean;
  size?: "md" | "sm";
}

const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  autofocus: false,
  size: "md",
});
const classes = computed(() => ({
  [`custom_input__${props.size}`]: !!props.size,
  error: props.error,
}));
const emits = defineEmits(["update:modelValue"]);
const modelValue = defineModel<string | number>("modelValue");

const inputElement = ref<HTMLInputElement | null>(null);

const focus = () => {
  inputElement.value?.focus();
};

defineExpose({ focus });

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
.input_container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.custom_input {
  line-height: 20px;
  font-size: 14px;
  border-radius: 12px;
  background-color: var(--grey);
  color: var(--text-primary);
  border: 1px solid transparent;
  outline: none;
  transition-duration: 200ms;
  width: 100%;

  &__md {
    padding: 5px 6px;
    padding-left: 12px;
  }
  &__sm {
    padding: 4px;
    padding-left: 10px;
  }

  &::placeholder {
    color: var(--text-secondary);
  }
  &.error {
    border: 1px solid var(--error);
  }
  &:focus {
    background-color: var(--cards-white);
    border-color: var(--main-primary);
  }
}
.error_text {
  color: var(--error);
  font-size: 10px;
  line-height: 12px;
}
</style>
