# 📋 Vue 3 Form Generator

## 🛠 Технологии

Проект создан с использованием:

- **Vue 3** (Composition API + TypeScript)
- **Vue Router** (навигация между страницами)
- **SCSS/SASS** (стилизация)

## Демо

Демонстрационную версию приложения можно найти здесь [here](http://m927036d.beget.tech/).

## 🚀 Запуск проекта

### 1️⃣ Установка зависимостей

```sh
npm install
```

### 2️⃣ Запуск в режиме разработки

```sh
npm run dev
```

### 3️⃣ Сборка для продакшена

```sh
npm run build
```

## 📌 Структура проекта

```sh
📂 src/
 ├── 📂 components/         # Компоненты
 │   ├── 📂 FormGenerator # Основной компонент генератора форм
 │   ├── 📂 icons # Компоненты иконок
 │   ├── 📂 ui # UI элементы
 │
 ├── 📂 views/              # Страницы
 │   ├── 📄 Home.vue        # Главная страница
 │   ├── 📄 DemoPage.vue    # Страница с примерами форм
 │
 ├── 📂 router/             # Маршруты
 │   ├── 📄 index.ts       # Настройка Vue Router
 │
 ├── 📂 shared/             # Общие утилиты и константы
 │   ├── 📂 constants   # Демо-формы
 │   ├── 📂 lib         # Вспомогательные функции
 │   ├── 📂 types        # Типы
 │
 ├── 📂 assets/             # Статические файлы и стили
 │   ├── 📂 styles   # Основные стили
 │   ├── 📂 fonts   # Шрифты
 │
 ├── 📄 App.vue             # Корневой компонент
 ├── 📄 main.ts             # Точка входа в приложение
```

## 📄 Использование

Генератор форм принимает **динамическую конфигурацию полей**.
Пример формы:

```ts
const formFields = {
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
  },
  agree: { label: "Согласие", type: "checkbox", val: "Согласен" },
};
```

### Пример вызова компонента:

```vue
<FormGenerator
  :title="'Регистрация'"
  :fields="formFields"
  v-model="formValues"
  @submit="saveForm"
  @cancel="cancelForm"
/>
```

## 📜 Лицензия

Этот проект распространяется под лицензией **MIT**.
