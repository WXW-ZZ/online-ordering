import { createRouter, createWebHashHistory } from "vue-router";
import { showToast } from "vant";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/home/HomeIndex.vue"),
    },
    {
      path: "/home",
      component: () => import("../views/home/HomeIndex.vue"),
    },
    {
      path: "/order",
      component: () => import("../views/order/OrderIndex.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/mine",
      component: () => import("../views/mine/MineIndex.vue"),
    },
    {
      path: "/cart",
      component: () => import("../views/cart/CartIndex.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/store",
      component: () => import("../views/store/index.vue"),
    },
    {
      path: "/createorder",
      component: () => import("../views/createorder/index.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/address",
      component: () => import("../views/address/index.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/addressedit",
      component: () => import("../views/addressEdit/index.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/userinfoedit",
      component: () => import("../views/userinfoedit/index.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/login",
      component: () => import("../views/login/index.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/register/index.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.isLogin === "login") {
      next();
    } else {
      next("/login");
      showToast("请先去登录");
    }
  } else {
    next();
  }
});
export default router;
