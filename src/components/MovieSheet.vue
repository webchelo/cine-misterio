<template>
	<div class="movie-collection">
		<v-sheet
		elevation="2"
		rounded
		v-for="movie in combinedMovies"
		:key="movie.id"
		class="movie-card"
		:class="{ 'favorite': isFavorite(movie.id) }"
		>
			<a :href="`https://www.themoviedb.org/movie/${movie.id}`" target="_blank" rel="noopener noreferrer">
				<img
				:src="movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://i.pinimg.com/736x/18/42/70/184270e5d389569745c2c5675fcf4a26.jpg'"
				:alt="movie.title"
				class="movie-poster"
				/>
				<p>{{ movie.title }}</p>
			</a>
			<button @click.stop="toggleFavorite(movie)" class="favorite-button">
				{{ isFavorite(movie.id) ? '⭐' : '★' }}
			</button>
		</v-sheet>
	</div>
</template>

<script>
export default {
	props: {
		combinedMovies: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			favorites: [],
		};
	},
	created() {
		const savedFavorites = localStorage.getItem('favorites');
		if (savedFavorites) {
			this.favorites = JSON.parse(savedFavorites);
		}
	},
	methods: {
		isFavorite(movieId) {
			return this.favorites.includes(movieId);
		},
		toggleFavorite(movie) {
			const movieId = movie.id;
			if (this.isFavorite(movieId)) {
				this.favorites = this.favorites.filter((id) => id !== movieId);
			} else {
				this.favorites.push(movieId);
			}
			localStorage.setItem('favorites', JSON.stringify(this.favorites));
		},
	},
};
</script>

<style>
a {
	text-decoration: none;
}

a > p {
	color: black;
	margin: 0 .5rem;
}

.movie-collection {
	display: flex;
	gap: 2rem;
	flex-wrap: wrap;
	justify-content: center;
}

.movie-card {
	transition: background-color 0.3s ease;
	position: relative; /* Para posicionar el botón correctamente */
	padding-bottom: 40px; /* Espacio para el botón */
	width: fit-content;
}

.movie-card.favorite {
	background-color: yellow; /* Cambia el color de fondo a amarillo */
}

.favorite-button {
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(255, 255, 255, 0.8);
	border: 1px solid #ccc;
	padding: 5px 10px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.favorite-button:hover {
	background-color: rgba(255, 255, 255, 1);
}
</style>