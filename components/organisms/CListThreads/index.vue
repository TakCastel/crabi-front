<template>
  <v-card>
    <v-toolbar color="accent darken-4">
      <v-toolbar-title>Discussions</v-toolbar-title>
      <v-spacer />
      <c-button-thread />
    </v-toolbar>
    <v-list
      class="accent darken-3"
      two-line
      subheader
    >
      <v-subheader inset>
        Derniers sujets
      </v-subheader>
      <v-list-tile
        v-for="topic in topics"
        :key="topic.id"
        @click="handleReadThread(topic.id)"
      >
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

import CButtonThread from '@/components/atoms/CButtonThread'

export default {
  components: {
    CButtonThread

  },
  computed: {
    ...mapState({
      topics: state => state.threads.topics
    })
  },

  beforeMount() {
    this.getAllThreads()
  },

  methods: {
    ...mapActions({
      getAllThreads: 'threads/requestThreads',
      getCurrentThread: 'threads/requestThreadById'
    }),

    handleReadThread(id) {
      this.getCurrentThread(id)
    }
  }
}
</script>
