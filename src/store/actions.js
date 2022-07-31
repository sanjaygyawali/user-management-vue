import axios from "boot/axios";
import { getCookies, getStoredToken, setAuthorizationHeader } from "./utils";
import { Notify } from "quasar";
import Vue from "vue";

import {
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  FETCH_USER_ROUTE,
  PASSWORD_RESET_ROUTE,
  PASSWORD_CHANGE_ROUTE,
  PASSWORD_FORGOT_ROUTE,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_ROUTE
} from "./constants";

export async function getRequestAuthHeader(context) {
  const token = await getStoredToken(TOKEN_KEY);
  setAuthorizationHeader(token);
  return token;
}

export async function login(context, userCredentials) {
  try {
    const res = await axios.post(LOGIN_ROUTE, {
      username: userCredentials.email,
      password: userCredentials.password
    });
    const userData = res.data;
    context.commit("setUser", {
      user: userData,
      tokens: {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken || null
      }
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export async function register(context, data) {
  return await axios.post(REGISTER_ROUTE, data);
}

export async function logout(context) {
  try {
    const res = await axios.post(LOGOUT_ROUTE, {
      accessToken: context.state.accessToken,
      refreshToken: context.state.refreshToken
    });
    context.commit("setUser", { user: null, tokens: {} });
    Notify.create({ message: "You are now logged out", type: "positive" });
    return res;
  } catch (err) {
    await context.commit("setUser", { user: null, tokens: {} });
    Notify.create({
      type: "negative",
      message: "Authentication Error",
      caption: "Please login again",
      timeout: 10000
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    throw err;
  }
}

export async function localLogout(context) {
  await context.commit("setUser", { user: null, tokens: {} });
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

export async function fetchUser(context) {
  let userData = null;
  try {
    userData = await axios.get(FETCH_USER_ROUTE);
    let accessToken = null;
    let refreshToken = null;
    const token = await getStoredToken(TOKEN_KEY);
    const refreshTok = await getStoredToken(REFRESH_TOKEN_KEY);

    if (userData && (token || refreshTok)) {
      accessToken = token ? token : null;
      refreshToken = refreshTok ? refreshTok : null;
    }
    // if(userData && userData.data) {
    //   refreshToken = token ? userData.data.token.refreshToken.split(' ')[1] : null
    // }
    context.commit("setUser", {
      user: userData && userData.data ? userData.data : null,
      tokens: { accessToken, refreshToken }
    });
  } catch (err) {
    throw err;
  }
  return userData;
}

// export async function getUserRole(context) {
//   let userRole = ''
//   try {
//     return userRole = await axios.post(USER_ROLE_ROUTE)
//   } catch (err) {
//     return err.message
//   }
// }

// for email confirmation for password reset
export async function passwordForgot(context, data) {
  try {
    return await axios.post(PASSWORD_FORGOT_ROUTE + `?email=${data.email}`);
  } catch (err) {
    throw err;
  }
}

// for password reset after email confirmation
export async function passwordReset(context, data) {
  try {
    return await axios.post(PASSWORD_RESET_ROUTE, data);
  } catch (err) {
    throw err;
  }
}

// for password change by user
export async function passwordChange(context, data) {
  try {
    return axios.post(PASSWORD_CHANGE_ROUTE, data);
  } catch (err) {
    throw err;
  }
}

export async function refreshToken(context, data) {
  let refreshToken = await getStoredToken(REFRESH_TOKEN_KEY);
  let newToken = null;
  try {
    newToken = await axios.post(REFRESH_TOKEN_ROUTE, { refreshToken });
    context.commit("updateToken", {
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken
    });
    return newToken;
  } catch (err) {
    throw err;
  }
}
