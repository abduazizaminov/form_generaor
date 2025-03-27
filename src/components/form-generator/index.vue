<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="title">{{ props.title }}</h2>
    <template v-for="(field, key) in fields" :key="key">
      <label :for="key">{{ field.label }}</label>

      <slot :name="key">
        <c-input
          v-if="field.type === 'input'"
          :id="key"
          v-model="formData[key]"
          v-bind="field.attrs"
        ></c-input>

        <c-select
          v-else-if="field.type === 'select'"
          :options="field.options"
          :id="key"
          v-model="formData[key]"
          v-bind="field.attrs"
        >
        </c-select>

        <c-checkbox
          v-else-if="field.type === 'checkbox'"
          :id="key"
          v-model="formData[key]"
          v-bind="field.attrs"
          >{{ field.val }}</c-checkbox
        >

        <c-textarea
          v-else-if="field.type === 'textarea'"
          :id="key"
          v-model="formData[key]"
          v-bind="field.attrs"
        ></c-textarea>
      </slot>
    </template>

    <c-button theme="primary" type="submit">Сохранить</c-button>
    <c-button theme="error" type="button" @click="handleCancel"
      >Отмена</c-button
    >
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Field } from "@/shared/types";

interface Props {
  fields: Record<string, Field>;
  modelValue: Record<string, any>;
  title: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "submit", "cancel"]);

const formData = ref({ ...props.modelValue });

const handleSubmit = () => {
  clearForm();
  emit("submit", formData.value);
};

const handleCancel = () => {
  clearForm();
  emit("cancel");
};

const clearForm = () => {
  formData.value = { ...props.modelValue };
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 2px 16px 0px rgba(93, 98, 103, 0.32);
  border-radius: 12px;
}
.title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
