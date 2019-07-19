<template>
  <v-layout column>
    <v-flex v-for="answer in answers" :key="answer._id">
      <c-base-message :content="answer" variant="answers" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

import CBaseMessage from '@/components/organisms/CBaseMessage'

export default {
  components: {
    CBaseMessage
  },
  computed: {
    ...mapState({
      answers: state => state.threads.current.answers
    })
  }
}
</script>
