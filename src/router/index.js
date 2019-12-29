import Vue from "vue"
import VueRouter from "vue-router"
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: "/",
    redirect: "/selectRole"
  },
  {
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/home/homeIndex.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    name: "personalInfo",
    component: () =>
      import("../views/myself/personalInfo.vue"),
    meta: {
      title: "个人信息维护"
    }
  },
  {
    name: "payRoll",
    component: () =>
      import("../views/myself/payRoll.vue"),
    meta: {
      title: "工资单"
    }
  },
  {
    name: "myCertification",
    component: () =>
      import("../views/myself/myCertification.vue"),
    meta: {
      title: "我的认证"
    }
  },
  {
    name: "idCertification",
    component: () =>
      import("../views/myself/idCertification.vue"),
    meta: {
      title: "身份证认证"
    }
  },
  {
    name: "checkInSituation",
    component: () =>
      import("../views/myself/checkInSituation.vue"),
    meta: {
      title: "打卡"
    }
  },
  {
    name: "settlementFeedback",
    component: () =>
      import("../views/myself/settlementFeedback.vue"),
    meta: {
      title: "工资单反馈"
    }
  },
  {
    name: "jobDetail",
    component: () =>
      import("../views/job/jobDetail.vue"),
    meta: {
      title: "职位详情"
    }
  },
  {
    name: "selectRole",
    component: () =>
      import("../views/home/selectRole.vue"),
    meta: {
      title: "角色选择"
    }
  },
  {
    name: "checkIn",
    component: () =>
      import("../views/home/checkIn.vue"),
    meta: {
      title: "打卡审核"
    }
  },
  {
    name: "routeNavigation",
    component: () =>
      import("../views/job/routeNavigation.vue"),
    meta: {
      title: "路径导航"
    }
  },
  {
    name: "punchList",
    component: () =>
      import("../views/myself/punchList.vue"),
    meta: {
      title: "打卡详情"
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || "/" + (route.name || "")
})

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

// router.afterEach((to, from) => {
//   window.scrollTo(0, 0);
// })

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
