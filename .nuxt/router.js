import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _165ae3cb = () => interopDefault(import('../pages/availability.vue' /* webpackChunkName: "pages/availability" */))
const _7fbda292 = () => interopDefault(import('../pages/day-pass.vue' /* webpackChunkName: "pages/day-pass" */))
const _6df321e3 = () => interopDefault(import('../pages/day-pass-options.vue' /* webpackChunkName: "pages/day-pass-options" */))
const _2674d94b = () => interopDefault(import('../pages/day-pass-payment.vue' /* webpackChunkName: "pages/day-pass-payment" */))
const _1fe9431c = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _0fd50d9c = () => interopDefault(import('../pages/done_hold.vue' /* webpackChunkName: "pages/done_hold" */))
const _25fa1e0b = () => interopDefault(import('../pages/guests.vue' /* webpackChunkName: "pages/guests" */))
const _222038d5 = () => interopDefault(import('../pages/manage.vue' /* webpackChunkName: "pages/manage" */))
const _bc7dad80 = () => interopDefault(import('../pages/policies.vue' /* webpackChunkName: "pages/policies" */))
const _0b83c9a8 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _47d94234 = () => interopDefault(import('../pages/summary.vue' /* webpackChunkName: "pages/summary" */))
const _22f414a2 = () => interopDefault(import('../pages/welcome.vue' /* webpackChunkName: "pages/welcome" */))
const _ac23bb2a = () => interopDefault(import('../pages/profile/more.vue' /* webpackChunkName: "pages/profile/more" */))
const _7916982a = () => interopDefault(import('../pages/day-pass-extras/_special.vue' /* webpackChunkName: "pages/day-pass-extras/_special" */))
const _edb32e34 = () => interopDefault(import('../pages/extras/_special.vue' /* webpackChunkName: "pages/extras/_special" */))
const _fc6d97dc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _165ae3cb,
    name: "availability"
  }, {
    path: "/day-pass",
    component: _7fbda292,
    name: "day-pass"
  }, {
    path: "/day-pass-options",
    component: _6df321e3,
    name: "day-pass-options"
  }, {
    path: "/day-pass-payment",
    component: _2674d94b,
    name: "day-pass-payment"
  }, {
    path: "/done",
    component: _1fe9431c,
    name: "done"
  }, {
    path: "/done_hold",
    component: _0fd50d9c,
    name: "done_hold"
  }, {
    path: "/guests",
    component: _25fa1e0b,
    name: "guests"
  }, {
    path: "/manage",
    component: _222038d5,
    name: "manage"
  }, {
    path: "/policies",
    component: _bc7dad80,
    name: "policies"
  }, {
    path: "/profile",
    component: _0b83c9a8,
    name: "profile"
  }, {
    path: "/summary",
    component: _47d94234,
    name: "summary"
  }, {
    path: "/welcome",
    component: _22f414a2,
    name: "welcome"
  }, {
    path: "/profile/more",
    component: _ac23bb2a,
    name: "profile-more"
  }, {
    path: "/day-pass-extras/:special?",
    component: _7916982a,
    name: "day-pass-extras-special"
  }, {
    path: "/extras/:special?",
    component: _edb32e34,
    name: "extras-special"
  }, {
    path: "/",
    component: _fc6d97dc,
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
