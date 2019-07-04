export default function ({ store, redirect }) {
  const jwtToken = store.state.auth.session.jwt
  if (jwtToken) {
    return redirect('/')
  }
}
