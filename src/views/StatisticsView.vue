<template>
	<div class="stats-container">
		<h1>Estadísticas</h1>
		<div v-if="Object.keys(allStats).length > 0">
			<div v-for="(stats, gameName) in allStats" :key="gameName" class="game-stats">
				<h2>{{ gameName === 'actores' ? 'Adivina la Película por sus Actores' : 'Adivina la Película por su Portada' }}</h2>
				<p>Intentos totales: {{ stats.attempts }}</p>
				<p>Películas adivinadas: <span class="guess">{{ stats.correct }}</span></p>
				<p>Errores: <span class="error-guess">{{ stats.errors }}</span></p>
				<v-divider></v-divider>
			</div>
			<h2>Colección de Películas Adivinadas</h2>
			<div class="movie-collection">
				<v-sheet
					elevation="2"
					rounded
					v-for="movie in combinedMovies"
					:key="movie.id" class="movie-card"
				>
					<img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://i.pinimg.com/736x/18/42/70/184270e5d389569745c2c5675fcf4a26.jpg'"
						:alt="movie.title" class="movie-poster" />
					<p>{{ movie.title }}</p>
				</v-sheet>
			</div>
		</div>
		<div v-else>
			<p>¡Jugá algún juego para ver las estadísticas!</p>
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
h2 {
	margin-bottom: 1rem;
}

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

.error-guess {
	color: tomato;
	font-weight: bold
}

.guess {
	color: rgb(20, 156, 39);
	font-weight: bold;
}
</style>