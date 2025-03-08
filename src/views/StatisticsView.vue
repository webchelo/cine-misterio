<template>
	<div class="stats-container">
		<h1>Estadísticas</h1>
		<div v-if="Object.keys(allStats).length > 0">
			<GameStats
				v-for="(stats, gameName) in allStats"
				:key="gameName"
				:gameName="gameName"
				:stats="stats"
			/>
			<GuessedMovies :combinedMovies="combinedMovies" />
		</div>
		<div v-else>
			<p>¡Jugá algún juego para ver las estadísticas!</p>
		</div>
	</div>
</template>

<script>
import GameStats from '../components/GameStats.vue';
import GuessedMovies from '../components/GuessedMovies.vue';
import { getAllStats, getCombinedGuessedMovies } from '../services/statsService';

export default {
	data() {
		return {
		allStats: {},
		combinedMovies: [],
		};
	},
	components: {
		GameStats,
		GuessedMovies,
	},
	created() {
		this.allStats = getAllStats();
		this.combinedMovies = getCombinedGuessedMovies();
	},
};
</script>

<style scoped>
.stats-container {
	padding: 20px;
	text-align: center;
}
</style>