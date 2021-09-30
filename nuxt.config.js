// nuxt.config.js
export default {
  mode: 'spa',
  target: 'static',
  router: {
    base: '/sites/hoyer.house.gov/dist/'
  },
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/recaptcha',
  ],
  recaptcha: {
    version: 2,
    siteKey: '6LdNvSkTAAAAAOyI81TRnGAYYz58AKpPUbWqUSbd'
  },
  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      version: 2,
      siteKey: '6LdNvSkTAAAAAOyI81TRnGAYYz58AKpPUbWqUSbd'// for example
    }
  }
}

