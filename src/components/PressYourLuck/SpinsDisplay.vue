<template>
  <div>
    <h2>SPINS:</h2>
    <div class="spins-row">
      <div
        v-bind:class="activeTeam === i ? 'active' : ''"
        v-for="(team, i) in teams"
        v-bind:key="i"
      >
        <h3>{{ team.name }}: {{ team.spins }} {{ activeTeam === i ? "(active)" : "" }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpinsDisplay",
  props: {
    teams: Array,
    activeTeam: Number
  }
};
</script>

<style scoped>
.spins-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin: auto;
}
.active {
  color: green;
  font-weight: bold;
}
</style>