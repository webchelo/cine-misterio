<template>
	<div class="container">
		<div class="header">
			<h1>¡Bienvenido a Cine Misterio!</h1>
			<div class="image-container">
				<img src="../assets/img/Metropolis_091Pyxurz.jpg" alt="Profesor Rotwang en Metrópolis">
			</div>
		</div>
		<div class="content">
			<p>Cine Misterio tiene dos juegos: Adivinar la Película por sus Actores y Adivinar la Película por su Portada.</p>
			<p>Para jugar, simplemente seleccioná el juego que desees y comenzá a adivinar las películas según las pistas que te son dadas.</p>
			<p>¡Buena suerte!</p>
			<router-link to="/actors-game" class="button">Adivinar por Actores</router-link>
			<router-link to="/cover-game" class="button">Adivinar por Portada</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		};
	},
};
</script>

<style scoped>
.container {
	margin:0;
	min-width: 100%;
	text-align: center;
	padding: 1rem;
	padding-bottom: 4rem;
	background-color: #1a1a1a;
	color: #fff;
	font-family: 'Arial', sans-serif;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.header {
	animation: fadeIn 2s ease-in-out;
}

.header h1 {
	font-size: 3rem;
	color: #3f51b5;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	margin-bottom: 20px;
}

.image-container img {
	max-width: 100%;
	height: auto;
	border-radius: 15px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.content {
	margin-top: 30px;
	max-width: 600px;
	animation: slideUp 1.5s ease-in-out;
}

.content p {
	font-size: 1.2rem;
	line-height: 1.6;
	margin-bottom: 15px;
	color: #ddd;
}

.content p:nth-child(3) {
	font-weight: bold;
	color: #3f51b5;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp {
	from {
		transform: translateY(20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

.button {
	background-color: white;
	color: black;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin: 2rem 1rem;
	text-decoration: none;
}

.button:hover {
	background-color: #3f51b5;
	color: white;
}
</style>