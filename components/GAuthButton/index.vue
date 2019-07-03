<template>
  <v-btn v-if="isVisible" icon @click="handleClick">
    <v-icon>
      account_circle
    </v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated
    }),

    isVisible: function () {
      if (
        this.isAuthenticated ||
        this.$nuxt.$route.name === 'login'
      ) {
        return false
      } else return true
    }
  },

  methods: {
    /**
     * When we click on auth button,
     * redirect user to login page
     */
    handleClick() {
      this.$router.push('/login')
    }
  }
}
</script>
