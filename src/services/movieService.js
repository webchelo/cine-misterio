// movieService.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default {
  // Obtener películas mejor puntuadas
  async getTopRatedMovies() {
    const totalPages = 3; // Número de páginas que quieres obtener
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

      return allMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
      }));
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
      return [];
    }
  },

  // Obtener el elenco de una película
  async getMovieCast(movieId) {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/credits`);
    url.searchParams.append("api_key", API_KEY);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data.cast.slice(0, 3); // Tomar los primeros 3 actores
    } catch (error) {
      console.error("Error fetching movie cast:", error);
      return [];
    }
  },

  async getMovies() {
    const totalPages = 3; // Número de páginas que quieres obtener
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
        console.log({allMovies})
      }
      return allMovies.map((movie) => ({
        title: movie.title,
        image: movie.poster_path,
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  },

};