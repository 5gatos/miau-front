import VueRouter from 'vue-router'
import HomeComponent from './components/Home.vue'
import DashboardComponent from './components/Dashboard.vue'


const routes = [{
    path: '/',
    component: HomeComponent,
    meta: {
      title: 'MIAU | Inicio'
    }
  },
  {
    path: '/dashboard',
    component: DashboardComponent,
    meta: {
      title: 'MIAU | Dashboard'
    }
  }
]

let router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  return next();
})


export default router
