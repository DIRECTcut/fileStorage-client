<template>
  <div>
    <b-table
      striped
      hover
      :items="formattedUserFiles"
      :fields="fields"
    ></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import getFileDownloadLinkMixin from "../mixins/getFileDownloadLink";
import getHumanReadableFileSize from "../mixins/getHumanReadableFileSize";
import moment from "moment";

export default {
  name: "FilesPage",
  data() {
    return {
      fields: [
        { key: "filename", sortable: true },
        { key: "size", sortable: true },
        { key: "uploadDate", sortable: true },
        { key: "downloadLink" },
      ],
    };
  },
  mixins: [getFileDownloadLinkMixin, getHumanReadableFileSize],
  computed: {
    ...mapState(["userFiles"]),
    formattedUserFiles() {
      const formattedFiles = this.userFiles.map((file) => ({
        ...file,
        downloadLink: this.getFileDownloadLink(file._id),
        uploadDate: moment(file.uploadDate).format("DD/MM/YYYY hh:mm"),
        size: this.getHumanReadableFileSize(file.size),
      }));

      return formattedFiles;
    },
  },
  methods: {
    ...mapActions(["getUserFiles"]),
  },
  beforeCreate() {},
  created() {
    this.getUserFiles().catch((e) => {
      this.$notify({
        type: "error",
        title: "Could not get files, try again later",
        text: e.message ? e.message : null,
      });
    });
  },
};
</script>
