<template>
    <div class="game-stats">
        <h2>{{ gameName === 'actores' ? 'Adivina la Película por sus Actores' : 'Adivina la Película por su Portada' }}</h2>
        <p>Intentos totales: {{ stats.attempts }}</p>
        <p>Películas adivinadas: <span class="guess">{{ stats.correct }}</span></p>
        <p>Errores: <span class="error-guess">{{ stats.errors }}</span></p>
        <v-divider></v-divider>
    </div>
</template>
  
<script>
export default {
    props: {
        gameName: {
            type: String,
            required: true,
        },
        stats: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.game-stats {
    margin-bottom: 40px;
}

.error-guess {
    color: tomato;
    font-weight: bold;
}

.guess {
    color: rgb(20, 156, 39);
    font-weight: bold;
}
  </style>