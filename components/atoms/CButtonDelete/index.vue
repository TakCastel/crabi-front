<template>
  <div>
    <v-btn small icon class="primary" outline @click.stop="showAlertModale=true">
      <v-icon small color="primary">
        delete
      </v-icon>
    </v-btn>
    <c-base-modale v-model="showAlertModale" :router="false">
      <h3 slot="header">
        Suppression
      </h3>
      <v-layout slot="default">
        <v-icon large class="mr-3">
          warning
        </v-icon>
        <span>Attention ! Vous êtes sur le point de supprimer définitivement ce contenu. Êtes-vous sûr de vouloir continuer ?</span>
      </v-layout>
      <v-layout slot="footer">
        <v-spacer />
        <v-btn color="primary" outline @click="handleConfirm">
          Oui
        </v-btn>
        <v-btn color="primary" @click.stop="showAlertModale=false">
          Annuler
        </v-btn>
      </v-layout>
    </c-base-modale>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CBaseModale from '@/components/molecules/CBaseModale'

export default {
  components: {
    CBaseModale
  },

  props: {
    // Id of the content you want to delete
    id: {
      type: String,
      default: undefined,
      required: true
    },

    // What endpoint this button shall target ?
    endpoint: {
      type: String,
      default: 'threads', // threads or answers
      required: true
    }
  },

  data: () => ({
    showAlertModale: false
  }),

  methods: {
    ...mapActions({
      deleteMessage: 'threads/deleteMessage'
    }),

    handleConfirm() {
      const deletePayload = {
        id: this.id,
        endpoint: this.endpoint
      }
      this.deleteMessage(deletePayload)
      this.showAlertModale = false
    }
  }
}
</script>
