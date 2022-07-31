import user from "../store";
import Vue from "vue";
import "../mock/mock.js";

import { PUBLIC_REGISTER, UNAUTHORIZED_ROUTE } from "../store/constants";
import { getJWTExpireDate } from "../store/utils";

import LoginPage from "../pages/Login.vue";
Vue.component("LoginPage", LoginPage);

export default ({ app, router, store, ...others }) => {
  let api = others.Vue.prototype.authService;

  const newRoutes = [
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
      props: true
    },
    {
      path: "/logout",
      name: "Logout",
      component: () => import("../pages/Logout.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/passwordChange",
      name: "Password Change",
      component: () => import("../pages/ChangePassword.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/passwordForgot",
      name: "Password Forgot",
      component: () => import("../pages/ForgotPassword.vue")
    },
    {
      path: "/passwordReset/:token",
      name: "Password Reset",
      component: () => import("../pages/ResetPassword.vue")
    },
    {
      path: "/fof",
      name: "Not Found",
      component: () => import("../pages/NotFound.vue")
    }
  ];

  if (PUBLIC_REGISTER) {
    newRoutes.push({
      path: "/register",
      name: "Register",
      component: () => import("../pages/Registration.vue")
    });
  }
  router.addRoutes(newRoutes);

  // add routes
  // register store module
  store.registerModule("user", user);

  const notForLoggedInPaths = [
    "/",
    "/login",
    "/register",
    "/passwordReset",
    "/passwordForgot"
  ];
  // check routes for unknown routes
  router.beforeEach(async (to, from, next) => {
    // isAuthenticated stores the access token value
    const isAuthenticated = await api.getAuthToken();
    const user = api.isLoggedIn()
      ? api.getUser()
      : isAuthenticated
      ? await api.fetchUser()
      : null;

    const protectedRoute = to.matched.some(path => path.meta.requiresAuth);
    if (protectedRoute) {
      if (isAuthenticated) {
        if (to.path === "/logout") {
          api.logout();
          next("/");
        } else if (!checkPermission(to.meta.permission)) {
          next({
            path: UNAUTHORIZED_ROUTE
          });
        } else {
          console.log("inside else");
          next();
        }
      } else if (to.path === "/logout") {
        next({ path: "/notfound" });
      } else {
        next({
          path: "/login",
          query: { redirectTo: to.path }
        });
      }
    } else if (api.isLoggedIn() && notForLoggedInPaths.includes(to.path)) {
      next("/dashboard");
    } else {
      next();
    }
  });

  const checkPermission = slug => {
    const user = store.state.user.user;
    if (user.roles[0].name == "super_admin" || !slug) {
      return true;
    }
    const permitted = store.state.user.user.permissions.find(
      permission => permission.name == slug
    );
    if (permitted) {
      return true;
    }
    return false;
  };
};
