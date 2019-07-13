import {
  SET_LOADER,
  SET_THREADS,
  SET_CURRENT_THREAD
} from './mutation-types'

export const state = () => ({
  loading: true,
  topics: [
    // list of all threads requested
  ],
  current: {
    // current or last thread displayed
    title: 'Sans titre',
    body: 'Message introuvable',
    user: {
      username: 'Anonymous'
    }
  }
})

export const actions = {
  /**
   * Request the Newsfeed to display all actions
   * ordered last created first by default
   * @param {*} param0
   */
  requestThreads({ commit }) {
    this.$axios
      .get('/threads', {
        params: {
          _sort: 'created_At:desc'
        }
      })
      .then((response) => {
        commit('SET_THREADS', response)
        commit('SET_LOADER', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Whenever the app needs to load a single thread
   * @param {Number} thread id
   */
  requestThreadById({ commit }, id) {
    this.$axios
      .get('/threads', {
        params: {
          _id: id
        }
      })
      .then((response) => {
        commit('SET_CURRENT_THREAD', response)
        commit('SET_LOADER', false)

        // No need to redirect if the user is already in the page
        if (this.$router.history.current.name !== 'thread-id') {
          this.$router.push(`/threads/${id}`)
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Post a new thread in root threads models
   * @param {String} title
   * @param {String} body
   * @param {Object} user
   */
  publishThread({ rootState }, payload) {
    console.log(rootState.auth.session.user)
    this.$axios
      .post('/threads', {
        title: payload.title,
        body: payload.body,
        user: rootState.auth.session.user
      })
      .then(() => {
        this.$router.push('/threads')
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  [SET_LOADER](state, status) {
    state.loading = status
  },

  [SET_THREADS](state, response) {
    state.topics = response.data
  },

  [SET_CURRENT_THREAD](state, response) {
    state.current = response.data[0]
  }
}
