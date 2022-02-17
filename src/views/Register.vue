<template>
  <div>
    <h1>Register</h1>

    <b-form @submit.prevent="onSubmit" @reset="onReset">
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

      <b-form-group id="fieldset-3" label="Repeat password" label-for="input-3">
        <b-form-input
          type="password"
          v-model="passwordConfirm"
          id="input-3"
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
      <span class="mx-3">Already Have An Account?</span>
      <router-link class="btn btn-outline-primary" to="/login"
        >Sign In</router-link
      >
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "@/axios";
import { isNil } from "lodash";

export default {
  name: "RegisterPage",
  props: {},
  data() {
    return {
      username: null,
      password: null,
      passwordConfirm: null,
    };
  },
  computed: {
    ...mapGetters(["hasCurrentUser"]),
    isSubmitDisabled() {
      if (
        isNil(this.password) ||
        isNil(this.passwordConfirm) ||
        isNil(this.username)
      )
        return true;
      if (this.passwordConfirm === this.password) return false;
      return true;
    },
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit() {
      return axios
        .post("/users/signup", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.login({
            username: res.data.username,
            password: this.password,
          });
        })
        .then(() => this.$router.push("/upload"))
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error setting up the account",
            text: "Try again later",
          });
        });
    },
    onReset() {
      this.username = null;
      this.password = null;
      this.passwordConfirm = null;
    },
  },
};
</script>