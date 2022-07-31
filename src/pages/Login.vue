<template>
  <div class="row justify-center items-center q-pa-sm" style="min-height: 100vh">
    <form-container>
      <template v-slot:form-contents>
        <q-form @submit.prevent="submitForm">
          <div class="q-mb-md">
            <p class="input-label no-margin">Username or Email</p>
            <q-input
              outlined
              v-model="email"
              :dense="true"
              hide-bottom-space
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter username or email',
              ]"
            />
          </div>
          <div class="q-mb-md">
            <p class="input-label no-margin">Password</p>
            <q-input
              type="password"
              outlined
              v-model="password"
              :dense="true"
              hide-bottom-space
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter password',
              ]"
            />
          </div>
          <div v-if="errorMessage" class="q-mb-md text-red">{{ errorMessage }}</div>
          <div class="q-mb-md">
            <q-btn
              type="submit"
              :loading="loading"
              color="secondary"
              size="16px"
              class="full-width text-weight-light"
              label="Login"
            >
              <template v-slot:loading>
                <q-spinner-tail/>
              </template>
            </q-btn>
          </div>
        </q-form>
        <div class="form-links text-caption row justify-center">
          <router-link class="form-link text-blue-5" to="/passwordForgot">Forgot Password</router-link>
          <span v-if="PUBLIC_REGISTER">&nbsp; | &nbsp;</span>
          <router-link v-if="PUBLIC_REGISTER" class="form-link text-blue-5" to="/register">Register</router-link>
        </div>
      </template>
    </form-container>
  </div>
</template>

<script>
import FormContainer from "../component/AuthFormContainer.vue";
import { PUBLIC_REGISTER, REDIRECT_TO_AFTER_LOGIN } from "../store/constants";

export default {
  components: {
    FormContainer
  },
  data() {
    return {
      loading: false,
      PUBLIC_REGISTER,
      REDIRECT_TO_AFTER_LOGIN,
      email: "",
      password: "",
      errorMessage: null
    };
  },
  methods: {
    async submitForm() {
      try {
        this.errorMessage = null;
        this.loading = true;
        const res = await this.authService.login({
          email: this.email,
          password: this.password
        });

        if (res && this.authService.isLoggedIn()) {
          await this.authService.getAuthToken();
          await this.authService.fetchUser();
          this.$q.notify({
            message: "You are now logged in",
            type: "positive"
          });
          this.$router.push(
            this.$route.query.redirectTo ||
              this.REDIRECT_TO_AFTER_LOGIN ||
              "/admin"
          );
        } else {
          this.errorMessage = res.error.message;
        }
      } catch (err) {
        console.log(err);
        // this.errorMessage = err.error.message;
      } finally {
        this.loading = false;
      }
    }
  },
  created() {}
};
</script>

<style>
.input-label {
  font-size: 12px;
  line-height: 25px;
  color: rgb(58, 58, 58);
}

.form-link {
  text-decoration: none;
}
</style>
