<template>
  <div class="answers-list row">
    <div v-for="(answer, i) in answers" v-bind:key="i" class="team-answer">{{ answer }}</div>
  </div>
</template>

<script>
export default {
  name: "TheBiblesRight",
  props: {
    answers: Array
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