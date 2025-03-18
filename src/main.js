import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css';
import router from "./router"; 
const app = createApp(App); // 👈 Ek hi dafa createApp call karein
app.use(router); // 👈 Router add karein
app.mount("#app"); // 👈 Mount karein