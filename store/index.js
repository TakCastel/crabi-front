const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({

})

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let session = {
      user: 'Anonymous',
      jwt: undefined
    }
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        session = JSON.parse(parsed.auth)
        commit('auth/AUTHENTICATE_USER', true)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('auth/RESTORE_SESSION', session)
  }
}

export const mutations = {

}
