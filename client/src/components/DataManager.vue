<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Questionnaires Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
        <modal
        :user_data="this.model"
        id ="mdl" v-if="edit_mode"
        v-show="edit_mode"
        @close="closeModal"
        />
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Updated At</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in datasets" :key="data.mail">
              <td>{{ data.id }}</td>
              <td>{{ data.mail }}</td>
              <td>{{ data.first_name }}</td>
              <td>{{ data.last_name }}</td>
              <td>{{ data.updatedAt }}</td>
              <td>{{ data.gender }}</td>
              <td>{{ data.user_hobbies.join(',') }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateDataToEdit(data)">Edit</a> -
                <a href="#" @click.prevent="deleteData(data.mail)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
    </b-row>
  </div>
</template>

<script>
import modal from './EditModal.vue'
export default {
  components: {
           modal,
  },
  data () {
    return {
      loading: false,
      datasets: [],
      model: {},
      edit_mode : false
    }
  },
  async created () {
    this.refreshData()
  },
  methods: {
    async refreshData () {
      this.loading = true
      this.datasets = await this.$http.get('list').then(req => {
          return req.data
      });
      this.loading = false
    },
    async populateDataToEdit (data) {
      this.model = Object.assign({}, data)
      this.edit_mode = true;
    },
    async deleteData (mail) {
      if (confirm('Are you sure you want to delete this post?')) {
        if (this.model.mail === mail) {
          this.model = {}
        }
        await this.$http.delete('delete/' + mail).then(req => {
          return req.data
      });
        alert("Questionnaire of email: " + mail + " has been deleted succesfully")
        await this.refreshData()
      }
    },
    closeModal() {
        this.refreshData()
        this.edit_mode = false;
    }
  }
}
</script>