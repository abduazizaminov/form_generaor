<template>
  <label class="checkbox">
    <input
      :checked="isChecked"
      :disabled="disabled"
      @change="updateValue"
      type="checkbox"
    />
    <span class="checkbox_checkmark">
      <div class="checkbox_checkmark_svg">
        <CheckMarkIcon />
      </div>
    </span>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CheckMarkIcon } from "@/components/icons";

interface Props {
  modelValue?: string | number | boolean;
  disabled?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => {
  console.log(props.modelValue);

  return props.modelValue === undefined ? false : !!props.modelValue;
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 21px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  user-select: none;
  cursor: pointer;
  transition-duration: 200ms;
  height: fit-content;

  &_checkmark {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 15px;
    width: 15px;
    border: 2px solid var(--grey);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &_svg {
      display: none;
    }
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    visibility: hidden;

    &:checked ~ .checkbox_checkmark {
      background-color: var(--main-primary);
      border-color: var(--main-primary);
      transition-duration: 200ms;

      .checkbox_checkmark_svg {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
