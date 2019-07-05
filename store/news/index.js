import {
  SET_NEWSFEED
} from './mutation-types'

export const state = () => ({
  articles: []
})

export const actions = {
  /**
   * Request the Newsfeed to display all actions
   * ordered last created first by default
   * @param {*} param0
   */
  requestNewsfeed({ commit }) {
    this.$axios
      .get('/news', {
        params: {
          _sort: 'created_At:desc'
        }
      })
      .then((response) => {
        commit('SET_NEWSFEED', response)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  [SET_NEWSFEED](state, response) {
    state.articles = response.data
  }
}
