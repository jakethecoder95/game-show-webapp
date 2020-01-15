<template>
  <div class="single-letter">
    <span v-if="showLetter">{{ letter.toUpperCase() }}</span>
  </div>
</template>

<script>
export default {
  name: "Letter",
  props: {
    letter: String,
    showLetter: Boolean
  }
};
</script>

<style scoped>
.single-letter {
  font-family: sans-serif;
  font-weight: bolder;
  font-size: 3em;
  background: white;
  width: 60px;
  height: 60px;
  padding: 10px;
  color: #252525;

  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
</style>

