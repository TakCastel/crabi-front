export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const jwt = store.state.auth.session.jwt
    if (jwt) {
      config.headers.common.Authorization = `Bearer ${jwt}`
    }
  })
}
