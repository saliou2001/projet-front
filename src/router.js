import { createWebHistory, createRouter } from "vue-router";
import App from "@/App";
import MainView from "@/views/MainView.vue";
import GameView from "@/views/GameView.vue";
import ResultatView from "@/views/ResultatView.vue";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
