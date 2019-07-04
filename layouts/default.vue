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
      <g-auth-button />
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
import GAuthButton from '@/components/GAuthButton'

export default {
  components: {
    GAuthButton
  },

  data: () => ({
    title: 'Application',
    dark: true
  })
}
</script>
