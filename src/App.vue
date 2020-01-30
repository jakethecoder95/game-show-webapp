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
/* Press Your Luck Background: https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/f1rox-TCVWSX5DRVQ-Full-Image_GalleryBackground-en-US-1575406129397._SX1080_.jpg */
body {
  background: url("/Price-Is-Right-Wallpaper-8.jpg");
  background-size: fill;
  background-repeat: none;
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
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
}
</style>
