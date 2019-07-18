<template>
  <v-form>
    <v-text-field
      v-model="value.title"
      label="Titre du sujet"
      placeholder="De quoi allez-vous parler ?"
      outline
    />
    <v-textarea
      v-model="value.message"
      label="Message"
      placeholder="Ecrivez-votre message"
      :counter="10000"
      rows="17"
      outline
    />
    <v-layout>
      <v-spacer />
      <v-btn
        slot="footer"
        class="primary"
        round
        large
        @click="handleSubmit"
      >
        {{ variant === 'post' ? 'Poster' : 'Editer' }}
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    variant: {
      type: String,
      default: 'post', // post, edition, answer
      required: false
    },
    value: {
      type: Object,
      default: () => ({
        title: '',
        message: ''
      }),
      required: false
    }
  },

  data: () => ({
    valid: true,
    titleRules: [
      v => !!v || 'Il faut un titre pour votre sujet',
      v => (v && v.length <= 120) || 'Le titre doit contenir moins de 120 caractères'
    ],
    messageRules: [
      v => !!v || 'Un email est demandé',
      v => /.+@.+/.test(v) || 'Le format mail est requis'
    ]
  }),

  computed: {
    formTitle: {
      get() { return this.title },
      set(value) { this.$emit('input', value) }
    },
    formMessage: {
      get() { return this.message },
      set(value) { this.$emit('input', value) }
    }
  },

  methods: {
    ...mapActions({
      publishThread: 'threads/publishThread',
      editThread: 'threads/editThread'
    }),

    handleSubmit() {
      const payload = {
        title: this.value.title,
        body: this.value.message
      }

      if (this.variant === 'post') {
        this.publishThread(payload)
      } else {
        this.editThread(payload)
        this.$emit('submission')
      }
    }
  }
}
</script>
