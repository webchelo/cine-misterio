<template>
    <div class="movie-container">
      <img
        :src="imageUrl"
        alt="Película"
        :class="['movie-image', { 'normal-size': !imageZoom, 'pop-up': isNewRound }]"
      />
    </div>
</template>
  
<script>
export default {
    props: {
        imageUrl: {
            type: String,
            required: true,
        },
        imageZoom: {
            type: Boolean,
            required: true,
        },
        isNewRound: {
            type: Boolean,
            required: true,
        },
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
}
</style>