<template>
  <div class="answers-list row">
    <div v-for="(answer, i) in answers" v-bind:key="i" class="team-answer">{{ answer }}</div>
  </div>
</template>

<script>
export default {
  name: "TheBiblesRight",
  props: {
    answers: Array,
    socket: Object
  },
  async created() {
    try {
      this.socket.on("theBiblesRight", data => {
        const { action } = data;
        if (action === "updateAnswers") {
          const { answers } = data;
          this.answers = answers;
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
};
</script>

<style scoped>
.answers-list {
  margin-bottom: 8rem;
}
.team-answer {
  font-size: 4em;
}
</style>