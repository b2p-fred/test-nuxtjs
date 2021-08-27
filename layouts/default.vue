<template>
  <v-app>
    <v-navigation-drawer
      v-show="$auth.$state.loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      permanent
      expand-on-hover
      clipped
      fixed
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            pages
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            router
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      v-show="$auth.$state.loggedIn"
      clipped-left
      color="deep-purple accent-1"
      fixed
      dense
      elevate-on-scroll
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <span v-if="$auth.$state.loggedIn">
      <v-avatar
        color="primary"
        size="32"
      >FM</v-avatar>
      </span>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div v-if="$nuxt.isOffline">No internet connection! You are offline.</div>

        <Nuxt/>
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-show="$auth.$state.loggedIn"
      v-model="rightDrawer"
      right
      clipped
      temporary
      fixed
    >
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" alt="Selfie -)">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            settings
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-navigation-drawer>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} - B2PWeb</span>
    </v-footer>
  </v-app>
</template>

<script>
// import { mapState, mapActions, mapGetters } from "vuex";
import { mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    drawer: null,
    fixed: false,
    selectedItem: 1,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Dashboard',
        to: '/'
      },
      {
        icon: 'mdi-home-city-outline',
        title: 'Sites',
        to: '/sites'
      },
      {
        icon: 'mdi-library-shelves',
        title: 'Libraries',
        to: '/libraries'
      },
      {
        icon: 'mdi-account-group',
        title: 'Communities',
        to: '/communities'
      }
    ],
    miniVariant: true,
    rightDrawer: false,
    title: 'This is the application title'
  }),
  computed: {
    // ...mapState({
    //   userLoggedIn: state => state.user,
    //   notifications: state => state.toasts.queue
    // }),
    // ...mapGetters('authentication', ['isAuthenticated', 'loggedInUser']),
    navbarVisible() {
      // return this.isAuthenticated;
      return false;
    }
  },
  created() {
    const defaultLanguage = navigator.language.split("-")[0];
    console.log(`Default navigator language: ${defaultLanguage}`);

    // Get the main API configuration
    this.getApiVersion({language: defaultLanguage});

    // Test V4V, get the OIDC configuration
    if (process.env.AUTH_URL) {
      console.warn(`An external authorization URL (${process.env.AUTH_URL}) is defined, enabling oAuth...`)
      this.enableOAuth();
      this.getOidcConfiguration();
    }

    // Event handler for the locale changed with the locale changer component
    this.$root.$on("locale_signal", code => {
      if (code === "default") {
        code = defaultLanguage;
      }
      // const localeCode = code;

      // // i18n library locale update
      // this.$i18n.locale = localeCode;
      // const localeName = this.$i18n.t("name");
      //
      // // Set the current user locale
      // this.setLocale({ code: localeCode, name: localeName });
      //
      // // Force the view update - not necessary, uncomment to reactivate
      // // this.$forceUpdate();
    });

    // Only if a user signed in
    this.$root.$on("user_signed_in", () => {
      console.log("A user is still signed-in!")
      // // Get activities
      // this.loadAllFreeActivities().then(() => {
      //   // Synchronise to be sure to get real activities...
      //   const sleep = ms => {
      //     return new Promise(resolve => setTimeout(resolve, ms));
      //   };
      //
      //   const start = async () => {
      //     const allItems = this.allItems;
      //     // Use a for() loop because forEach is not really able to chain promises:/
      //     for (let index = 0; index < allItems.length; index++) {
      //       const freeActivity = allItems[index];
      //       // fixme: must wait some few ms else the backend returns a 403 status!
      //       await sleep(100).then(() =>
      //         this.loadOneFreeActivity(freeActivity.id)
      //       );
      //     }
      //
      //     // Raise an event when all activities are fully loaded
      //     this.$root.$emit("got_all_my_activities");
      //   };
      //   start();
      // });
      //
      // // Get daily message
      // this.loadAllDailyMessages().then(() => {
      //   // Raise an event when all activities are fully loaded
      //   this.$root.$emit("got_all_my_messages");
      // });
    });
  },
  mounted() {
    // this.userLoggedIn && this.$root.$emit("user_signed_in");
    this.$auth.loggedIn && this.$root.$emit("user_signed_in");
  },
  methods: {
    ...mapActions("apiVersion", ["getApiVersion"]),
    ...mapActions("oidcConfiguration", ["getOidcConfiguration"]),
    ...mapMutations(["enableOAuth"])
  },
}
</script>
