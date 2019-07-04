import {
  CONNECT_USER,
  AUTHENTICATE_USER,
  DISCONNECT_USER,
  RESTORE_SESSION
} from './mutation-types'

const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  isAuthenticated: false,
  session: {}
})

export const actions = {
  /**
   * Providing an user name, email and password,
   * the user should be able to create a new account
   * then be automatically access app as logged in
   * @param {Object} payload
   */
  registerUser({ commit }, payload) {
    this.$axios
      .post('/auth/local/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
      .then((response) => {
        commit('CONNECT_USER', response)
        commit('AUTHENTICATE_USER')
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Providing an identifier and a password
   * the user should be logged inside the app
   * @param {Object} payload
   */
  authenticateUser({ commit }, payload) {
    this.$axios
      .post('/auth/local', {
        identifier: payload.identifier,
        password: payload.password
      })
      .then((response) => {
        commit('CONNECT_USER', response)
        commit('AUTHENTICATE_USER')
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  disconnectUser({ commit }) {
    commit('DISCONNECT_USER')
    Cookie.remove('auth')
    this.$router.push('/')
  }
}

export const mutations = {
  [CONNECT_USER](state, response) {
    state.session = response.data

    this.$axios.setToken(response.data.jwt, 'Bearer')
    this.$router.push('/home')

    // Save the data in localStroage for future navigations
    // localStorage.setItem('store_session', JSON.stringify(response.data))
    Cookie.set('auth', response.data)
  },

  [AUTHENTICATE_USER](state) {
    state.isAuthenticated = true
  },

  [DISCONNECT_USER](state) {
    state.session.user = 'Anonymous'
    state.session.jwt = undefined
    state.isAuthenticated = false

    this.$axios.setHeader('Authorization', null)
  },

  [RESTORE_SESSION](state, session) {
    state.session = session
  }
}
