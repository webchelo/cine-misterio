/**
 * Mezcla aleatoriamente los elementos de mi array
 * (No es un algoritmo, utiliza sort() por lo que la aleatoriedad es menos confiable)
 * 
 * @param {Array<object>} array El array que se quiere mezclar
 * @returns {Array<object>} Una nueva versión del array con todos sus elementos mezclados
 */
export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);