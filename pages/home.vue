<template>
  <v-layout>
    <v-flex xs12>
      <section class="heading">
        <h1>Liste des threads</h1>
        <p>Ces threads sont privés</p>
      </section>
      <section class="body">
        <g-threads-list />
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import GThreadsList from '@/components/GThreadsList'

export default {
  middleware: [
    'protected'
  ],
  components: {
    GThreadsList
  }
}
</script>
