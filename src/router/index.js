import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/product/:id", name: "product-detail", component: ProductDetail },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
