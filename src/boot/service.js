// import Vue from "vue";

export default ({ app, router, store, Vue }) => {
  const api = {};
  api.login = async data => {
    return store.dispatch("user/login", data);
  };
  api.register = async data => {
    return store.dispatch("user/register", data);
  };
  api.logout = () => {
    return store.dispatch("user/logout");
  };
  api.localLogout = () => {
    return store.dispatch("user/localLogout");
  };
  api.isLoggedIn = () => {
    return store.getters["user/isLoggedIn"];
  };
  api.getAuthToken = async () => {
    return store.dispatch("user/getRequestAuthHeader");
  };
  api.fetchUser = async () => {
    return store.dispatch("user/fetchUser");
  };
  api.getUser = async () => {
    return store.getters["user/getUser"];
  };
  api.passwordChange = async data => {
    return store.dispatch("user/passwordChange", data);
  };
  api.passwordForgot = async data => {
    return store.dispatch("user/passwordForgot", data);
  };
  api.passwordReset = async data => {
    return store.dispatch("user/passwordReset", data);
  };
  api.updateToken = async data => {
    return store.dispatch("user/refreshToken", data);
  };
  Vue.prototype.authService = api;
};
