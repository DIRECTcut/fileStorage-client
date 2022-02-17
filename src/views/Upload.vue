<template>
  <div class="my-5">
    <div>
      <input
        id="buttonFilesInput"
        @input="onFilesSelected"
        type="file"
        ref="file"
        style="display: none"
      />
      <b-button variant="primary" @click="$refs.file.click()">
        Choose a file
      </b-button>
    </div>

    <p class="my-3">OR</p>

    <b-card
      id="dragDropFilesInput"
      @drop.prevent="onFilesSelected"
      @dragover.prevent
      title="Drag and drop here"
      class="mb-5 w-25 text-center mx-auto"
    >
    </b-card>

    <b-card
      v-if="hasFilesToUpload"
      :title="fileToUpload.name"
      class="mb-2 text-center mx-auto"
    >
      <b-card-text>
        Size: {{ getHumanReadableFileSize(fileToUpload.size) }}
      </b-card-text>

      <b-button class="mx-3" variant="success" @click="upload">
        Upload
      </b-button>
    </b-card>

    <b-card v-if="hasDownloadLink" title="Download your last upload">
      <b-card-text ref="downloadUrl">{{ this.fileDownloadLink }}</b-card-text>
      <b-button class="mx-3" @click="onCopyButtonClicked">Copy!</b-button>
    </b-card>

    <notifications />
  </div>
</template>

<script>
import { isEmpty, isNil } from "lodash";
import axios from "@/axios";
import getFileDownloadLinkMixin from "../mixins/getFileDownloadLink";
import getHumanReadableFileSize from "../mixins/getHumanReadableFileSize";

export default {
  name: "UploadPage",
  mixins: [getFileDownloadLinkMixin, getHumanReadableFileSize],
  data() {
    return {
      fileToUpload: null,
      fileDownloadLink: null,
    };
  },
  methods: {
    onFilesSelected(e) {
      const files =
        e.target.id === "buttonFilesInput"
          ? e.target.files
          : e.dataTransfer.files;

      if (isEmpty(files) || isNil(files)) return;
      this.fileToUpload = files[0];
    },
    upload() {
      const formData = new FormData();
      formData.append("file", this.fileToUpload);
      return axios
        .post("/files/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          const notificationOptions =
            res.status === 202
              ? {
                  type: "warning",
                  title: "You already have an identical file in the system!",
                }
              : {
                  type: "success",
                  title: "File uploaded successfully!",
                };
          this.$notify(notificationOptions);
          this.fileDownloadLink = this.getFileDownloadLink(res.data._id);
          this.clearFileToUpload();
        })
        .catch((e) => {
          this.$notify({
            type: "error",
            title: "File upload failed",
            text: e?.response?.data || e?.message,
          });
          this.clearFileToUpload();
        });
    },
    clearFileToUpload() {
      this.fileToUpload = null;
      this.$refs.file.value = null;
    },
    onCopyButtonClicked() {
      navigator.clipboard.writeText(this.fileDownloadLink);
    },
  },
  computed: {
    hasFilesToUpload() {
      return !isEmpty(this.fileToUpload) || !isNil(this.fileToUpload);
    },
    hasDownloadLink() {
      return !!this.fileDownloadLink;
    },
  },
};
</script>