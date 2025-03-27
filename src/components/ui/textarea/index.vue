<template>
  <div class="textarea_container">
    <textarea
      ref="textareaElement"
      class="custom_textarea"
      v-bind="attrs"
      :class="classes"
      :type="props.type"
      @input="updateValue"
      :value="modelValue"
      :autofocus="props.autofocus"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
    ></textarea>
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
  [`custom_textarea__${props.size}`]: !!props.size,
  error: props.error,
}));
const emits = defineEmits(["update:modelValue"]);
const modelValue = defineModel<string>("modelValue");

const textareaElement = ref<HTMLInputElement | null>(null);

const focus = () => {
  textareaElement.value?.focus();
};

defineExpose({ focus });

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
.textarea_container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.custom_textarea {
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
    padding: 10px;
  }
  &__sm {
    padding: 4px;
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
