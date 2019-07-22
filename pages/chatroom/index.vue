<template>
  <v-layout column justify-center align-stretch>
    <v-flex class="chatroom chatroom-messages mb-5">
      <div v-for="message in messages" :key="message.id" class="py-1 mb-2" flat transparent>
        <span class="subheading font-weight-bold">
          {{ message.author }}
        </span>
        <p>
          {{ message.text }}
        </p>
        <v-divider />
      </div>
    </v-flex>
    <v-flex class="chatroom chatroom-input grey darken-4">
      <v-form ref="form" @submit.prevent="handlePost">
        <v-layout pa-3>
          <v-text-field
            v-model="text"
            color="white"
            label="Envoyer un message"
            append-outer-icon="send"
            hide-details
            outline
            @click:append-outer="handlePost"
          />
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    text: ''
  }),

  computed: {
    ...mapState({
      messages: state => state.chatroom.messages
    })
  },

  beforeMount() {
    this.getMessages()
  },

  methods: {
    ...mapActions({
      getMessages: 'chatroom/requestChatroomMessages',
      postMessage: 'chatroom/postMessage'
    }),

    handlePost() {
      if (this.$refs.form.validate()) {
        this.postMessage(this.text)
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style lang="scss">
  .chatroom {
    &-messages {
      max-height: calc(100vh - 136px);
      overflow: scroll;
    }
    &-input {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
</style>
