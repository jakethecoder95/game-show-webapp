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
  background: url(http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg);
  background-size: cover;
  padding: 0;
  margin: 0;
}
#app {
  margin: 0;
  margin-top: -32px;
  font-family: "Seymour One", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
