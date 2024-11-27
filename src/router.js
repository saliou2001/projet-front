import { createWebHistory, createRouter } from "vue-router";
import App from "@/App";
import MainView from "@/views/MainView.vue";
import GameView from "@/views/GameView.vue";
import ShopView from "@/views/ShopView.vue";
import StatView from "@/views/StatView.vue";
import HelpView from "@/views/HelpView.vue";

const routes = [
    {
        path: "/",
        name: "MainView",
        component: MainView, /* <--- Change it */
    },
    {
        path: "/game",
        name: "GameView",
        component: GameView
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",

    },
    {
        path :"/help",
        name:"HelpView",
        component:HelpView
    },
    {
        path :"/shop",
        name:"ShopView",
        component:ShopView
    },
    {
        path :"/stat",
        name:"StatView",
        component:StatView
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
