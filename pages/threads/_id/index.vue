<template>
  <v-layout>
    <v-flex xs12>
      <v-card v-if="loading">
        <v-card-text class="text-xs-center">
          <v-progress-circular indeterminate />
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <div>
            <h2>
              {{ current.title }}
            </h2>
            <span class="accent--text">
              Auteur : {{ current.user.username }}
            </span>
          </div>
        </v-card-title>
        <v-divider />
        <v-card-text v-html="compiledMarkdown" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import marked from 'marked'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      loading: state => state.threads.loading,
      current: state => state.threads.current
    }),

    compiledMarkdown: function () {
      return marked(this.current.body)
    }
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
