<template>
  <div class="container home_container">
    <h1 class="title">Добро пожаловать на генератор форм!</h1>
    <p class="description">
      Внизу представлены некоторые примеры генерации форм
    </p>
    <ul class="form_list">
      <router-link to="/demo/1">
        <li>Форма авторизации</li>
      </router-link>
      <router-link to="/demo/2">
        <li>Форма отправки сообщения</li>
      </router-link>
      <router-link to="/demo/3">
        <li>Форма добавления товара</li>
      </router-link>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.home_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  min-height: 100vh;

  background: linear-gradient(45deg, #ff7e5f, #feb47b, #86a8e7, #7f7fd5);
  background-size: 300% 300%;
  animation: gradientAnimation 8s ease infinite;
}

.title {
  font-size: 32px;
  color: var(--cards-white);
}

.description {
  font-size: 18px;
  color: var(--cards-white);
}

.form_list {
  display: flex;
  gap: 30px;
  margin-top: 30px;

  & li {
    font-size: 16px;
    color: var(--cards-white);
    font-weight: bold;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
