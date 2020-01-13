<template>
  <div id="app">
    <ScoreBoard />
  </div>
</template>

<script>
import ScoreBoard from "./components/ScoreBoard.vue";

export default {
  name: "app",
  components: {
    ScoreBoard
  }
};
</script>

<style>
body {
  background: url(https://images.casumo.com/2016/06/IGT-WheelOfFortune-TripleExtremeSpin-Background.jpg);
  background-size: cover;
}
#app {
  font-family: "Seymour One", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
