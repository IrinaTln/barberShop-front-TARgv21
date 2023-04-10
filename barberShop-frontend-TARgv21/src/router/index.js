import { createRouter, createWebHistory } from "vue-router"

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/barberListView.vue")
        },
        {
          path: "/customerList",
          name: "customerList",
          component: () => import("../views/customerListView.vue")
        },
        {
          path: "/serviceList",
          name: "serviceList",
          component: () => import("../views/serviceListView.vue")
        },
        {
          path: "/bookingList",
          name: "bookingList",
          component: () => import("../views/bookingListView.vue")
        },
        {
            path: "/barberClient/:id_customer",
            name: "barberClient",
            component: () => import("../views/barberClientView.vue"),
            props: route => {return {id_customer: Number(route.params.id_customer)}}
        },
    ],
  })

  export default router