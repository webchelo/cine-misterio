import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoverGame from "../views/CoverGame.vue"
import ActorsGame from "../views/ActorsGame.vue"
import StatisticsView from "../views/StatisticsView.vue"
import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
	{ path: "/", component: HomeView },
	{ path: "/cover-game", component: CoverGame },
	{ path: "/actors-game", component: ActorsGame },
	{ path: "/statistics", component: StatisticsView },
	{ path: "/about", component: AboutView },
]

const router = new VueRouter({
	routes
})

export default router
