<template>
  <h1>Upload profile </h1>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <va-alert v-if="module10count !==0 && module10count%10 === 0" color="success" center class="mb-4">
      Every day feels like I’ve died and gone to hell
    </va-alert>
    <va-alert v-if="message" :color="`${error ? 'danger' : 'success'}`" center class="mb-4">
      {{ message }}
    </va-alert>
    <va-file-upload class="uploadField"
                    @change="selectFile"
                    v-model="file"
                    dropzone
                    type="single"
                    file-types=".pdf,.jpg,.png" />
    <br />
    <div class="field">
      <va-form>
        <va-input class="mb-4 mr-4" label="Your Name:" v-model="uploader"
                  :rules="[value => (value && value.length > 0) || 'Field is required']" />
        <va-input label="Candidate name:" v-model="candidateName"
                  :rules="[value => (value && value.length > 0) || 'Field is required']" />
        <va-input label="Notes:" v-model="notes" class="mb-4" />
        <va-input label="Job title:" v-model="jobTitle"
                  :rules="[value => (value && value.length > 0) || 'Field is required']" />
      </va-form>
    </div>
    <br />
    <br />
    <va-button :disabled="file.length === 0" type="submit">Submit</va-button>
  </form>
</template>

<script>

export default {
  name: "Upload",
  data() {
    return {
      file: [],
      uploader: "",
      candidateName: "",
      notes: "",
      jobTitle: "",
      message: "",
      error: false,
      module10count: 0
    };
  },
  created() {
    this.getModule10Count();
  },
  methods: {
    selectFile() {
      this.error = false;
      this.message = "";
      this.module10count = 0;
    },
    getModule10Count() {
      this.$socket.on("module10", module10count => {
        console.log("module10", module10count);
        this.module10count = module10count;
      });
    },
    /**
     * Submit profile submission form.
     */
    async submitForm() {
      const formData = new FormData();
      formData.append("file", this.file[0]);
      formData.append("createdBy", this.uploader);
      formData.append("candidateName", this.candidateName);
      formData.append("jobTitle", this.jobTitle);
      formData.append("notes", this.notes);
      formData.append("cvName", this.file[0].name);
      try {
        await this.$http.post("/v1/profile/upload", formData);
        this.message = "File has been uploaded";
        this.file = [];
        this.uploader = "";
        this.candidateName = "";
        this.jobTitle = "";
        this.notes = "";
        this.error = false;
      }
      catch (err) {
        this.message = "Something went wrong";
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style>

.uploadField {
  margin-left: 20%;
  margin-right: 20%;
}

.field {
  margin-left: 30%;
  margin-right: 30%;
}
</style>

