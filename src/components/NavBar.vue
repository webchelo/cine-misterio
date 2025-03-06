<template>
	<v-app-bar
	elevation="4"
	>
	<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

	<v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>		<router-link to="/">Inicio</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>		<router-link to="/cover-game">Adivinar por Portada</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>		<router-link to="/actors-game">Adivinar por Actores</router-link>			</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>		<router-link to="/statistics">Estadísticas</router-link></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>




	</v-app-bar>
	
  </template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style scoped>
nav {
	display: flex;
	gap: 15px;
	background: #222;
	padding: 10px;
}

a {
	display: block;
	color: white;
	text-decoration: none;
	width: 100%;
	height: 100%;
}
</style>
