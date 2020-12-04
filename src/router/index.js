import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: () => import(/* webpackChunkName: "about" */ "../views/DAO.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import(/* webpackChunkName: "about" */ "../views/DAO.vue"),
  },
  {
    path: "/dao",
    name: "Governance",
    component: () => import(/* webpackChunkName: "about" */ "../views/DAO.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
