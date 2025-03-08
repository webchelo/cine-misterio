<template>
    <div class="feedback-container">
      <p v-if="attemptsLeft">Intentos restantes: {{ attemptsLeft }}</p>
      <v-alert
        v-if="showFeedback"
        :type="feedbackClass"
        style="text-align: center; width: 30rem; margin: 0 auto; text-indent: -2rem;"
      >
        {{ feedback }}
      </v-alert>
    </div>
</template>
  
<script>
    export default {
        props: {
        feedback: {
            type: String,
            required: true,
        },
        feedbackClass: {
            type: String,
            required: true,
        },
        attemptsLeft: {
            type: Number,
            required: true,
        },
        showFeedback: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.feedback-container > p {
    text-align: center;
}
</style>