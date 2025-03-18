import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../components/SignUp.vue";
import UserLogin from "../components/UserLogin.vue";
import UserDashboard from "../components/UserDashboard.vue";
import AddPost from "../components/AddPost.vue";
const routes = [
  { path: "/", component: UserLogin }, // Default Route
  { path: "/signup", component: SignUp },
  { path: "/login", component: UserLogin },
  { 
    path: "/dashboard", 
    component: UserDashboard, 
    meta: { requiresAuth: true } // 👈 Protected Route for Dashboard
  },
  { 
    path: "/addpost", 
    component: AddPost, 
    meta: { requiresAuth: true } // 👈 Protected Route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("auth_token"); // Token check karein

  // console.log("Navigating to:", to.path); // Debugging
  // console.log("User Authenticated:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Access Denied! Redirecting to login...");
    alert("Please log in first!"); // Optional
    next("/login"); // Redirect
  } else {
    next(); // Allow navigation
  }
});

export default router;
