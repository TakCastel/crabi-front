import {
  SET_THREADS
} from './mutation-types'

export const state = () => ({
  topics: []
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
  }
}
