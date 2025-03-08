const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // (Api key alojada en el archivo .env)

/**
 * Obtener películas mejor puntuadas. Referencia: https://developer.themoviedb.org/reference/movie-top-rated-list
 * @returns {Promise<Array<{title: String, image: String, poster_path: String | null}>>} La API puede retornar null en poster_path
 */
export const getMovies = async () => {
	const totalPages = 10;
	const allMovies = [];

	try {
		for (let page = 1; page <= totalPages; page++) {

			const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-MX&page=${page}`;

			const response = await fetch( url );
			const data = await response.json();
			allMovies.push(...data.results);
		}

		return allMovies.map(({ id, title, poster_path }) => ({
			id,
			title,
			poster_path
		}));

	} catch (error) {
		console.error("Fetch error en getMovies():", error);
		return [];
	}
}

/**
 * Obtener el elenco de una película a partir de su ID
 * @param {Number} movieId 
 * @returns {Promise<Array<{name: String, profile_path: String | null}>>} La API puede retornar null en poster_path
 */
export const getMovieCast = async ( movieId ) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;

	try {
		const response = await fetch( url );
		const data = await response.json();
		const actors = data.cast.slice(0, 3);

		return actors.map(({ name, profile_path }) => ({
			name,
			profile_path
		}));
	} catch (error) {
		console.error("Fetch error en getMovieCast():", error);
		return [];
	}
}
