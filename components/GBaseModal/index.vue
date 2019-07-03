<template>
  <v-dialog v-model="dialog" persistent :fullscreen="$vuetify.breakpoint.xsOnly" max-width="400px">
    <v-card tile class="flexcard">
      <v-card-title class="pa-2 grey darken-4">
        <v-btn icon @click="handleClick">
          <v-icon>
            arrow_back
          </v-icon>
        </v-btn>
        <slot name="header" />
      </v-card-title>
      <v-card-text class="grow">
        <slot />
      </v-card-text>
      <v-card-actions>
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: true
  }),

  methods: {
    /**
     * When the user click on icon button, it closes
     * the modal or go to previous router view
     */
    handleClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
