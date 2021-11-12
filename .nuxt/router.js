import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1a30aaa2 = () => interopDefault(import('../pages/availability.vue' /* webpackChunkName: "pages/availability" */))
const _0644ec49 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _0124e3b6 = () => interopDefault(import('../pages/done_hold.vue' /* webpackChunkName: "pages/done_hold" */))
const _bea50426 = () => interopDefault(import('../pages/extras/index.vue' /* webpackChunkName: "pages/extras/index" */))
const _d7f0dbbc = () => interopDefault(import('../pages/guests.vue' /* webpackChunkName: "pages/guests" */))
const _dfa4a628 = () => interopDefault(import('../pages/manage.vue' /* webpackChunkName: "pages/manage" */))
const _7b7c18d2 = () => interopDefault(import('../pages/policies.vue' /* webpackChunkName: "pages/policies" */))
const _71212f35 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _2fb46daf = () => interopDefault(import('../pages/summary.vue' /* webpackChunkName: "pages/summary" */))
const _7695236b = () => interopDefault(import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */))
const _a4782d7c = () => interopDefault(import('../pages/profile/more.vue' /* webpackChunkName: "pages/profile/more" */))
const _58d6c2a2 = () => interopDefault(import('../pages/extras/_special.vue' /* webpackChunkName: "pages/extras/_special" */))
const _32c1611b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/availability",
    component: _1a30aaa2,
    name: "availability"
  }, {
    path: "/done",
    component: _0644ec49,
    name: "done"
  }, {
    path: "/done_hold",
    component: _0124e3b6,
    name: "done_hold"
  }, {
    path: "/extras",
    component: _bea50426,
    name: "extras"
  }, {
    path: "/guests",
    component: _d7f0dbbc,
    name: "guests"
  }, {
    path: "/manage",
    component: _dfa4a628,
    name: "manage"
  }, {
    path: "/policies",
    component: _7b7c18d2,
    name: "policies"
  }, {
    path: "/profile",
    component: _71212f35,
    name: "profile"
  }, {
    path: "/summary",
    component: _2fb46daf,
    name: "summary"
  }, {
    path: "/welcome",
    component: _7695236b,
    name: "welcome"
  }, {
    path: "/profile/more",
    component: _a4782d7c,
    name: "profile-more"
  }, {
    path: "/extras/:special",
    component: _58d6c2a2,
    name: "extras-special"
  }, {
    path: "/",
    component: _32c1611b,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
