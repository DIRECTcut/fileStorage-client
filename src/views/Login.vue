<template>
  <div>
    <h1>Sign in</h1>

    <b-form @submit.prevent="onSubmit">
      <b-form-group id="fieldset-1" label="Username" label-for="input-1">
        <b-form-input v-model="username" required id="input-1"></b-form-input>
      </b-form-group>

      <b-form-group id="fieldset-2" label="Password" label-for="input-2">
        <b-form-input
          type="password"
          v-model="password"
          id="input-2"
        ></b-form-input>
      </b-form-group>

      <div class="my-3">
        <b-button
          class="mx-3"
          :disabled="isSubmitDisabled"
          type="submit"
          variant="primary"
          >Submit</b-button
        >

        <b-button class="mx-3" type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>

    <div class="my-3">
      <span class="mx-3">Don't Have an Account Yet?</span>
      <router-link class="btn btn-outline-primary" to="/register"
        >Register</router-link
      >
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import redirectMixin from "../mixins/redirect.js";
import { isNil } from "lodash";

export default {
  name: "LoginPage",
  mixins: [redirectMixin],
  data: () => {
    return {
      username: null,
      password: null,
    };
  },
  computed: {
    isSubmitDisabled() {
      return isNil(this.username) || isNil(this.password);
    },
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit() {
      this.login({ username: this.username, password: this.password })
        .then(() => this.$router.push("/upload"))
        .catch((e) => {
          this.$notify({
            type: "error",
            title: "Error logging in",
            text: e.response.status === 401 ? "Wrong credentials" : null,
          });
          this.clearCredentials();
        });
    },
    clearCredentials() {
      this.username = null;
      this.password = null;
    },
  },
};
</script>

<style>
</style>