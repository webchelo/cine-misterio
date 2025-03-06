<template>
	<div>
		<div :class="{ 'fade-in': isMounted }">
			<h1>Adivina la Película por sus Actores</h1>
			<div v-if="currentMovie">
				<div class="actores-container" :class="{ 'slide-in': isNewRound }">
					<ActorsCard :actors="displayedActors" />
				</div>
				<div class="buttons-container">
					<div>
						<v-btn elevation="2" v-for="(option, index) in options" :key="index" @click="checkAnswer(option)"
							:disabled="isButtonDisabled(option)">
							{{ option }}
						</v-btn>
					</div>
				</div>
				<div class="feedback-container">
					<p :class="feedbackClass" v-if="feedback">{{ feedback }}</p>
					<p>Intentos restantes: {{ attemptsLeft }}</p>
				</div>
			</div>
			<div v-else-if="movies.length > 0 && shownMovies.length === movies.length">
				<p class="end-game">🎬 Fin del juego 🎬</p>
			</div>
			<div v-else>
				<p style="text-align: center;">Cargando...</p>
			</div>
		</div>
	</div>
</template>

<script>
import { getMovies, getMovieCast } from '../services/movieService.js';
import { shuffleArray } from '../services/shuffleArray.js'
import { getStats, saveStats } from '../services/statsService.js';
import ActorsCard from '../components/ActorsCard.vue';

export default {
	components: {
		ActorsCard,
	},

	data() {
		return {
			movies: [],
			currentMovie: null,
			allActors: [],
			displayedActors: [],
			options: [],
			feedback: "",
			actorIndex: 0,
			attemptsLeft: 3,
			clickedOptions: [],
			shownMovies: [],
			isRoundEnded: false,
			// Para animaciones
			isMounted: false,
			isNewRound: false
		};
	},

	computed: {
		feedbackClass() {
			return this.feedback.includes("✅") ? "correct" : "incorrect";
		},
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

	methods: {
		/**
		* Inicia una nueva ronda del juego "Adivina la Película por actores"
		* @async
		* @returns {Promise<void>}
		*/
		async newRound() {
			this.resetGameState();
			const movieSelected = this.selectRandomMovie();
			if (!movieSelected) {
				this.currentMovie = null;
				return;
			}
			this.currentMovie = movieSelected;
			await this.loadMovieCast();
			this.generateOptions();
			this.triggerAnimation();
			this.isRoundEnded = false;
		},

		// Restablece el estado inicial de la ronda
		resetGameState() {
			this.attemptsLeft = 3;
			this.clickedOptions = [];
			this.feedback = "";
			this.shownMovies = [];
		},

		// Selecciona aleatoriamente una película de la lista que no haya sido mostrada
		selectRandomMovie() {
			const availableMovies = this.movies.filter(movie => !this.shownMovies.includes(movie.id));
			if (availableMovies.length === 0) {
				return null;
			}
			const randomIndex = Math.floor(Math.random() * availableMovies.length);
			const selectedMovie = availableMovies[randomIndex];
			this.shownMovies.push(selectedMovie.id); // Guarda la película mostrada
			return selectedMovie;
		},

		// Obtiene el elenco de la película seleccionada y muestra el primer actor
		async loadMovieCast() {
			this.allActors = await getMovieCast(this.currentMovie.id);
			this.displayedActors = [this.allActors[0]];
			this.actorIndex = 1;
		},

		// Genera opciones de respuesta con películas aleatorias mezcladas con la correcta
		generateOptions() {
			const otherMovies = this.movies
				.filter((movie) => movie.id !== this.currentMovie.id)
				.sort(() => 0.5 - Math.random())
				.slice(0, 5)
				.map((movie) => movie.title);

			this.options = shuffleArray([...otherMovies, this.currentMovie.title]);
		},

		// Activa una animación de transición para indicar el inicio de una nueva ronda
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
		* 2. Si no quedan intentos restantes.
		* 3. Si la ronda ha terminado (isRoundEnded es true).
		*
		* @param {string} option - La opción (título de la película) asociada al botón.
		* @returns {boolean} - `true` si el botón debe estar deshabilitado, `false` en caso contrario.
		*/
		isButtonDisabled(option) {
			return (
				this.clickedOptions.includes(option) ||
				this.attemptsLeft === 0 ||
				this.isRoundEnded
			);
		},

		/**
		* Verifica si la opción seleccionada es la película correcta y gestiona lo siguiente:
		* 
		* - Si la respuesta es correcta, muestra un mensaje y comienza una nueva ronda tras 2 segundos.
		* - Si la respuesta es incorrecta, reduce los intentos disponibles.
		* - Si los intentos llegan a 0, muestra la respuesta correcta y reinicia la ronda.
		* - Si quedan intentos, revela un nuevo actor como pista.
		* 
		* @param {string} option - La opción seleccionada por el jugador.
		*/
		checkAnswer(option) {
			this.clickedOptions.push(option);

			if (option === this.currentMovie.title) {
				this.feedback = "✅ ¡Correcto!";
				this.isRoundEnded = true;

				// Guardado de estadísticas
				const stats = getStats("actores");
				stats.attempts += this.attemptsLeft;
				stats.correct += 1;
				stats.guessedMovies.push(this.currentMovie);
				saveStats("actores", stats);

				setTimeout(() => {
					this.feedback = "";
					this.newRound();
				}, 2000);
			} else {
				this.attemptsLeft--;

				if (this.attemptsLeft === 0) {
					this.feedback = `❌ Incorrecto. La respuesta era: ${this.currentMovie.title}`;
					this.isRoundEnded = true;

					// Guardado de estadísticas
					const stats = getStats("actores");
					stats.attempts += 3;
					stats.errors += 1;
					saveStats("actores", stats);

					setTimeout(() => {
						this.feedback = "";
						this.newRound();
					}, 2000);
				} else if (this.actorIndex < this.allActors.length) {
					this.displayedActors.push(this.allActors[this.actorIndex]);
					this.actorIndex++;
				}
			}
		},
	},
};
</script>

<style scoped>
body {
	font-family: 'Arial', sans-serif;
	background-color: #f4f4f9;
	color: #333;
	margin: 0;
	padding: 0;
	min-height: 100vh;
}

.actores-container>div {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin: 2rem;
	gap: 1.2rem;
}

.actor-container {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 2rem;
}

.actor-image {
	width: 100px;
	height: 150px;
	border-radius: 8px;
	margin-right: 15px;
}

.actor-name {
	font-size: 1.2rem;
	color: #34495e;
}

.buttons-container>div {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, auto);
	gap: 10px;
	justify-content: center;
	margin: 10px auto;
	max-width: 60rem;
}

button {
	background-color: #3498db;
	color: white;
	border: none;
	padding: 12px 24px;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease, transform 0.2s ease;
	width: 100%;
	min-width: fit-content !important;
}

button:disabled {
	background-color: #bdc3c7;
	cursor: not-allowed;
}

button:hover:not(:disabled) {
	background-color: #2980b9;
	transform: translateY(-2px);
}

button:active:not(:disabled) {
	transform: translateY(0);
}

.feedback-container {
	display: flex;
	justify-content: center;
	align-items: baseline;
	gap: 2rem;
	margin-bottom: 3rem;
}

p {
	font-size: 1.2rem;
	margin-top: 20px;
	font-weight: bold;
	color: #2c3e50;
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

.slide-in {
	animation: slideIn 0.5s ease-in-out;
}

@keyframes slideIn {
	from {
		transform: translateX(100%);
	}

	to {
		transform: translateX(0);
	}
}

@media (max-width: 1000px) {
	.buttons-container>div {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(6, auto);
		gap: 10px;
		justify-content: center;
		margin: 10px;
	}
}

@media (max-width: 600px) {
	h1 {
		font-size: 2rem;
	}

	.actor-image {
		width: 80px;
		height: 120px;
	}

	.actor-name {
		font-size: 1rem;
	}


}
</style>