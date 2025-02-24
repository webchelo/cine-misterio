<template>
  <div>
    <div v-for="(actor, index) in actors" :key="index" class="actor-container">
      <img :src="actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" alt="Actor" class="actor-image" />
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
  margin-bottom: 1rem;
}

.actor-image {
  width: 8rem;
  height: 12rem;
  border-radius: 8px;
  margin-right: 15px;
}

.actor-name {
  font-size: 1.2rem;
  color: #34495e;
}
</style>