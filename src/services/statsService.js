// src/services/statsService.js

/**
 * Guarda las estadísticas en el localStorage
 * @param {string} gameName - Nombre del juego
 * @param {Object} stats - Estadísticas a guardar
 */
export const saveStats = (gameName, stats) => {
    const savedStats = JSON.parse(localStorage.getItem("gameStats")) || {};
    savedStats[gameName] = stats;
    localStorage.setItem("gameStats", JSON.stringify(savedStats));
};

/**
 * Obtiene las estadísticas guardadas para un juego específico
 * @param {string} gameName - Nombre del juego
 * @returns {Object} - Estadísticas del juego
 */
export const getStats = (gameName) => {
    const savedStats = JSON.parse(localStorage.getItem("gameStats")) || {};
    return savedStats[gameName] || {
        attempts: 0,
        correct: 0,
        errors: 0,
        guessedMovies: [],
    };
};

/**
 * Obtiene todas las estadísticas guardadas
 * @returns {Object} - Todas las estadísticas
 */
export const getAllStats = () => {
    return JSON.parse(localStorage.getItem("gameStats")) || {};
};

/**
 * Combina las películas adivinadas de ambos juegos y elimina duplicados
 * @returns {Array} - Lista única de películas adivinadas
 */
export const getCombinedGuessedMovies = () => {
    const allStats = getAllStats();
    const combinedMovies = [];
  
    for (const gameName in allStats) {
      if (allStats.hasOwnProperty(gameName)) {
        const stats = allStats[gameName];

        for (let i = 0; i < stats.guessedMovies.length; i++) {
          const movie = stats.guessedMovies[i];
          let isDuplicate = false;
          
          for (let j = 0; j < combinedMovies.length; j++) {
            if (combinedMovies[j].id === movie.id) {
              isDuplicate = true;
              break;
            }
          }
  
          if (!isDuplicate) {
            combinedMovies.push(movie);
          }
        }
      }
    }

    return combinedMovies;
  };