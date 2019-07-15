<template>
  <v-layout>
    <v-flex xs12>
      <c-base-thread />
    </v-flex>
  </v-layout>
</template>

<script>
import CBaseThread from '@/components/organisms/CBaseThread'

export default {
  middleware: [
    'protected'
  ],

  components: {
    CBaseThread
  }
}
</script>
