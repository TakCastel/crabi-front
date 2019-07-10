<template>
  <v-layout>
    <v-flex sm6 offset-sm3>
      <section class="heading">
        <h1>Paramètres du compte</h1>
        <p>Vous êtes connecté en tant que {user.name}</p>
      </section>
      <section class="body">
        <v-layout row wrap>
          <v-flex xs12 mb-3>
            <v-hover>
              <v-img
                slot-scope="{ hover }"
                :src="`https://picsum.photos/100/100?image=${42}`"
                :lazy-src="`https://picsum.photos/10/10?image=${42}`"
                aspect-ratio="1"
                width="100"
                class="grey lighten-2 avatar"
              >
                <v-layout
                  v-if="hover"
                  fill-height
                  align-center
                  justify-center
                >
                  <g-field-file />
                </v-layout>
              </v-img>
            </v-hover>
          </v-flex>
          <v-flex xs12>
            <v-form>
              <v-text-field
                label="Nom d'utilisateur"
                placeholder="{user.name}"
                outline
              />
              <v-text-field
                label="Adresse mail"
                placeholder="{user.email}"
                outline
              />
              <v-layout>
                <v-spacer />
                <v-btn color="primary" round large>
                  Enregistrer
                </v-btn>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import GFieldFile from '@/components/GFieldFile'

export default {
  components: {
    GFieldFile
  }
}
</script>

<style>
.avatar {
  border-radius: 50%;
}
</style>
