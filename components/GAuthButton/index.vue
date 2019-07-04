<template>
  <v-btn v-if="!isAuthenticated" icon @click="handleLogin">
    <v-icon>
      account_circle
    </v-icon>
  </v-btn>
  <v-btn v-else icon @click="handleProfile">
    <v-icon>
      more_horiz
    </v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    menu: false
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },

  methods: {
    /**
     * When we click on auth button,
     * redirect user to login page
     */
    handleLogin() {
      this.$router.push('/login')
    },

    /**
     * If the user is connected,
     * he can access to his profile infos
     */
    handleProfile() {
      this.menu = !this.menu
    }
  }
}
</script>
