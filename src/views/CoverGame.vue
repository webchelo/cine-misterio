<template>
	<div :class="{ 'fade-in': isMounted }">
		<h1>Adivina la Película por su Portada</h1>
		<div v-if="currentMovie">
			<div class="movie-container">
				<img :src="currentMovie.poster_path ?
					`https://image.tmdb.org/t/p/w200${currentMovie.poster_path}` :
					'https://i.pinimg.com/736x/18/42/70/184270e5d389569745c2c5675fcf4a26.jpg'" alt="Película"
					:class="['movie-image', { 'normal-size': !imageZoom, 'pop-up': isNewRound }]" />
			</div>

			<div class="options-container">
				<button v-for="(option, index) in options" :key="index" @click="checkAnswer(option)"
					:disabled="isButtonDisabled(option)">
					{{ option }}
				</button>
			</div>

			<p :class="feedbackClass">{{ feedback }}</p>
		</div>
		<div v-else-if="movies.length > 0 && shownMovies.length === movies.length">
			<p class="end-game">🎬 Fin del juego 🎬</p>
		</div>
		<div v-else>
			<p>Cargando películas...</p>
		</div>
	</div>
</template>

<script>
import { getStats, saveStats } from '../services/statsService.js';
import { getMovies } from '../services/movieService.js';
import { shuffleArray } from '../services/shuffleArray.js';

export default {
	data() {
		return {
			movies: [],
			currentMovie: null,
			options: [],
			feedback: "",
			clickedOptions: [],
			imageZoom: true,
			shownMovies: [],
			// animaciones
			isMounted: false,
			isNewRound: false,
			isRoundEnded: false,
		};
	},

	async created() {
		this.movies = await getMovies();
		this.newRound();
	},

	mounted() {
		setTimeout(() => {
			this.isMounted = true;
		}, 10); // Aseguro la carga del DOM
	},

	computed: {
		// Clase dinámica para el feedback
		feedbackClass() {
			return this.feedback.includes("✅") ? "correct" : "incorrect";
		},
	},

	methods: {
		/**
		 * Inicia una nueva ronda del juego
		 * Coordina la selección de una película, generación de opciones y reinicio del estado
		 */
		newRound() {
			const selectedMovie = this.selectRandomMovie();
			if (!selectedMovie) {
				this.currentMovie = null;
				return;
			}

			this.currentMovie = selectedMovie;
			this.generateOptions();
			this.resetRoundState();
			this.triggerAnimation();
			this.isRoundEnded = false;
		},

		/**
		 * Selecciona una película aleatoria que no haya sido mostrada antes
		 * @returns {Object|null} - La película seleccionada o `null` si no quedan películas
		 */
		selectRandomMovie() {
			const availableMovies = this.movies.filter(movie => !this.shownMovies.includes(movie.id));
			if (availableMovies.length === 0) {
				return null;
			}

			const randomIndex = Math.floor(Math.random() * availableMovies.length);
			const selectedMovie = availableMovies[randomIndex];
			this.shownMovies.push(selectedMovie.id);
			return selectedMovie;
		},

		// - Genera las opciones de respuesta para la ronda actual.
		// - Mezcla las opciones para que la respuesta correcta esté en una posición aleatoria.
		generateOptions() {
			const otherMovies = this.movies
				.filter(movie => movie.id !== this.currentMovie.id)
				.sort(() => 0.5 - Math.random())
				.slice(0, 3)
				.map(movie => movie.title);

			this.options = shuffleArray([...otherMovies, this.currentMovie.title]);
		},

		// - Reinicia el estado de la ronda.
		// - Limpia las opciones clickeadas, el feedback y restablece el zoom de la imagen. 
		resetRoundState() {
			this.clickedOptions = [];
			this.feedback = "";
			this.imageZoom = true;
		},

		//Activa la animación de la nueva ronda. 
		triggerAnimation() {
			this.isNewRound = true;
			setTimeout(() => {
				this.isNewRound = false;
			}, 500);
		},

		/**
		* Verifica si un botón de opción debe estar deshabilitado.
		* Un botón se deshabilita en los siguientes casos:
		* 1. Si la opción ya fue seleccionada por el usuario.
		* 2. Si la ronda ha terminado (isRoundEnded es true).
		*
		* @param {string} option - La opción (título de la película) asociada al botón.
		* @returns {boolean} - `true` si el botón debe estar deshabilitado, `false` en caso contrario.
		*/
		isButtonDisabled(option) {
			return (
				this.clickedOptions.includes(option) ||
				this.isRoundEnded
			);
		},

		/**
		* Verifica la respuesta del usuario.
		* Si es correcta, muestra un mensaje de éxito y pasa a la siguiente ronda.
		* Si es incorrecta, muestra un mensaje de error y permite intentar de nuevo.
		* @param {string} option - La opción seleccionada por el usuario.
		*/
		checkAnswer(option) {
			this.clickedOptions.push(option);

			if (option === this.currentMovie.title) {
				this.feedback = "✅ ¡Correcto!";
				this.imageZoom = false;
				this.isRoundEnded = true;

				// Guardado de estadísticas
				const stats = getStats("portadas");
				stats.attempts += 1;
				stats.correct += 1;
				stats.guessedMovies.push(this.currentMovie);
				saveStats("portadas", stats);

				setTimeout(() => {
					this.feedback = "";
					this.imageZoom = true;
					this.newRound();
				}, 2000);
			} else {
				this.feedback = "❌ Incorrecto, intenta de nuevo.";
				this.imageZoom = false;
				this.isRoundEnded = true;

				// Guardado de estadísticas
				const stats = getStats("portadas");
				stats.attempts += 1;
				stats.errors += 1;
				saveStats("portadas", stats);

				setTimeout(() => {
					this.feedback = "";
					this.imageZoom = true;
					this.newRound();
				}, 2000);
			}
		}
	}
}
</script>

<style scoped>
.movie-container {
	margin: 1rem;
	height: 35rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.movie-image {
	width: 100%;
	height: 15rem;
	object-fit: cover;
	border-radius: 8px;
	margin-bottom: 20px;
}

.normal-size {
	width: 20rem;
	height: 30rem;
}

.options-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(1, auto);
	gap: 10px;
	justify-content: center;
	margin: 10px auto;
	max-width: 60rem;

}

button {
	background-color: #3498db;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:disabled {
	background-color: #bdc3c7;
	cursor: not-allowed;
}

button:hover:not(:disabled) {
	background-color: #2980b9;
}

p {
	font-size: 1.2rem;
	text-align: center;
	margin-top: 20px;
}

.correct {
	color: #27ae60;
}

.incorrect {
	color: #e74c3c;
}

.end-game {
	font-size: 2rem;
	color: #34495e;
	text-align: center;
	margin-top: 2rem;
}

.fade-in {
	opacity: 0;
	animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

.pop-up {
	animation: popUp 0.5s ease-in-out;
}

@keyframes popUp {
	0% {
		transform: scale(0.5);
		opacity: 0;
	}

	50% {
		transform: scale(1.2);
		opacity: 0;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}

@media (max-width: 600px) {
	.movie-image {
		height: 10rem;
	}

	.options-container {
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(4, auto);
	}
}
</style>