import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/index.scss";
import { Button, Checkbox, Textarea, Select, Input } from "@/components/ui";

const app = createApp(App);
app.use(router);
app.component("c-button", Button);
app.component("c-input", Input);
app.component("c-select", Select);
app.component("c-checkbox", Checkbox);
app.component("c-textarea", Textarea);
app.mount("#app");
