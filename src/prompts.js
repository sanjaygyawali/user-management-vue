/**
 * Quasar App Extension prompts script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/prompts-api
 *
 * Inquirer prompts
 * (answers are available as "api.prompts" in the other scripts)
 * https://www.npmjs.com/package/inquirer#question
 *
 */

module.exports = function() {
  return [
    {
      name: "appName",
      type: "input",
      required: true,
      message: "Enter the app name"
    },
    {
      name: "baseURL",
      type: "input",
      required: true,
      message: "URL of API server",
      default: "http://localhost:3000"
    },
    {
      name: "loginRoute",
      type: "input",
      required: true,
      message: "Route for user login",
      default: "/auth/login"
    },
    {
      name: "registerRoute",
      type: "input",
      required: true,
      message: "Route for user registration",
      default: "/auth/register"
    },
    {
      name: "publicRegister",
      type: "confirm",
      required: true,
      message: "Make the register route public?",
      default: true
    },
    {
      name: "logoutRoute",
      type: "input",
      required: true,
      message: "Route for user logout",
      default: "/auth/logout"
    },
    {
      name: "passwordChangeRoute",
      type: "input",
      required: true,
      message: "Route to change password",
      default: "/auth/change-password"
    },
    {
      name: "passwordForgotRoute",
      type: "input",
      required: true,
      message: "Route for forgotten password request",
      default: "/auth/forgot-password"
    },
    {
      name: "passwordResetRoute",
      type: "input",
      required: true,
      message: "Route to reset password",
      default: "/auth/reset-forgot-password"
    },
    {
      name: "fetchUserRoute",
      type: "input",
      required: true,
      message: "Route to fetch authenticated user",
      default: "/users/me"
    },
    {
      name: "userVerifyRoute",
      type: "input",
      required: true,
      message: "Route for user verification",
      default: "/users/verify"
    },
    {
      name: "redirectToAfterLogin",
      type: "input",
      required: true,
      message: "Route for redirection after user login",
      default: "/admin"
    },
    {
      name: "redirectToAfterLogout",
      type: "input",
      required: true,
      message: "Route for redirection after logout",
      default: "/"
    },
    {
      name: "redirectToAfterRegister",
      type: "input",
      required: true,
      message: "Route for redirection after registration",
      default: "/"
    },
    {
      name: "unauthorizedRoute",
      type: "input",
      required: true,
      message: "Route for redirection for unauthorized pages",
      default: "/unauthorized"
    },
    {
      name: "logoURL",
      type: "input",
      required: true,
      message: "URL for the App Logo",
      default: "https://www.rasello.com/images/rasellologo.png"
    }
  ];
};
