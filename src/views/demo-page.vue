<template>
  <div class="container">
    <FormGenerator
      :title="title"
      :fields="selectedFields"
      v-model="formValues"
      @submit="saveForm"
      @cancel="cancelForm"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { FormGenerator } from "@/components/form-generator";
import { consoleLog, MessageLogType } from "@/shared/lib";
import { formFields1, formFields2, formFields3 } from "@/shared/constants";
import { useRoute } from "vue-router";

const route = useRoute();
const id = computed(() => Number(route.params.id));

const title = ref("");

const selectedFields = computed(() => {
  switch (id.value) {
    case 1:
      return formFields1;
    case 2:
      return formFields2;
    case 3:
      return formFields3;
    default:
      return {};
  }
});

watchEffect(() => {
  switch (id.value) {
    case 1:
      title.value = "Регистрация";
      break;
    case 2:
      title.value = "Отправить сообщение";
      break;
    case 3:
      title.value = "Заказать товар";
      break;
    default:
      title.value = "Форма";
  }
});

interface FormValues {
  name: string;
  email: string;
  gender: string;
  agree: boolean;
}

const formValues = ref<FormValues>({
  name: "",
  email: "",
  gender: "",
  agree: false,
});

const saveForm = (data: FormValues) => {
  consoleLog("Успешно!", MessageLogType.Success);
  console.log(data);
};

const cancelForm = () => {
  consoleLog("Отмена", MessageLogType.Error);
  formValues.value = { name: "", email: "", gender: "", agree: false };
};
</script>
