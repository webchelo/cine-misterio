const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // (Api key alojada en el archivo .env)

/**
 * Obtener películas mejor puntuadas
 * @returns {Promise<Array<{title: String, image: String | null}>>} La API puede retornar null en poster_path
 */
export const getMovies = async () => {
  const totalPages = 10; // Número de páginas que quieres obtener TODO: agregar dificultad (totalPages como parámetro, mientra mas páginas, más dificil)
  const allMovies = [];

  try {
    for (let page = 1; page <= totalPages; page++) {

      const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
      url.searchParams.append("api_key", API_KEY);
      url.searchParams.append("language", "es-ES");
      url.searchParams.append("page", page);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      allMovies.push(...data.results);
    }

    return allMovies.map(({id, title, poster_path}) => ({
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
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/credits`);
  url.searchParams.append( "api_key", API_KEY );

  try {
    const response = await fetch( url );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const actors = data.cast.slice(0, 3); // Tomar únicamente los primeros 3 actores

    return actors.map(({ name, profile_path }) => ({
      name,
      profile_path
    }));
  } catch ( error ) {
    console.error("Fetch error en getMovieCast():", error);
    return [];
  }
}
