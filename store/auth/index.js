import {
  AUTHENTICATE_USER,
  CONNECT_USER,
  SET_USER,
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
   * then automatically access app as logged in
   * @param {Object} payload
   */
  registerUser({ dispatch }, payload) {
    this.$axios
      .post('/auth/local/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
      .then((response) => {
        dispatch('manageAuthentication', {
          response,
          routeName: '/threads'
        })
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
  authenticateUser({ dispatch }, payload) {
    this.$axios
      .post('/auth/local', {
        identifier: payload.identifier,
        password: payload.password
      })
      .then((response) => {
        dispatch('manageAuthentication', {
          response,
          routeName: '/threads'
        })
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Once the payload is a success
   * handle the logical user auth
   * @param {response} Object, user data received
   * @param {routeName} String, redierction path
   */
  manageAuthentication({ commit }, { response, routeName }) {
    commit('CONNECT_USER', response)
    commit('AUTHENTICATE_USER', true)
    this.$router.push(routeName)
    this.$axios.setToken(response.data.jwt, 'Bearer')

    // Save the data in a Cookie 🍪 for future navigations
    Cookie.set('auth', response.data)
  },

  /**
   * Log the user out of the application
   * @param {*} param0
   */
  disconnectUser({ commit }) {
    commit('DISCONNECT_USER')
    commit('AUTHENTICATE_USER', false)
    this.$axios.setHeader('Authorization', null)
    this.$router.push('/')
    Cookie.remove('auth')
  }
}

export const mutations = {
  [CONNECT_USER](state, response) {
    state.session = response.data
  },

  [AUTHENTICATE_USER](state, status) {
    state.isAuthenticated = status
  },

  [SET_USER](state, response) {
    state.session.user = response.data
  },

  [DISCONNECT_USER](state) {
    state.session = {
      user: 'Anonymous',
      jwt: undefined
    }
  },

  [RESTORE_SESSION](state, session) {
    state.session = session
  }
}
