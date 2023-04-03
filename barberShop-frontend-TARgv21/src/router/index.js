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
            path: "/barberClient/:id_customer",
            name: "barberClient",
            component: () => import("../views/barberClientView.vue"),
            props: route => {return {id_customer: Number(route.params.id_customer)}}
        },
    ],
  })

  export default router