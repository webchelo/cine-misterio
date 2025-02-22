import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoverGame from "../views/CoverGame.vue"
import ActorsGame from "../views/ActorsGame.vue"
import StatisticsView from "../views/StatisticsView.vue"

Vue.use(VueRouter)

const routes = [
  { path: "/", component: HomeView },
  { path: "/cover-game", component: CoverGame },
  { path: "/actors-game", component: ActorsGame },
  { path: "/statistics", component: StatisticsView },
]

const router = new VueRouter({
  routes
})

export default router
