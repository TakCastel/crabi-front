<template>
  <v-card>
    <v-card-title>
      <div>
        <h2>
          {{ content.title }}
        </h2>
        <span class="accent--text">
          Publié par {{ content.author }} le {{ dateToString(content.createdAt) }}
        </span>
      </div>
    </v-card-title>
    <v-divider />
    <v-card-text v-html="compiledMarkdown" />
    <v-divider />
    <v-card-actions>
      <span v-if="content.editedAt" class="caption accent--text">Dernière édition le {{ dateToString(content.editedAt) }} par {{ content.editedBy }}</span>
      <v-spacer />
      <c-button-edit class="mr-2" :endpoint="variant" />
      <c-button-delete :id="content._id" :endpoint="variant" />
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
import marked from 'marked'

import CButtonEdit from '@/components/atoms/CButtonEdit'
import CButtonDelete from '@/components/atoms/CButtonDelete'

export default {
  components: {
    CButtonEdit,
    CButtonDelete
  },

  props: {
    content: {
      type: Object,
      default: () => ({ }),
      required: true
    },
    variant: {
      type: String,
      default: 'threads', // threads or answers
      required: true
    }
  },

  computed: {
    compiledMarkdown: function () {
      return marked(this.content.body)
    }
  },

  methods: {
    dateToString(date) {
      const formatedDate = moment(date)
      return formatedDate.locale('fr').format('D MMMM YYYY')
    }
  }
}
</script>
