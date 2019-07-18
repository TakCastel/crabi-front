<template>
  <v-layout column>
    <v-flex xs12>
      <v-card v-if="loading">
        <v-card-text class="text-xs-center">
          <v-progress-circular indeterminate />
        </v-card-text>
      </v-card>
      <c-base-message v-else :content="current" variant="post" />
    </v-flex>
    <v-flex v-if="answers" xs12>
      <c-answers-list />
    </v-flex>
    <v-flex xs12>
      <v-layout py-3>
        <v-spacer />
        <c-button-thread variant="block" />
        <c-button-answer />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import CButtonAnswer from '@/components/atoms/CButtonAnswer'
import CButtonThread from '@/components/atoms/CButtonThread'
import CAnswersList from '@/components/molecules/CAnswersList'
import CBaseMessage from '@/components/organisms/CBaseMessage'

export default {
  components: {
    CButtonAnswer,
    CButtonThread,
    CAnswersList,
    CBaseMessage
  },

  computed: {
    ...mapState({
      loading: state => state.threads.loading,
      current: state => state.threads.current,
      answers: state => state.threads.answers
    })
  },

  beforeMount() {
    if (this.$route.params.id !== this.current.id) {
      this.getThread(this.$route.params.id)
    }
  },

  methods: {
    ...mapActions({
      getThread: 'threads/requestThreadById'
    })
  }
}
</script>
