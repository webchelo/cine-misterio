<template>
  <div>
    <div :class="{'fade-in': isMounted}">
      <h1>Adivina la Película por sus Actores</h1>
      <div v-if="currentMovie">
        <div class="actores-container" :class="{'slide-in': isNewRound}">
          <ActorsCard :actors="displayedActors" />
        </div>
        <div class="buttons-container">
          <div>
            <button
              v-for="(option, index) in options"
              :key="index"
              @click="checkAnswer(option)"
              :disabled="isButtonDisabled(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="feedback-container">
          <p :class="feedbackClass" v-if="feedback">{{ feedback }}</p>
          <p>Intentos restantes: {{ attemptsLeft }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovies, getMovieCast } from '../services/movieService.js';
import ActorsCard from '../components/ActorsCard.vue';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
    async newRound() {
      this.attemptsLeft = 3;
      this.clickedOptions = [];
      this.feedback = "";

      const randomIndex = Math.floor(Math.random() * this.movies.length);
      this.currentMovie = this.movies[randomIndex];

      this.allActors = await getMovieCast(this.currentMovie.id);
      this.displayedActors = [this.allActors[0]];
      this.actorIndex = 1;

      const otherMovies = this.movies
        .filter((movie) => movie.id !== this.currentMovie.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map((movie) => movie.title);

      const allOptions = [...otherMovies, this.currentMovie.title];
      this.options = shuffleArray(allOptions);

      // Activo la animación de desplazamiento
      this.isNewRound = true;
      setTimeout(() => {
        this.isNewRound = false;
      }, 500);
    },

    isButtonDisabled(option) {
      return this.clickedOptions.includes(option) || this.attemptsLeft === 0;
    },

    checkAnswer(option) {
      this.clickedOptions.push(option);

      if (option === this.currentMovie.title) {
        this.feedback = "✅ ¡Correcto!";
        setTimeout(() => {
          this.feedback = "";
          this.newRound();
        }, 2000);
      } else {
        this.attemptsLeft--;

        if (this.attemptsLeft === 0) {
          this.feedback = `❌ Incorrecto. La respuesta era: ${this.currentMovie.title}`;
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

.actores-container > div {
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

.buttons-container > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
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

  button {
    width: 100%;
    margin: 10px 0;
  }
}
</style>