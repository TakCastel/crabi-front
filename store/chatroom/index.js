import {
  SET_CHATROOM
} from './mutation-types'

export const state = () => ({
  messages: []
})

export const actions = {
  /**
   * Request the last chatroom messages
   * @param {*} param0
   */
  requestChatroomMessages({ commit }) {
    this.$axios
      .get('/chats', {
        params: {
          _sort: 'created_At:desc'
        }
      })
      .then((response) => {
        commit('SET_CHATROOM', response.data)
        window.scrollTo(0, document.body.scrollHeight)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Post a new message in chatroom
   * @param {String} title
   * @param {String} body
   * @param {Object} user
   */
  postMessage({ rootState, dispatch }, payload) {
    this.$axios
      .post('/chats', {
        author: rootState.auth.session.user.username,
        text: payload
      })
      .then(() => {
        dispatch('requestChatroomMessages')
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  [SET_CHATROOM](state, response) {
    state.messages = response
  }
}
