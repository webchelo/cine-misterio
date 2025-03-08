<template>
	<div>
		<div :class="{ 'fade-in': isMounted }">
			<h1>Adivina la Película por sus Actores</h1>
			<div v-if="currentMovie">
				<div class="actores-container" :class="{ 'slide-in': isNewRound }">
				<ActorsCard :actors="displayedActors" />
				</div>
				<MovieOptions
					:options="options"
					:clickedOptions="clickedOptions"
					:attemptsLeft="attemptsLeft"
					:isRoundEnded="isRoundEnded"
					@option-selected="checkAnswer"
				/>
				<FeedbackMessage
					:feedback="feedback"
					:feedbackClass="feedbackClass"
					:attemptsLeft="attemptsLeft"
					:showFeedback="showFeedback"
				/>
			</div>
			<EndGameMessage v-else-if="movies.length > 0 && shownMovies.length === movies.length" />
			<LoadingMessage v-else />
		</div>
	</div>
</template>

<script>
import { getMovies, getMovieCast } from '../services/movieService.js';
import { shuffleArray } from '../services/shuffleArray.js';
import { getStats, saveStats } from '../services/statsService.js';
import ActorsCard from '../components/ActorsCard.vue';
import MovieOptions from '../components/MovieOptions.vue';
import FeedbackMessage from '../components/FeedbackMessage.vue';
import EndGameMessage from '../components/EndGameMessage.vue';
import LoadingMessage from '../components/LoadingMessage.vue';

export default {
	components: {
		ActorsCard,
		MovieOptions,
		FeedbackMessage,
		EndGameMessage,
		LoadingMessage,
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
			showFeedback: false,
			isMounted: false,
			isNewRound: false,
		};
	},
	computed: {
		feedbackClass() {
			return this.feedback.includes("✅") ? "success" : "error";
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

		/**
		 * Restablece el estado inicial de la ronda
		 */
		resetGameState() {
			this.attemptsLeft = 3;
			this.clickedOptions = [];
			this.feedback = "";
			this.shownMovies = [];
		},

		/**
		 * Selecciona aleatoriamente una película de la lista que no haya sido mostrada
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

		/**
		 * Obtiene el elenco de la película seleccionada y muestra el primer actor
		 */
		async loadMovieCast() {
			this.allActors = await getMovieCast(this.currentMovie.id);
			this.displayedActors = [this.allActors[0]];
			this.actorIndex = 1;
		},

		/**
		 * Genera opciones de respuesta con películas aleatorias mezcladas con la correcta
		 */
		generateOptions() {
			const otherMovies = this.movies
				.filter((movie) => movie.id !== this.currentMovie.id)
				.sort(() => 0.5 - Math.random())
				.slice(0, 5)
				.map((movie) => movie.title);

			this.options = shuffleArray([...otherMovies, this.currentMovie.title]);
		},

		/**
		 * Activa una animación de transición para indicar el inicio de una nueva ronda
		 */
		triggerAnimation() {
			this.isNewRound = true;
			setTimeout(() => {
				this.isNewRound = false;
			}, 500);
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
				this.showFeedback = true;
				this.feedback = "✅ ¡Correcto!";
				this.isRoundEnded = true;

				const stats = getStats("actores");
				stats.attempts += this.attemptsLeft;
				stats.correct += 1;
				stats.guessedMovies.push(this.currentMovie);
				saveStats("actores", stats);

				setTimeout(() => {
				this.feedback = "";
				this.showFeedback = false;
				this.newRound();
				}, 2000);
			} else {
				this.attemptsLeft--;

				if (this.attemptsLeft === 0) {
					this.feedback = `❌ Incorrecto. La respuesta correcta es: "${this.currentMovie.title}"`;
					this.showFeedback = true;
					this.isRoundEnded = true;

					const stats = getStats("actores");
					stats.attempts += 3;
					stats.errors += 1;
					saveStats("actores", stats);

					setTimeout(() => {
						this.feedback = "";
						this.showFeedback = false;
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
.actores-container > div {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin: 2rem;
	gap: 1.2rem;
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
</style>