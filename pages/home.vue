<template>
  <v-layout>
    <v-flex xs12>
      <div>
        Homepage
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: [
    'protected'
  ]
}
</script>
