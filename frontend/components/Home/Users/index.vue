<template>
  <div>
    These are our users:
    <br /><br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">FullName</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const data = await this.$axios.$post("/api/auth/users");
        this.users = data.users;
        // console.log(data.users)
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
