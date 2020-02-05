<template>
  <div id="app">
    <ScoreBoard />
  </div>
</template>

<script>
import ScoreBoard from "./components/ScoreBoard";

export default {
  name: "app",
  components: {
    ScoreBoard
  }
};
</script>



<style>
/* Press Your Luck Bg: https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/f1rox-TCVWSX5DRVQ-Full-Image_GalleryBackground-en-US-1575406129397._SX1080_.jpg */
/* The Bible's Right Bg "/Price-Is-Right-Wallpaper-8.jpg" */
body {
  background: url(/millionaire-bg.png);
  background-size: cover;
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
