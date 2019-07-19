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
          _sort: 'created_At:asc'
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
   * Given a specific id and api path,
   * we should be able to delete a content
   * @param {String} id
   * @param {String} endpoint threads or answers
   */
  deleteMessage({ rootState, dispatch }, payload) {
    this.$axios
      .delete(`/${payload.endpoint}/${payload.id}`)
      .then(() => {
        if (payload.endpoint === 'threads') {
          // If we delete the entiere thread, go back to main threads view
          this.$router.push(`/threads`)
        } else {
          // Else update the current content to display correct answers
          dispatch('requestThreadById', rootState.threads.current._id)
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
    this.$axios
      .post('/threads', {
        title: payload.title,
        body: payload.body,
        author: rootState.auth.session.user.username,
        user: rootState.auth.session.user._id
      })
      .then(() => {
        this.$router.push('/threads')
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  publishAnswer({ rootState, dispatch }, payload) {
    const id = rootState.threads.current._id
    this.$axios
      .post('/answers', {
        body: payload.body,
        author: rootState.auth.session.user.username,
        user: rootState.auth.session.user._id,
        topic: id
      })
      .then(() => {
        // update current content to display answer added
        dispatch('requestThreadById', id)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Given a specific id, we should be able to edit a thread
   * @param {*} param0
   * @param {String} id
   */
  editThread({ rootState, dispatch }, payload) {
    const id = rootState.threads.current._id
    this.$axios
      .put(`/threads/${id}`, {
        title: payload.title,
        body: payload.body,
        editedBy: rootState.auth.session.user.username,
        editedAt: new Date()
      })
      .then(() => {
        dispatch('requestThreadById', id)
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
