import colors from 'vuetify/es5/util/colors'

// Manifest
import pkg from './package.json';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - my-front',
    title: 'my-front',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Environment variables - https://nuxtjs.org/guide/runtime-config
  publicRuntimeConfig: {
    // Application manifest
    APP_NAME: pkg.name,
    APP_VERSION: pkg.version,
    APP_COMMENTS: pkg.description || "",
    // Backend API root endpoint
    API_URL: process.env.API_URL || 'http://localhost:8000/api',
    // Application base URL
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    // Authorization server base URL
    AUTH_URL: process.env.AUTH_URL || '',
  },

  // fixme: useful ? certainly to secure secret in production!
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3001'
    }
  },

  // Authentication
  router: {
    middleware: ['auth']
  },

  env: {
    // Backend API root endpoint
    API_URL: process.env.API_URL || 'local',
    // Application base URL
    BASE_URL: process.env.BASE_URL || 'http://localhost:3001',
    // Authorization server base URL
    AUTH_URL: process.env.AUTH_URL || '',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {ssr: false, src: '~plugins/main.client'},
    {ssr: false, src: '~plugins/axios.client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    debug: true,
    // https: false,
    // prefix: '/api',
    credentials: false,
    // host: 'localhost',
    // port: 80,
    // baseURL: 'http://localhost', // Used as fallback if no runtime config is provided
    // progress: true,
    proxy: false,
    retry: false,
    // retry: { retries: 3 }
  },

  // Auth-next module configuration: https://auth.nuxtjs.org/guide/scheme
  auth: {
    plugins: [
      '~plugins/auth.client'
    ],
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    vuex: {
      namespace: "authentication"
    },
    watchLoggedIn: true,
    localStorage: {
      prefix: 'auth.'
    },
    cookie: false,
    strategies: {
      local: {
        endpoints: {
          // Login endpoint on the API backend
          login: {
            url: '/login_check',
            method: 'post',
            propertyName: 'data.token'
          },
          // Get the current user information from the API backend
          user: {
            url: '/me',
            method: 'get'},
          // No logout on the API backend
          logout: false,
        },
        // token: {
        //   // required: true,
        //   global: true,
        //   property: 'token',
        //   name: 'Authorization',
        //   type: 'Bearer',
        // },
        user: {
          property: false,
          autoFetch: true
        },
      },
      b2p: {
        scheme: 'oauth2',
        // endpoints: {
        //   authorization: 'http://192.168.8.53:8083/master/oidc/authorize',
        //   token: 'http://192.168.8.53:8083/master/oidc/token',
        //   userInfo: 'http://192.168.8.53:8083/master/oidc/userinfo',
        //   logout: 'http://192.168.8.53:8083/master/oidc/logout-rp'
        // },
        endpoints: {
          authorization: `${process.env.AUTH_URL}/release/oidc/authorize`,
          token: `${process.env.AUTH_URL}/release/oidc/token`,
          userInfo: `${process.env.AUTH_URL}/release/oidc/userinfo`,
          logout: `${process.env.AUTH_URL}/release/oidc/logout-rp`
        },
        token: {
          property: 'access_token',
          // type: 'Bearer',
          // maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          // maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: undefined,
        // Should be same as login page or relative path to welcome screen.
        // By default, it will be inferred from redirect.callback
        redirectUri: "/",
        logoutRedirectUri: undefined,
        clientId: 'freed',
        scope: ['openid', 'email'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: 'S256',
        responseMode: '',
        acrValues: '',
        autoLogout: false
      },
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.teal.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Toast module configuration: https://github.com/nuxt-community/community-modules/tree/master/packages/toast
  toast: {
    position: 'top-left',
    duration: 2000,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, {isClient}) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    }
  }
}
