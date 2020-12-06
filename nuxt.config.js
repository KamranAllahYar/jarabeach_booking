export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Jara Beach Resort',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Jara Beach Resort' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    "~layouts/font.css",
  ],
  plugins: [
    "@/plugins/popover.js",
    { src: '@/plugins/vuex-persist', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/date-fns',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],
  axios: {
    baseURL: process.env.API_URL || "https://jarabeach-admin.reftek.app/api"
  },
  build: {},
  toast: {
    position: 'top-right',
    duration: 4000,
  }
}
