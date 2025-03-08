<template>
    <v-tabs>
        <div>
            <img :src="logo" alt="Logo" style="height: 50px; width: auto;" />
        </div>
        <v-tab><router-link to="/">Inicio</router-link></v-tab>
        <v-tab><router-link to="/actors-game">Adivinar por Actores</router-link></v-tab>
        <v-tab><router-link to="/cover-game">Adivinar por Portada</router-link></v-tab>
        <v-tab><router-link to="/statistics">Estadísticas</router-link></v-tab>
        <v-tab><router-link to="/about">Acerca de</router-link></v-tab>
    </v-tabs>
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