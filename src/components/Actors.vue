<template>
    <div>
      <div v-for="(actor, index) in actors" :key="index" class="actor-container">
        <img :src="actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200'" alt="Actor" class="actor-image" />
        <p class="actor-name">{{ actor.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      actors: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .actor-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
  </style>