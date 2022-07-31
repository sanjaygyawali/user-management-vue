import prompts from "app/quasar.extensions.json";

const SERVICE_PROMPTS = prompts["rasello-user-management"];

const APP_NAME = SERVICE_PROMPTS.appName;
const BASE_URL = SERVICE_PROMPTS.baseURL;
const LOGIN_ROUTE = SERVICE_PROMPTS.loginRoute;
const REGISTER_ROUTE = SERVICE_PROMPTS.registerRoute;
const PUBLIC_REGISTER = SERVICE_PROMPTS.publicRegister;
const LOGOUT_ROUTE = SERVICE_PROMPTS.logoutRoute;
const PASSWORD_CHANGE_ROUTE = SERVICE_PROMPTS.passwordChangeRoute;
const PASSWORD_FORGOT_ROUTE = SERVICE_PROMPTS.passwordForgotRoute;
const PASSWORD_RESET_ROUTE = SERVICE_PROMPTS.passwordResetRoute;
const FETCH_USER_ROUTE = SERVICE_PROMPTS.fetchUserRoute;
const USER_VERIFY_ROUTE = SERVICE_PROMPTS.userVerifyRoute;
const REFRESH_TOKEN_ROUTE = SERVICE_PROMPTS.refreshTokenRoute;
const REDIRECT_TO_AFTER_LOGIN = SERVICE_PROMPTS.redirectToAfterLogin;
const REDIRECT_TO_AFTER_LOGOUT = SERVICE_PROMPTS.redirectToAfterLogout;
const REDIRECT_TO_AFTER_REGISTER = SERVICE_PROMPTS.redirectToAfterRegister;
const UNAUTHORIZED_ROUTE = SERVICE_PROMPTS.unauthorizedRoute;
const LOGO_URL = SERVICE_PROMPTS.logoURL;

const TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

export {
  APP_NAME,
  BASE_URL,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  PUBLIC_REGISTER,
  LOGOUT_ROUTE,
  PASSWORD_CHANGE_ROUTE,
  PASSWORD_FORGOT_ROUTE,
  PASSWORD_RESET_ROUTE,
  FETCH_USER_ROUTE,
  USER_VERIFY_ROUTE,
  REFRESH_TOKEN_ROUTE,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REDIRECT_TO_AFTER_LOGIN,
  REDIRECT_TO_AFTER_LOGOUT,
  REDIRECT_TO_AFTER_REGISTER,
  UNAUTHORIZED_ROUTE,
  LOGO_URL
};
