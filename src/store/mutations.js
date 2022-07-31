import { setCookie, setAuthorizationHeader } from './utils';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from './constants';

export function setUser(state, { user, tokens }) {
  state.user = user;
  state.accessToken = tokens.accessToken || null;
  state.refreshToken = tokens.refreshToken || null;
  // set Cookie
  setCookie(TOKEN_KEY, user ? tokens.accessToken : null, user ? { expires: 1, path: '/' } : { expires: -1, path: '/' });
  setCookie(REFRESH_TOKEN_KEY, user ? tokens.refreshToken : null, user ? { expires: 1, path: '/' } : { expires: -1, path: '/' });
}

export function updateToken(state, { accessToken, refreshToken }) {
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  setAuthorizationHeader(accessToken);
  setCookie(TOKEN_KEY, accessToken ? accessToken : null, accessToken ? { expires: 1, path: '/' } : { expires: -1, path: '/' }, false);
  setCookie(REFRESH_TOKEN_KEY, refreshToken ? refreshToken : null, refreshToken ? { expires: 1, path: '/' } : { expires: -1, path: '/' }, false);
}
