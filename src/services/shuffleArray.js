/**
 * Mezcla aleatoriamente los elementos de mi array
 * 
 * @param {Array<object>} array El array que se quiere mezclar
 * @returns {Array<object>} Una nueva versión del array con todos sus elementos mezclados
 */
export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

/*
    EJEMPLO:
        0.7 - 0.5 = 0.2  [POSITIVO](El segundo elemento se coloca antes que el primero)
        0.3 - 0.5 = -0.2 [NEGATIVO](El primer elemento se coloca antes que el segundo)
        0.5 - 0.5 = 0 (no hay cambios)
*/