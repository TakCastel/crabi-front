<template>
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
          Publié par {{ current.user.username }} le {{ dateToString(current.createdAt) }}
        </span>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text v-html="compiledMarkdown" />
    <v-divider />
    <v-card-actions>
      <span v-if="current.editedAt">Dernière édition le {{ dateToString(current.editedAt) }}</span>
      <v-spacer />
      <c-button-edit class="mr-2" />
      <c-button-delete :id="current._id" />
    </v-card-actions>
  </v-card>
</template>

<script>
import marked from 'marked'
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

import CButtonEdit from '@/components/atoms/CButtonEdit'
import CButtonDelete from '@/components/atoms/CButtonDelete'

export default {
  components: {
    CButtonEdit,
    CButtonDelete
  },

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
    }),

    dateToString(date) {
      const formatedDate = moment(date)
      return formatedDate.locale('fr').format('D MMMM YYYY')
    }
  }
}
</script>
