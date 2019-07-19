<template>
  <v-layout>
    <v-flex xs12>
      <section class="heading">
        <h1>Landing page</h1>
        <p>L'actualité du site</p>
      </section>
      <section class="body">
        <c-list-news />
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import CListNews from '@/components/organisms/CListNews'

export default {
  components: {
    CListNews
  }
}
</script>
