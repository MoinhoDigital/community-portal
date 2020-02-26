import Vue from "vue";
import VueRouter from "vue-router";
import CommunityMap from "../views/CommunityMap.vue";
import Apps from "../views/Places.vue";
import Places from "../views/Places.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "map",
    component: CommunityMap
  },
  {
    path: "/apps",
    name: "apps",
    component: Apps
  },
  {
    path: "/places",
    name: "places",
    component: Places
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
