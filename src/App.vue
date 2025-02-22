<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
body {
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-top: 1rem;
}
</style>