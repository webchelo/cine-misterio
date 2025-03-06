<template>
	<div class="about">
		<h1>¡Espero que te hayas divertido!</h1>
		<p class="description">Este es un juego creado por <span class="creator">Marcelo Anavia</span>.</p>
		<div class="links">
			<a href="https://marcelo-anavia.netlify.app" target="_blank" class="github-link">Portfolio</a>
			<a href="https://github.com/webchelo" target="_blank" class="github-link">GitHub</a>
		</div>
	</div>
</template>

<style scoped>

.about {
	text-align: center;
	padding: 50px 20px;
	background-color: #1a1a1a;
	color: #fff;
	font-family: 'Arial', sans-serif;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.about h1 {
	font-size: 3rem;
	color: #3f51b5;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.description {
	font-size: 1.5rem;
	margin-top: 20px;
	color: #ddd;
}

.creator {
	color: #3f51b5;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.links {
	display: flex;
	gap: 2rem;
}

.github-link {
	margin-top: 30px;
	display: inline-flex;
	align-items: center;
	background-color: #3f51b5;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	text-decoration: none;
	font-size: 1.2rem;
	transition: background-color 0.3s ease, transform 0.3s ease;
}

.github-link:hover {
	background-color: #21a1f1;
	transform: scale(1.05);
}

.github-link i {
	margin-right: 10px;
	font-size: 1.5rem;
}
</style>