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
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
        ],
    },
    css: [],
    plugins: [],
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
        baseURL: "http://localhost:8000/api"
    },
    build: {}
}