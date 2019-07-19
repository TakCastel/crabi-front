<template>
  <v-layout>
    <v-flex xs12>
      <section class="heading">
        <h1>Liste des threads</h1>
        <p>Ces threads sont privés</p>
      </section>
      <section class="body">
        <c-list-threads />
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import CListThreads from '@/components/organisms/CListThreads'

export default {
  middleware: [
    'protected'
  ],
  components: {
    CListThreads
  }
}
</script>
