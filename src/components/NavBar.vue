<template>
  <nav>
    <router-link to="/">Inicio</router-link>
    <router-link to="/cover-game">Adivinar por Portada</router-link>
    <router-link to="/actors-game">Adivinar por Actores</router-link>
    <router-link to="/statistics">Estadísticas</router-link>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    gap: 15px;
    background: #222;
    padding: 10px;
  }
  a {
    color: white;
    text-decoration: none;
  }
</style>
