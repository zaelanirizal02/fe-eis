//import vue router
import { createRouter, createWebHistory } from "vue-router";
// import AppLayout from "../views/layout/AppLayout.vue";
function isTokenBlacklisted(accessToken) {
  // Lakukan pemeriksaan terhadap daftar token yang di-blacklist di server
  // Misalnya, Anda dapat melakukan permintaan HTTP ke server untuk memeriksa status token
  // Jika token telah di-blacklist, kembalikan true, jika tidak, kembalikan false
  // Contoh sederhana, Anda dapat mengganti ini sesuai kebutuhan aplikasi Anda
  const blacklistedTokens = ["token1", "token2"]; // Daftar token yang di-blacklist

  return blacklistedTokens.includes(accessToken);
}

const requireAuth = (to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && !isTokenBlacklisted(accessToken)) {
    next(); // Continue navigation to the requested page if the token is available
  } else {
    localStorage.removeItem("accessToken");
    next({ name: "login" }); // Redirect to the login page if the token is not available (user is not logged in)
  }
};


//define a routes
const routes = [

  // {
  //   path: "/",
  //   component: AppLayout,
  //   children: [
  //     {
  //       path: "/",
  //       name: "employes",
  //       component: () => import("../views/employes/index.vue"),
  //     },
  //   ],
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login-page.vue"),
  },
  // {
  //   path: "/",
  //   name: "index",
  //   component: () => import("../views/employes/index.vue"),
  //   beforeEnter: requireAuth,
  // },
  {
    path: "/dashboard",
    name: "dashboard.index",
    component: () => import("../views/dashboard/dashboard.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/",
    name: "dashboard.index",
    component: () => import("../views/dashboard/dashboard.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/eis2",
    name: "employes.index",
    component: () => import("../views/employes/index.vue"),
    beforeEnter: requireAuth,
  },
  // {
  //   path: "/demografi",
  //   name: "employes.demografi",
  //   component: () => import("../views/employes/demografi.vue"),
  //   beforeEnter: requireAuth,

  // },
   {
    path: "/kehadiran",
    name: "employes.kehadiran",
    component: () => import("../views/employes/absensi.vue"),
    beforeEnter: requireAuth,

  },
   {
    path: "/strSip",
    name: "strSip",
    component: () => import("../components/strSip.vue"),
  },
   {
    path: "/chartTest",
    name: "test",
    component: () => import("../components/chartTest.vue"),
  },
   {
    path: "/payroll",
    component: () => import("../views/employes/payroll.vue"),
    name: "test",
  },
  // {
  //   path: "/apex",
  //   name: "employes.apex",
  //   component: () => import("../views/employes/apex.vue"),
  // },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
