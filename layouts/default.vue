<template>
  <v-app :dark="dark">
    <v-toolbar
      fixed
      app
    >
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
        min-width="300"
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
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      class="px-2"
      app
    >
      <span>TakCastel &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    title: 'Application',
    dark: true,
    menu: false,
    items: [
      {
        icon: 'logout',
        title: 'Se déconnecter',
        action: 'logout'
      }
    ]
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.session.user
    })
  },

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

    /**
     * When user click on menu item, redirect to any route
     */
    handleItem(action) {
      switch (action) {
        case 'logout':
          this.logout()
      }
    }
  }
}
</script>
