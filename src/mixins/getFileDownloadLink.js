export default {
    methods: {
        getFileDownloadLink(id) {
            return `${process.env.VUE_APP_BACKEND_URL}/files/download/${id}`;
          },
      }
}