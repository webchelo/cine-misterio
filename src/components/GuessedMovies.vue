<template>
    <div>
        <h2>Colección de Películas Adivinadas</h2>
        <MovieSheet :combinedMovies="combinedMovies" />
    </div>
</template>
  
<script>
import MovieSheet from './MovieSheet.vue';
  
export default {
    props: {
        combinedMovies: {
            type: Array,
            required: true,
        },
    },
    components: {
        MovieSheet,
    },
};
</script>
  
<style scoped>
h2 {
    margin-bottom: 1rem;
}
</style>