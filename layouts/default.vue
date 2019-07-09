<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      class="grey darken-4"
    >
      <v-list subheader class="pt-0">
        <v-subheader dense>
          Navigation
        </v-subheader>
        <v-list-tile
          v-for="nav in navs"
          :key="nav.title"
          @click="handleNavigation(nav.route)"
        >
          <v-list-tile-action>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ nav.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/">
        <v-img
          src="/icon.png"
          lazy-src="/icon.png"
          alt="Logo de l'application"
          width="42"
        />
      </nuxt-link>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu
        v-model="menu"
        min-width="260"
        close-on-content-click
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn v-if="!isAuthenticated" icon @click="handleLogin">
            <v-icon>
              account_circle
            </v-icon>
          </v-btn>
          <v-btn v-else icon @click="handleMenu">
            <v-icon>
              more_horiz
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="user.avatar" alt="Avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{ user.username }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ user.email }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-divider />

          <v-list dense>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              @click="handleItem(item.action)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app class="px-2">
      <span>TakCastel &copy; 2019</span>
      <v-spacer />
      <span> v{{ applicationVersion }} </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import pkg from '../package.json'

export default {
  data: () => ({
    title: 'Application',
    dark: true,
    menu: false,
    items: [
      {
        icon: 'settings',
        title: 'Paramètres',
        action: 'settings'
      },
      {
        icon: 'logout',
        title: 'Se déconnecter',
        action: 'logout'
      }
    ],
    drawer: null,
    navs: [
      { title: 'Accueil', icon: 'home', route: '/' },
      { title: 'Discussions', icon: 'question_answer', route: '/threads' }
    ]
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.session.user
    }),

    applicationVersion: function () {
      return pkg.version
    }
  },

  // mounted() {
  //   this.$store.dispatch('auth/getUserInfos')
  // },

  methods: {
    ...mapActions({
      logout: 'auth/disconnectUser'
    }),

    /**
     * When user click on auth button, redirect user to login page
     */
    handleLogin() {
      this.$router.push('/login')
    },

    /**
     * When user click on profile button, show or hide menu
     */
    handleMenu() {
      this.menu = !this.menu
    },

    handleNavigation(route) {
      this.$router.push(route)
    },

    /**
     * When user click on menu item, redirect to any route
     */
    handleItem(action) {
      switch (action) {
        case 'logout':
          this.logout()
          break
        case 'settings':
          this.$router.push('/settings')
      }
    }
  }
}
</script>
