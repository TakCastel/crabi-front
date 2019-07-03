<template>
  <v-app :dark="dark">
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
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
export default {
  data: () => ({
    title: 'Roleplay',
    dark: true
  })
}
</script>
