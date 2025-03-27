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
import { computed, ref } from "vue";
import { FormGenerator } from "@/components/form-generator";
import { consoleLog, MessageLogType } from "@/shared/lib";
import { formFields1, formFields2, formFields3 } from "@/shared/constants";
import { useRoute } from "vue-router";

const route = useRoute();
const id = computed(() => Number(route.params.id));
const title = ref("");
const selectedFields = computed(() => {
  if (id.value === 1) {
    title.value = "Регистрация";
    return formFields1;
  } else if (id.value === 2) {
    title.value = "Отправить сообщение";
    return formFields2;
  } else {
    title.value = "Заказать товар";
    return formFields3;
  }
});

const formValues = ref({
  name: "",
  email: "",
  gender: "",
  agree: false,
});

const saveForm = (data: any) => {
  consoleLog("Успешно!", MessageLogType.Success);
  console.log(data);
};

const cancelForm = () => {
  consoleLog("Отмена", MessageLogType.Error);
  formValues.value = {
    name: "",
    email: "",
    gender: "",
    agree: false,
  };
};
</script>
