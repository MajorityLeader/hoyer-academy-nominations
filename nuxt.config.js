// nuxt.config.js
export default {
  mode: 'spa',
  target: 'static',
  router: {
    base: process.env.ROUTER_BASE || '/sites/hoyer.house.gov/nuxt/'
  },
  buildModules: [
    '@nuxtjs/vuetify',
  ]
}

