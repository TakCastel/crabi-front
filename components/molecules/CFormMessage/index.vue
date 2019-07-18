<template>
  <v-form>
    <v-text-field
      v-if="variant !== 'answer'"
      v-model="value.title"
      label="Titre du sujet"
      placeholder="De quoi allez-vous parler ?"
      outline
    />
    <v-textarea
      v-model="value.message"
      label="Message"
      :placeholder="variant !== 'answer' ? 'Ecrivez votre message' : 'Ecrivez votre réponse'"
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
        {{ variant === 'edit' ? 'Editer' : 'Poster' }}
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
      default: 'post', // post, edit, answer
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
      post: 'threads/publishThread',
      edit: 'threads/editThread',
      answer: 'threads/publishAnswer'
    }),

    /**
   * On submission, this form can be used as
   * post new topic, answer current thread
   * or edit current thread
   */
    handleSubmit() {
      const threadPayload = {
        title: this.value.title,
        body: this.value.message
      }

      const answerPayload = {
        body: this.value.message
      }

      if (this.variant === 'post') {
        this.post(threadPayload)
      } else if (this.variant === 'edit') {
        this.edit(threadPayload)
        this.$emit('submission')
      } else {
        this.answer(answerPayload)
        this.$emit('submission')
      }
    }
  }
}
</script>
