import {
  SET_THREADS,
  SET_CURRENT_THREAD
} from './mutation-types'

export const state = () => ({
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
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  requestThreadById({ commit }, id) {
    this.$axios
      .get('/threads', {
        params: {
          _id: id
        }
      })
      .then((response) => {
        commit('SET_CURRENT_THREAD', response)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Post a new thread in root threads models
   * @param {*} param0
   */
  publishThread({ commit }, payload) {
    this.$axios
      .post('/threads', payload)
      .then(() => {
        this.$router.push('/threads')
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  [SET_THREADS](state, response) {
    state.topics = response.data
  },

  [SET_CURRENT_THREAD](state, response) {
    state.current = response.data[0]
  }
}
