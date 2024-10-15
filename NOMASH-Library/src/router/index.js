import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCount from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'
import Login from '../views/LoginView.vue'
import Logout from '../views/LogoutView.vue'
import AccessDenied from '../views/AccessDeniedView.vue'
import FireLogin from '../views/FirebaseLoginView.vue'
import FireRegister from '../views/FirebaseRegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCount,
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI,
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FireLogin
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FireRegister
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      console.log('Redirecting to AccessDenied');
      next({ name: 'AccessDenied' });
    } else {
      console.log('Allowing access to protected route');
      next();
    }
  } else {
    console.log('Allowing access to public route');
    next();
  }
});

export default router