<template>
    <div class="nav-container">
  
            <img :src="logo" alt="Logo" style="height: 50px; width: auto;" />
     
        <v-tabs>
    
            <v-tab><router-link to="/">Inicio</router-link></v-tab>
            <v-tab><router-link to="/actors-game">Adivinar por Actores</router-link></v-tab>
            <v-tab><router-link to="/cover-game">Adivinar por Portada</router-link></v-tab>
            <v-tab><router-link to="/statistics">Estadísticas</router-link></v-tab>
            <v-tab><router-link to="/about">Acerca de</router-link></v-tab>
        </v-tabs>
    </div>
</template>

<script>
import logo from '../assets/logo.svg';

export default {
    data() {
        return {
            logo: logo
        };
    }
};
</script>

<style scoped>
.nav-container {
    display: flex;
    margin: 0;
}

img {
    margin-left: 1rem;
    margin-right: 1rem;
    width: .3rem;
}

a {
    display: block;
    color: white;
    text-decoration: none;
    width: 100%;
    height: 100%;
    position: relative;
    top: 1rem;
}
</style>