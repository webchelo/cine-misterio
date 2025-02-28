<template>
	<div>
		<h1>Películas Populares</h1>
		<div v-if="movies.length > 0">
			<ul>
				<li v-for="movie in movies" :key="movie.id">
					{{ movie.title }}
				</li>
			</ul>
		</div>
		<div v-else>
			<p>Cargando películas...</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			movies: [], // Almacena las películas populares
		};
	},
	async created() {
		await this.fetchPopularMovies(); // Llama a la función para obtener películas al crear el componente
	},
	methods: {
		async fetchPopularMovies() {
			try {
				const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Usa tu API Key de TMDb
				const url = new URL("https://api.themoviedb.org/3/movie/popular");
				url.searchParams.append("api_key", API_KEY);
				url.searchParams.append("language", "es-ES"); // Idioma en español

				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Error: ${response.status} - ${response.statusText}`);
				}
				const data = await response.json();
				this.movies = data.results; // Guarda las películas en el array
			} catch (error) {
				console.error("Error fetching popular movies:", error);
			}
		},
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	padding: 0;
}

li {
	background-color: #f9f9f9;
	padding: 10px;
	margin: 5px 0;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	text-align: center;
}
</style>