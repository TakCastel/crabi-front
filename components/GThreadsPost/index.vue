<template>
  <v-form>
    <v-text-field
      v-model="title"
      label="Titre du sujet"
      placeholder="De quoi allez-vous parler ?"
      outline
    />
    <v-textarea
      v-model="message"
      label="Message"
      placeholder="Ecrivez-votre message"
      :counter="10000"
      rows="17"
      outline
    />
    <v-layout>
      <v-spacer />
      <v-btn
        class="primary"
        round
        large
        @click="handlePost"
      >
        Poster
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Il faut un titre pour votre sujet',
      v => (v && v.length <= 120) || 'Le titre doit contenir moins de 120 caractères'
    ],
    message: '',
    messageRules: [
      v => !!v || 'Un email est demandé',
      v => /.+@.+/.test(v) || 'Le format mail est requis'
    ]
  }),

  methods: {
    ...mapActions({
      post: 'threads/publishThread'
    }),

    handlePost() {
      this.post({
        title: this.title,
        body: this.message
      })
    }
  }
}
</script>
