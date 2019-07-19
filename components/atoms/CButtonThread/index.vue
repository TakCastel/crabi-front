<template>
  <v-btn
    v-if="variant === 'floating'"
    color="primary"
    absolute
    bottom
    right
    icon
    @click="handleCreate"
  >
    <v-icon>
      add
    </v-icon>
  </v-btn>
  <v-btn
    v-else
    color="primary"
    outline
    @click="handleCreate"
  >
    Nouveau
  </v-btn>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'floating', // floating, block
      required: false
    }
  },

  methods: {
    handleCreate() {
      this.$router.push('/publish')
    }
  }
}
</script>
