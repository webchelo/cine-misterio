<template>
	<div class="stats-container">
		<h1>Estadísticas</h1>

		<div v-for="(stats, gameName) in allStats" :key="gameName" class="game-stats">
			<h2>{{ gameName === 'actores' ? 'Adivina la Película por sus Actores' : 'Adivina la Película por su Portada'
				}}</h2>
			<p>Intentos totales: {{ stats.attempts }}</p>
			<p>Películas adivinadas: <span class="guess">{{ stats.correct }}</span></p>
			<p>Errores: <span class="error">{{ stats.errors }}</span></p>
		</div>

		<h2>Colección de Películas Adivinadas</h2>
		<div class="movie-collection">
			<div v-for="movie in combinedMovies" :key="movie.id" class="movie-card">
				<img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://i.pinimg.com/736x/18/42/70/184270e5d389569745c2c5675fcf4a26.jpg'"
					:alt="movie.title" class="movie-poster" />
				<p>{{ movie.title }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { getAllStats, getCombinedGuessedMovies } from '../services/statsService';

export default {
	data() {
		return {
			allStats: {},
			combinedMovies: [],
		};
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

.game-stats {
	margin-bottom: 40px;
}

.movie-collection {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
}

.movie-card {
	width: 120px;
	text-align: center;
}

.movie-poster {
	width: 100px;
	height: 150px;
	border-radius: 8px;
	object-fit: cover;
}

.error {
	color: tomato;
	font-weight: bold
}

.guess {
	color: rgb(20, 156, 39);
	font-weight: bold;
}
</style>