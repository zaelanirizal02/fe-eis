//import vue router
import { createRouter, createWebHistory } from "vue-router";
// import AppLayout from "../views/layout/AppLayout.vue";

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
    path: "/eis",
    name: "employes.index",
    component: () => import("../views/employes/index.vue"),
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
