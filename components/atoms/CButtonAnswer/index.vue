<template>
  <div>
    <v-btn color="primary" @click="dialog=true">
      Répondre
    </v-btn>
    <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="800">
      <v-card>
        <v-toolbar color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Réponse</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <c-form-message variant="answer" @submission="dialog=false" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CFormMessage from '@/components/molecules/CFormMessage'

export default {
  components: {
    CFormMessage
  },

  data: () => ({
    dialog: false
  }),

  computed: {
    ...mapState({
      current: state => state.threads.current
    }),

    defaultValue: function () {
      const formValues = {
        title: this.current.title,
        message: this.current.body
      }
      return formValues
    }
  }
}
</script>
