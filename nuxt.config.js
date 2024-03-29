export default {
  ssr: false,
  target: 'static',
  publicRuntimeConfig: {
    PAYMENT_PUBLIC_KEY: process.env.PAYSTACK_LIVE_MODE == "true" ? process.env.PAYSTACK_LIVE_PK : process.env.PAYSTACK_TEST_PK,
    BUGSNAG_KEY: process.env.BUGSNAG_KEY,
  },
  head: {
    title: 'Jara Beach Resort',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Jara Beach Resort Booking' },
      { hid: 'og:description', name: 'og:description', content: 'Jara Beach Resort Booking' },
      { hid: 'og:title', name: 'og:title', content: 'Jara Beach Resort' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Jara Beach Resort' },
      { hid: 'og:image', name: 'og:image', content: '/logo.webp' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap", rel: "stylesheet" }
    ]
  },
  css: [
    "~layouts/font.css",
  ],
  plugins: [
    "@/plugins/popover.js",
    "@/plugins/vue-tour.js",
    "@/plugins/v-calendar.js",
    { src: '@/plugins/vuex-persist', ssr: false },
    { src: '@/plugins/bugsnag', ssr: false },
    '~/plugins/directives.js'
  ],
  router: {
    middleware: 'clear'
  },
  components: [
    '~/components', // shortcut to { path: '~/components' }
    { path: '~/components/extras/', prefix: '' },
    { path: '~/components/extras/lookout', prefix: '' },
    { path: '~/components/extras/domesticstaff', prefix: '' },
    { path: '~/components/global', prefix: '' },
  ],
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
    baseURL: process.env.API_URL || "http://localhost:8000/api/",
  },
  build: {},
  toast: {
    position: 'top-right',
    duration: 4000,
  },
  pwa: {
    manifest: {
      name: 'Jara Beach Resort',
      short_name: 'Jara Beach Resort',
      lang: 'en',
      description: 'Jara Beach Resort Booking',
    }
  }
}
