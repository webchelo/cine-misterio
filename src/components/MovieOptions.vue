<template>
    <div class="buttons-container">
      <div>
        <v-btn
          elevation="2"
          v-for="(option, index) in options"
          :key="index"
          @click="handleClick(option)"
          :disabled="isButtonDisabled(option)"
        >
          {{ option }}
        </v-btn>
      </div>
    </div>
</template>
  
<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        clickedOptions: {
            type: Array,
            required: true,
        },
        attemptsLeft: {
            type: Number,
            required: true,
        },
        isRoundEnded: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleClick(option) {
            this.$emit('option-selected', option);
        },
        
		/**
		* Verifica si un botón de opción debe estar deshabilitado.
		* Un botón se deshabilita en los siguientes casos:
		* 1. Si la opción ya fue seleccionada por el usuario.
		* 2. Si no quedan intentos restantes.
		* 3. Si la ronda ha terminado (isRoundEnded es true).
		*
		* @param {string} option - La opción (título de la película) asociada al botón.
		* @returns {boolean} - `true` si el botón debe estar deshabilitado, `false` en caso contrario.
		*/
        isButtonDisabled(option) {
            return (
            this.clickedOptions.includes(option) ||
            this.attemptsLeft === 0 ||
            this.isRoundEnded
            );
        },
    },
};
</script>
  
<style scoped>
.buttons-container > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 10px;
    justify-content: center;
    margin: 10px auto;
    max-width: 60rem;
}

button {
    background-color: #3f51b5;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 100%;
    min-width: fit-content !important;
}

button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #3f51b5;
    color: white;
    transform: translateY(-2px);
}

button:active:not(:disabled) {
    transform: translateY(0);
}

@media (max-width: 1000px) {
    .buttons-container > div {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(6, auto);
    }
}
</style>