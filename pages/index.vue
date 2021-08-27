<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo/>
        <VuetifyLogo/>
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower
            developers to create amazing applications.</p>
          <div class="text-xs-right">
            <em><small>&mdash; Fred</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <span v-if="$auth.$state.loggedIn">
          <v-btn
            color="primary"
            nuxt
            @click="logout"
          >
            Logout
          </v-btn>
          </span>
          <span v-else>
          <v-btn
            color="primary"
            nuxt
            to="/login"
          >
            Login
          </v-btn>
          </span>
          <v-spacer/>
          <v-btn
            v-if="$auth.$state.loggedIn"
            color="primary"
            nuxt
            to="/sites"
          >
            Sites
          </v-btn>
          <v-btn
            v-if="$auth.$state.loggedIn"
            color="primary"
            nuxt
            to="/libraries"
          >
            Libraries
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
  computed: {
    navbarVisible() {
      // return this.isAuthenticated;
      return false
    },
    isAuthenticated() {
      return this.$auth.$state.loggedIn;
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();  // this method will logout the user and make token to false on the local storage of the user browser
    }
  }
}
</script>
