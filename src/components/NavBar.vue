<template>
  <b-navbar toggleable="false">
    <h2>Signed in</h2>

    <b-navbar-nav>
      <router-link class="btn btn-outline-primary" to="/files"
        >My Files</router-link
      >
    </b-navbar-nav>

    <b-navbar-nav>
      <router-link class="btn btn-outline-primary" to="/upload"
        >Upload</router-link
      >
    </b-navbar-nav>

    <b-button variant="primary" @click="onLogout">Sign out</b-button>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    onLogout() {
      return Promise.resolve()
        .then(() => this.$store.dispatch("logout"))
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  padding: 1em;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
