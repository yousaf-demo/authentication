<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="signup-wrapper">
          <div class="signup-inner">
            <h1 class="text-color">Login</h1>
            <form @submit.prevent="userlogin">
           
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" v-model="form.email" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="form.password" />
              </div>
              <button type="submit" class="btn btn-primary button">Submit</button>
              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
            </form>
              <p>Not Registered? <router-link to="/signup">Click here</router-link></p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {  // 👈 Yahan return hata kar data() function likhna hoga
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
 methods: {
  async userlogin() {
    try {
        // 👇 CSRF cookie request
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        // 👇 Login request
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          this.form,
          {
            withCredentials: true,
          }
        );

        console.log("User Logged In:", response.data);
        localStorage.setItem("auth_token", response.data.token);
        alert("Login Successful!");

        // 👇 Redirect to Home Page
        this.$router.push("/dashboard");

      } catch (error) {
        console.error("Login Error:", error.response);
        this.errorMessage = error.response?.data?.message || "Login failed!";
      }
  },
}

};
</script>
