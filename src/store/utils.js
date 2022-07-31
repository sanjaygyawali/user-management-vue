import { Cookies } from 'quasar';
import axios from 'boot/axios';

export function setCookie(cname, cvalue, expiration) {
  const exdays = expiration.expires || null;
  // const path = expiration.path || '/';

  // if no expiration days
  if (exdays === -1) {
    Cookies.remove(cname, expiration);
    return;
  }

  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  // let expires = "expires=" + d.toUTCString()
  // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  Cookies.set(cname, cvalue, expiration);
}

export function setToLocalStorage(key, value, keepLoggedIn) {
  if (localStorage.getItem(key) || keepLoggedIn) {
    value ? localStorage.setItem(key, value) : localStorage.removeItem(key);
  } else {
    if (value) {
      localStorage.setItem(key, value);
    }
  }
}

export function useCookies() {
  /*
    some condition here
  */
  return true;
}

export function getCookies(key) {
  return Cookies.get(key);
}

export function getFromStorage(key) {
  let val = Cookies.get(key);
  return val;
}

export async function getStoredToken(key) {
  let val = null;
  if (useCookies()) {
    val = await getCookies(key);
  }
  return val;
}

export function setAuthorizationHeader(authToken) {
  axios.instance.defaults.headers.common['Authorization'] = authToken ? 'Bearer ' + authToken : '';
}

// for checking token expiry - not used
export function checkTokenStatus(exp) {
  if (Date.now() >= new Date(exp)) {
    return false;
  }
  return true;
}

// for checking token expiry - not used
export function getJWTExpireDate(token) {
  if (token) {
    try {
      const { exp: expires } = JSON.parse(window.atob(token));
      if (typeof expires === 'number') {
        return new Date(expires * 1000);
      }
    } catch {
    }
  }
  return null;
}
