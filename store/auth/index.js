import {
  CONNECT_USER,
  DISCONNECT_USER
} from './mutation-types'

export const state = () => ({
  isAuthenticated: false,
  session: {
    user: 'Anonymous',
    jwt: undefined
  }
})

export const actions = {

  /**
   * Providing an user name, email and password,
   * the user should be able to create a new account
   * then be automatically access app as logged in
   * @param {Object} payload
   */
  registerUser({ commit }, payload) {
    console.log('payload is : ', payload)
    this.$axios
      .post('/auth/local/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
      .then((response) => {
        commit('CONNECT_USER', response)
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
        console.log(response)

        commit('CONNECT_USER', response)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  [CONNECT_USER](state, response) {
    // this.$axios.setToken(response.jwt, 'Bearer')
    console.log('mutation: ', response.data)

    state.isAuthenticated = true
    state.session = response.data

    this.$router.push('/home')
  },

  [DISCONNECT_USER](state) {
    state.isAuthenticated = false
  }
}
