import { createRouter, createWebHistory } from 'vue-router';
import InicioComponent from './components/InicioComponent.vue';
import MenuComponent from './components/MenuComponent.vue';
import PerfilComponent from './components/PerfilComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import RegistroComponent from './components/RegistroComponent.vue';
import VentasComponent from './components/VentasComponent.vue';
import RegistroUsuarios from './components/RegistroUsuarios.vue';
const routes = [
  {
    path: '/',
    component: InicioComponent,
  },
  {
    path: '/menu',
    component: MenuComponent,
  },
  {
    path: '/perfil',
    component: PerfilComponent,
  },
  {
    path: '/login',
    component: LoginComponent,
  },
  {
    path: '/registro',
    component: RegistroComponent,
  },
  {
    path: '/ventas',
    component: VentasComponent,
  },
  {
    path: '/registrousuarios',
    component: RegistroUsuarios,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
