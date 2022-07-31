import { checkTokenStatus, getStoredToken } from './utils'

export function isLoggedIn(state) {
  // return state.user && state.AccessToken ? true : false
  return state.user ? true : false
}

export function isAutheticated(state) {
  return state.accessToken ? true : false
}

export function getUserRole(state) {
  return state.user ? state.user.role : ''
}

export function getUser(state) {
  return state.user ? state.user : null
}

export function getTokens(state) {
  const access_token = getStoredToken('access_token')
  const refresh_token = getStoredToken('refresh_token')
  return { access_token, refresh_token }
}

export function isTokenAlive(state) {
  if(!state.access_token) {
    return false
  }
  return checkTokenStatus(Date.now())
}
