<template>
	<div :class="{ 'fade-in': isMounted }">
		<h1>Adivina la Película por su Portada</h1>
		<div v-if="currentMovie">
			<MovieImage
				:imageUrl="currentMovie.poster_path ?
				`https://image.tmdb.org/t/p/w200${currentMovie.poster_path}` :
				'https://i.pinimg.com/736x/18/42/70/184270e5d389569745c2c5675fcf4a26.jpg'"
				:imageZoom="imageZoom"
				:isNewRound="isNewRound"
			/>
			<MovieOptions
				:options="options"
				:clickedOptions="clickedOptions"
				:isRoundEnded="isRoundEnded"
				@option-selected="checkAnswer"
			/>
			<FeedbackMessage
				:feedback="feedback"
				:feedbackClass="feedbackClass"
				:showFeedback="showFeedback"
			/>
		</div>
		<EndGameMessage v-else-if="movies.length > 0 && shownMovies.length === movies.length" />
		<LoadingMessage v-else />
	</div>
</template>

<script>
import { getStats, saveStats } from '../services/statsService.js';
import { getMovies } from '../services/movieService.js';
import { shuffleArray } from '../services/shuffleArray.js';
import MovieImage from '../components/MovieImage.vue';
import MovieOptions from '../components/MovieOptions.vue';
import FeedbackMessage from '../components/FeedbackMessage.vue';
import EndGameMessage from '../components/EndGameMessage.vue';
import LoadingMessage from '../components/LoadingMessage.vue';

export default {
	components: {
		MovieImage,
		MovieOptions,
		FeedbackMessage,
		EndGameMessage,
		LoadingMessage,
	},
	data() {
		return {
			movies: [],
			currentMovie: null,
			options: [],
			feedback: "",
			clickedOptions: [],
			imageZoom: true,
			shownMovies: [],
			showFeedback: false,
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
		}, 10);
	},
	computed: {
		feedbackClass() {
			return this.feedback.includes("✅") ? "success" : "error";
		},
	},
	methods: {
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
		generateOptions() {
			const otherMovies = this.movies
				.filter(movie => movie.id !== this.currentMovie.id)
				.sort(() => 0.5 - Math.random())
				.slice(0, 5)
				.map(movie => movie.title);

			this.options = shuffleArray([...otherMovies, this.currentMovie.title]);
		},
		resetRoundState() {
			this.clickedOptions = [];
			this.feedback = "";
			this.imageZoom = true;
		},
		triggerAnimation() {
			this.isNewRound = true;
			setTimeout(() => {
				this.isNewRound = false;
			}, 500);
		},
		checkAnswer(option) {
			this.clickedOptions.push(option);
			this.showFeedback = true;

			if (option === this.currentMovie.title) {
				this.feedback = "✅ ¡Correcto!";
				this.imageZoom = false;
				this.isRoundEnded = true;

				const stats = getStats("portadas");
				stats.attempts += 1;
				stats.correct += 1;
				stats.guessedMovies.push(this.currentMovie);
				saveStats("portadas", stats);

				setTimeout(() => {
				this.feedback = "";
				this.imageZoom = true;
				this.showFeedback = false;
				this.newRound();
				}, 2000);
			} else {
				this.feedback = "❌ Incorrecto, intenta de nuevo.";
				this.imageZoom = false;
				this.isRoundEnded = true;

				const stats = getStats("portadas");
				stats.attempts += 1;
				stats.errors += 1;
				saveStats("portadas", stats);

				setTimeout(() => {
					this.feedback = "";
					this.imageZoom = true;
					this.showFeedback = false;
					this.newRound();
				}, 2000);
			}
		},
	},
};
</script>

<style scoped>
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
</style>