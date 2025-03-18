<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="signup-wrapper">
          <div class="signup-inner">
            <h1 class="text-color">SignUp</h1>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" v-model="form.name" class="form-control" />
              </div>
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
              <p>Already Registered? <router-link to="/login">Click here</router-link></p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {  // 👈 Yahan return hata kar data() function likhna hoga
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
 methods: {
  async register() {
    try {
      // 👇 CSRF cookie request
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 👇 Signup request
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        this.form,
        {
          withCredentials: true,
        }
      );

      console.log("User Registered:", response.data);
      localStorage.setItem("auth_token", response.data.token);
      alert("Signup Successful!");
      this.$router.push("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error.response);
      this.errorMessage = error.response?.data?.message || "Signup failed!";
    }
  },
}

};
</script>
