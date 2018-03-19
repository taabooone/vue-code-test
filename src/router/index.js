import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../auth'

import Login from '@/components/Login'
import Users from '@/components/Users'
import SingleUser from '@/components/SingleUser'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'user',
      component: Users,
      meta: {
        requiresAuth: true,
        teamLeadAuth: true
      }
    },
    {
      path: '/user',
      name: 'singleuser',
      component: SingleUser,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/',
      meta: {
        requiresAuth: true
      }
    }

  ]
})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {

    if (!auth.user.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if(to.meta.teamLeadAuth) {

      if(auth.getRole() == 'team-lead'){
        next();
      } else {
        next({
          path: '/user',
          query: { redirect: to.fullPath }
        });
      }
    } else{
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
