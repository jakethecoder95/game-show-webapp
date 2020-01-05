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
  background: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c3f34d4f-0676-4857-9fd9-cc10807708af/dcwx9jx-64f09dc2-abff-4aae-9787-153f19b93f27.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzZjM0ZDRmLTA2NzYtNDg1Ny05ZmQ5LWNjMTA4MDc3MDhhZlwvZGN3eDlqeC02NGYwOWRjMi1hYmZmLTRhYWUtOTc4Ny0xNTNmMTliOTNmMjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZT8FY-fxjQdFNAjxR29Yykr_tNWoF3BsXguL8LYQahI);
  background-size: cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffc90e;
}
</style>
