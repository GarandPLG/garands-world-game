import { createHead } from '@unhead/vue';
import App from './App.vue';
import './assets/index.css';
import { router } from './router';

createApp(App).use(createPinia()).use(router).use(createHead()).mount('#app');
