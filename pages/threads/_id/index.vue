<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
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
        <v-card-text>
          {{ current.body }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      current: state => state.threads.current
    })
  },

  beforeMount() {
    console.log(this.$route.params.id)
    this.getThread(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getThread: 'threads/requestThreadById'
    })
  }
}
</script>
