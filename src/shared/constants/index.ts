import type { Field } from "@/shared/types";
const formFields1: Record<string, Field> = {
  name: { label: "Имя", type: "input", attrs: { placeholder: "Введите имя" } },
  email: {
    label: "Email",
    type: "input",
    attrs: { type: "email", placeholder: "Введите email" },
  },
  gender: {
    label: "Пол",
    type: "select",
    options: [
      { label: "Мужской", value: "male" },
      { label: "Женский", value: "female" },
    ],
    attrs: { valueKey: "value", label: "label" },
  },
  agree: {
    label: "Дайте свое согласие на обработку ваших данных",
    type: "checkbox",
    val: "Согласен",
  },
};
const formFields2: Record<string, Field> = {
  recipient: { label: "Email", type: "input", attrs: { type: "email" } },
  sender: { label: "Email", type: "input", attrs: { type: "email" } },
  text: {
    label: "Сообщение",
    type: "textarea",
    attrs: { type: "text", placeholder: "Введите текст" },
  },
};
const formFields3: Record<string, Field> = {
  product: {
    label: "Выберите товар",
    type: "select",
    options: [
      { label: "Ноутбук", value: "laptop" },
      { label: "Смартфон", value: "smartphone" },
      { label: "Планшет", value: "tablet" },
    ],
  },
  quantity: {
    label: "Количество",
    type: "input",
    attrs: { type: "number", min: 1, placeholder: "Введите количество" },
  },
  address: {
    label: "Адрес доставки",
    type: "textarea",
    attrs: { placeholder: "Введите адрес" },
  },
  payment: {
    label: "Способ оплаты",
    type: "select",
    options: [
      { label: "Картой", value: "card" },
      { label: "Наличными", value: "cash" },
    ],
  },
  agree: {
    label: "Согласен с условиями",
    type: "checkbox",
  },
};

export { formFields1, formFields2, formFields3 };
