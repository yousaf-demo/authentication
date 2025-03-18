<template>
<section class="navbar-wrapper">
  <div class="container">
  <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <div class="wrapper-yousaf">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/dashboard">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/addpost">Add Post</router-link>
        </li>
      </ul>
      
      <button @click="logout" class="btn logout">Logout</button>
    </div>
    </div>
  </div>
</nav>
</div>
</section>
</template>
<script>

import axios from "axios";
export default{
    name:'MainHeader',
   
    methods: {
    async logout() {
      try {
        const token = localStorage.getItem("auth_token"); // 👈 Token get karein
console.log(localStorage);

        if (!token) {
          alert("User not logged in!");
          this.$router.push("/login");
          return;
        }

        // 👇 CSRF Token Request (Optional for Sanctum token-based logout)
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

        // 👇 Logout Request with Bearer Token
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {}, // Empty body
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 Token send karein
              Accept: "application/json",
            },
          }
        );

        // 👇 Token remove karein aur redirect karein
        localStorage.removeItem("auth_token");
        this.$router.push("/login");
        alert("Logged out successfully!");

      } catch (error) {
        console.error("Logout Error:", error.response);
        alert(error.response?.data?.message || "Logout failed!");
      }
    }
  }
}
</script>