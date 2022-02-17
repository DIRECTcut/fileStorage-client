export default {
    methods: {
        getFileDownloadLink(id) {
            return `http://localhost:5000/files/download/${id}`;
          },
      }
}