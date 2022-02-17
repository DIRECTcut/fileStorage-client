<template>
  <div id="app">
    <nav-bar v-if="hasOpenSession" />
    <hr />
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./components/NavBar.vue";
import cookie from "vue-cookies";
import redirectMixin from "./mixins/redirect.js";

export default {
  components: { NavBar },
  mixins: [redirectMixin],
  computed: {
    ...mapState(["hasOpenSession"]),
  },
  created() {
    this.$store.commit("setHasOpenSession", cookie.get("connect.sid"));
  },
  updated() {
    this.$store.commit("setHasOpenSession", cookie.get("connect.sid"));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  width: auto;
  margin: auto;
}
</style>
