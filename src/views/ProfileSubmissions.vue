<template>
  <h1>Profile Submissions</h1>
  <va-badge size="small" color="#154ec1" :text="`Total: ${counter}`" />
  <div class="va-table-responsive tableMargin">
    <table class="va-table va-table--clickable">
      <thead>
      <tr>
        <th>Name</th>
        <th>Job Title</th>
        <th>Notes</th>
        <th>Created by</th>
        <th>CV file</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="profileSubmission in profileSubmissions" :key="profileSubmission.id">
        <td>{{ profileSubmission.candidateName }}</td>
        <td>{{ profileSubmission.jobTitle }}</td>
        <td>{{ profileSubmission.notes }}</td>
        <td>{{ profileSubmission.createdBy }}</td>
        <td @click="getProfileSubmission(profileSubmission.cvName)">
          <va-badge
            :text="profileSubmission.cvName"
            color="#154ec1"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProfileSubmissions",
  data() {
    return {
      profileSubmissions: [],
      counter: "0"
    };
  },
  watch: {
    counter() {
      this.getProfileSubmissions();
    }
  },
  methods: {
    async getProfileSubmissions() {
      try {
        const response = await this.$http.get(
          "/v1/profile/profileSubmissions"
        );
        this.profileSubmissions = response.data.data;
        this.counter = response.data.data.length;
      }
      catch (error) {
        console.log(error);
      }
    },
    /**
     * Callback method for downloading the clicked CV.
     */
    async getProfileSubmission(cvName) {
      try {
        const url = `/v1/profile/profileSubmission/?cvName=${cvName}`;
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.target = "_blank";
        a.download = cvName;
        a.click();
        window.open(url, "_blank").focus();
        a.remove();
      }
      catch (error) {
        console.log(error);
      }
    },

    getRealtimeCount() {
      console.log(this.$socket)
      this.$socket.on("count", counter => {
        console.log("count", counter);
        this.counter = counter;
      });
    }
  },
  created() {
    this.getProfileSubmissions();
    this.getRealtimeCount();
  }
};
</script>
<style>
.tableMargin {
  margin-left: 20%
}
</style>
