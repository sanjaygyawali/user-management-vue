<template>
  <q-card
    class="form-container q-mt-lg square shadow-10"
    :style="`width: ${registerForm ? '625px': '375px'}`"
  >
    <q-card-section class="q-mb-lg no-padding row justify-center align-center">
      <q-img :src="LOGO_URL" style="height: 50px; max-width: 50px" class="q-mx-auto">
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">Cannot load image</div>
        </template>
      </q-img>
    </q-card-section>

    <q-card-section class="no-padding q-mb-lg">
      <div class="text-weight-regular text-center" style="app-title">{{ pageTitle }}</div>
    </q-card-section>

    <q-card-section class="no-padding q-mb-lg">
      <slot name="form-contents"></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { APP_NAME, LOGO_URL } from "../store/constants.js";

export default {
  props: {
    pageTitle: {
      type: String,
      default: APP_NAME
    },
    registerForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      LOGO_URL
    };
  }
};
</script>

<style>
.form-container {
  /* width: 375px; */
  height: max-content;
  padding: 20px 40px;
}

.app-title {
  font-size: 18px;
}
</style>
