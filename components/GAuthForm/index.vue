<template>
  <g-base-modal>
    <v-layout slot="header">
      <span class="title">
        {{ isRegistering ? 'Inscription' : 'Connexion' }}
      </span>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-img
          class="autocentered"
          src="/icon.png"
          lazy-src="/icon.png"
          alt="Logo de l'application"
          width="100"
        />
      </v-flex>
    </v-layout>
    <v-form
      ref="form"
      slot="default"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="identifier"
        :rules="identifierRules"
        :label="isRegistering ? 'Utilisateur' : 'Identifiant'"
        placeholder="John Doe"
        outline
        required
      />
      <v-text-field
        v-if="isRegistering"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        placeholder="johndoe@email.com"
        outline
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Mot de passe"
        placeholder="Votre mot de passe sécurisé"
        outline
        @click:append="show = !show"
      />
    </v-form>
    <v-layout slot="footer" column>
      <v-flex class="mb-2">
        <v-btn
          :disabled="!valid"
          color="primary"
          round
          large
          block
          @click="handleSubmit"
        >
          {{ isRegistering ? 'Créer' : 'Connexion' }}
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn
          class="transparent"
          flat
          round
          large
          block
          @click="handleSwitch"
        >
          {{ isRegistering ? 'Déjà un compte ?' : 'Créer un compte' }}
        </v-btn>
      </v-flex>
    </v-layout>
  </g-base-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import GBaseModal from '@/components/GBaseModal'

export default {
  components: {
    GBaseModal
  },

  data: () => ({
    isRegistering: false,
    valid: true,
    identifier: '',
    identifierRules: [
      v => !!v || 'Un identifiant est demandé'
    ],
    email: '',
    emailRules: [
      v => !!v || 'Un email est demandé',
      v => /.+@.+/.test(v) || 'Le format mail est requis'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Renseignez votre mot de passe'
    ],
    show: false
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },

  methods: {
    ...mapActions({
      register: 'auth/registerUser',
      login: 'auth/authenticateUser'
    }),

    /**
     * Send data to the store actions and
     * login or register according to form layout
     */
    handleSubmit() {
      console.log(this.identifier, this.password)
      if (this.$refs.form.validate()) {
        if (this.isRegistering) {
          this.register({
            username: this.identifier,
            email: this.email,
            password: this.password
          })
        } else {
          this.login({
            identifier: this.identifier,
            password: this.password
          })
        }
      }
    },

    /**
     * Allow user to switch from create account
     * or login form by clicking the switch button
     */
    handleSwitch() {
      this.isRegistering = !this.isRegistering
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style>
.autocentered {
  margin: auto
}
</style>
