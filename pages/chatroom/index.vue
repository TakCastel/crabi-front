<template>
  <v-layout column justify-center align-stretch>
    <v-flex ref="chatroom" class="chatroom chatroom-messages mb-5">
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
          <v-btn color="primary" @click="ping">
            ping
          </v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    text: '',
    tweets: []
  }),

  sockets: {
    connect() {
      console.log('[WS] Connected')
    },
    tweet(tweet) {
      this.tweets.unshift(tweet)
      if (this.tweets.length > 100) {
        this.tweets.splice(-1, 1)
      }
    }
  },

  computed: {
    ...mapState({
      messages: state => state.chatroom.messages,
      username: state => state.auth.session.user.username
    })
  },

  mounted() {
    this.getMessages()
  },

  updated() {
    this.$refs.chatroom.scrollTop = this.$refs.chatroom.scrollHeight
  },

  methods: {
    ...mapActions({
      getMessages: 'chatroom/requestChatroomMessages',
      postMessage: 'chatroom/postMessage'
    }),

    ping() {
      console.log('socket emit event')
    },

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
