<template>
  <v-layout>
    <v-flex xs12>
      <section class="heading">
        <h1>Landing page</h1>
        <p>L'actualité du site</p>
      </section>
      <section class="body">
        <g-news-list />
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import GNewsList from '@/components/GNewsList'

export default {
  components: {
    GNewsList
  }
}
</script>
