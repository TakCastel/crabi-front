<template>
  <v-card>
    <v-toolbar color="accent darken-4">
      <v-toolbar-title>Discussions</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        absolute
        bottom
        right
        round
        @click="handleCreate"
      >
        Nouveau
        <v-icon right>
          add
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line subheader class="accent darken-3">
      <v-subheader inset>
        Derniers sujets
      </v-subheader>
      <v-list-tile v-for="topic in topics" :key="topic.id" @click="handleClick">
        <v-list-tile-avatar>
          <v-icon class="accent">
            folder
          </v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          {{ topic.title }}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      topics: state => state.threads.topics
    })
  },

  beforeMount() {
    this.getThreads()
  },

  methods: {
    ...mapActions({
      getThreads: 'threads/requestThreads'
    }),

    handleClick() {
      console.log('peeew')
    },

    handleCreate() {
      console.log('poupi !')
    }
  }
}
</script>
