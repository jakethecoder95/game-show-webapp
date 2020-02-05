<template>
  <div>
    <h3 class="score-list-title">MILLIONAIRE</h3>
    <div class="score-list">
      <div
        v-for="(value, i) in values"
        v-bind:key="i"
        v-bind:class="`score ${value === 1000 || value === 32000 || value === 1000000 ? 'checkpoint' : ''}`"
      >
        <i v-if="active === i" class="fa fa-arrow-right"></i>
        {{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreListBoard",
  components: {},
  props: {
    values: Array,
    active: Number
  }
};
</script>

<style scoped>
.score-list {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
}
.score-list-title {
  background: rgb(177, 150, 0);
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
}
.score {
  margin-top: 10px;
  font-size: 1.3em;
}
.checkpoint {
  color: gold;
}
.fa {
  position: absolute;
  left: 20px;
  opacity: 0.8;
}
</style>