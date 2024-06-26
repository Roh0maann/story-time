// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl : process.env.APP_URL,
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose'
        },
        {
          src: 'https://kit.fontawesome.com/3063eb1ed2.js',
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [
    '@/assets/main.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],
  plugins: [
    '~/plugins/vee-validate.ts',
  ],
})