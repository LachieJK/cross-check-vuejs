import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).use(router).mount('#app');
