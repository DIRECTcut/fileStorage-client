<template>
  <div id="container">
    <b-card title="Page not found" class="mb-2 text-center mx-auto">
      <b-button class="mx-3" variant="primary" @click="onBackButtonClicked">
        Go Back
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  methods: {
    onBackButtonClicked() {
      return this.$router.go(-1);
    },
  },
};
</script>