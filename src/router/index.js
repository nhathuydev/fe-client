import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import {LayoutMain} from '@/pages/layout'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Toolkit from '@/pages/Toolkit'
import Notfound from '@/pages/Notfound'
import { AddCollection, ListCollection, EditCollection, DetailCollection } from '@/pages/collection'
import { AddTag, ListTag, EditTag, DetailTag } from '@/pages/tag'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  base: '/',
  linkActiveClass: 'open',
  routes: [
    {
      path: '/',
      component: LayoutMain,
      meta: { Auth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            Auth: false
          }
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          meta: {
            Auth: true
          }
        },
        {
          path: '/toolkit',
          name: 'Toolkit',
          component: Toolkit,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection',
          name: 'CollectionList',
          component: ListCollection,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection/add',
          name: 'CollectionAdd',
          component: AddCollection,
          meta: {
            Auth: true
          }
        },
        {
          path: '/collection/:id',
          name: 'CollectionDetail',
          component: DetailCollection,
          meta: {
            Auth: false
          }
        },
        {
          path: '/collection-edit/:id',
          name: 'CollectionEdit',
          component: EditCollection,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tags',
          name: 'TagList',
          component: ListTag,
          meta: {
            Auth: false
          }
        },
        {
          path: '/tag/add',
          name: 'TagAdd',
          component: AddTag,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tag-edit/:id',
          name: 'TagEdit',
          component: EditTag,
          meta: {
            Auth: true
          }
        },
        {
          path: '/tag/:id',
          name: 'TagDetail',
          component: DetailTag,
          meta: {
            Auth: false
          }
        }

      ]
    },
    {
      path: '*',
      name: 'Notfound',
      component: Notfound,
      meta: {
        title: 'Error not found!!!'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.Auth && !store.getters.isLogged) {
    next({
      name: 'Dashboard'
    })
  } else {
    next()
  }
})
export default router
