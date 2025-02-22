<template>
  <div>
    <h1>Adivina la Película por su Portada</h1>
    <div v-if="currentMovie">
      <div class="movie-container">
        <img 
          :src="currentMovie.image ?
          `https://image.tmdb.org/t/p/w200${currentMovie.image}` :
          'https://i.pinimg.com/736x/18/42/70/184270e5d389569745c2c5675fcf4a26.jpg'" 
          alt="Película" 
          :class="['movie-image', { 'normal-size': !imageZoom }]" 
        />

      </div>

      <div class="options-container">
        <button
          v-for="(option, index) in options"
          :key="index"
          @click="checkAnswer(option)"
          :disabled="isButtonDisabled(option)"
        >
          {{ option }}
        </button>
      </div>

      <p :class="feedbackClass">{{ feedback }}</p>
    </div>
    <div v-else>
      <p>Cargando películas...</p>
    </div>
  </div>
</template>

<script>
import movieService from '../services/movieService.js'; 

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default {
  data() {
    return {
      movies: [], 
      currentMovie: null, // Película correcta
      options: [], // Opciones de películas para elegir
      feedback: "", 
      clickedOptions: [], 
      imageZoom: true,
    };
  },

  async created() {
    this.movies = await movieService.getMovies(); // Usar el servicio para obtener películas
    this.newRound(); // Iniciar una nueva ronda
  },

  computed: {
    // Clase dinámica para el feedback
    feedbackClass() {
      return this.feedback.includes("✅") ? "correct" : "incorrect";
    },
  },

  methods: {
    // Iniciar una nueva ronda
    newRound() {
      const shuffled = [...this.movies].sort(() => 0.5 - Math.random());
      this.currentMovie = shuffled[0]; // Seleccionar una película aleatoria
      this.options = shuffled.slice(0, 4).map((m) => m.title); // Seleccionar 4 opciones
      this.options = shuffleArray(this.options)
      this.clickedOptions = []; // Reiniciar las opciones clickeadas
      console.log(this.currentMovie)
    },

    // Verificar si un botón está deshabilitado
    isButtonDisabled(option) {
      return this.clickedOptions.includes(option);
    },

    // Verificar la respuesta del usuario
    checkAnswer(option) {
      this.clickedOptions.push(option); // Bloquear el botón clickeado

      if (option === this.currentMovie.title) {
        this.feedback = "✅ ¡Correcto!";
        this.imageZoom = false; // Hacer que la imagen vuelva a su tamaño normal
      } else {
        this.feedback = "❌ Incorrecto, intenta de nuevo.";
        this.imageZoom = false; 
      }

      // Iniciar una nueva ronda después de 2 segundos
      setTimeout(() => {
        this.feedback = "";
        this.imageZoom = true; // Volver a hacer el zoom de la imagen para la siguiente ronda
        this.newRound();
      }, 2000);
    }

  },
};
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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
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

@media (max-width: 600px) {
  .movie-image {
    height: 10rem;
  }
}
</style>