import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

const bugsnagClient = Bugsnag.start({
  apiKey: "65de2f1bc2305f10771312d8f9ff059e",
  plugins: [new BugsnagPluginVue()],
})

Vue.use(bugsnagClient)

export default (ctx, inject) => {
  inject('bugsnag', bugsnagClient)
}

// Bugsnag.start({
//   apiKey: '65de2f1bc2305f10771312d8f9ff059e',
//   plugins: [new BugsnagPluginVue()]
// })

// Bugsnag.getPlugin('vue').installVueErrorHandler(Vue)

// export default (ctx, inject) => {
//   inject('bugsnag', bugsnagClient)
// }
