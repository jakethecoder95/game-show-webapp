<template>
  <div class="game-info-board">
    <h2>{{ teamName.toUpperCase() }}</h2>
    <div class="help-options">
      <div v-bind:class="`option ${ helpOptionsUsed.indexOf(0) > -1 ? 'used' : ''}`">
        <i class="fa fa-hourglass-half"></i>
      </div>
      <div
        v-bind:class="`option fifty-fifty ${ helpOptionsUsed.indexOf(1) > -1 ? 'used' : ''}`"
      >50/50</div>
      <div v-bind:class="`option ${ helpOptionsUsed.indexOf(2) > -1 ? 'used' : ''}`">
        <i class="fa fa-forward"></i>
      </div>
      <div v-bind:class="`option ${ helpOptionsUsed.indexOf(3) > -1 ? 'used' : ''}`">
        <i class="fa fa-question"></i>
      </div>
    </div>

    <div class="team-score">
      <div>
        <i class="fa fa-dollar"></i>
        {{ score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </div>
    </div>

    <div v-bind:class="`timer ${ timeLeft <= 10 ? 'warning' : '' }`">
      <i class="fa fa-hourglass-end"></i>
      <h3>{{ timeLeft }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameInfoBoard",
  components: {},
  props: {
    helpOptionsUsed: Array,
    score: Number,
    timeLeft: Number,
    setTime: Function,
    timerRunning: Boolean,
    teamName: String
  },
  data: function() {
    return {
      startCountdown() {
        const timer = setInterval(() => {
          if (this.timeLeft && this.timerRunning) {
            this.setTime(this.timeLeft - 1);
          } else {
            clearInterval(timer);
          }
        }, 1000);
      }
    };
  },
  created() {
    this.startCountdown();
  },
  watch: {
    timerRunning: function(newVal, oldVal) {
      if (!oldVal && newVal) {
        this.startCountdown();
      }
    }
  }
};
</script>

<style scoped>
.game-info-board {
  padding: 1rem;
}
.help-options {
  display: flex;
  justify-content: center;
}
.option {
  font-size: 2.5em;
  margin: 10px 20px;
  color: gold;
  border: solid 3px gold;
  padding: 10px 20px;
  border-radius: 50%;
}
.used {
  color: grey;
  border-color: grey;
}
.fifty-fifty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  border-radius: 50%;
  padding: 10px;
}
.team-score {
  margin-top: 1.5rem;
  font-size: 2.75em;
  color: gold;
}
.fa-dollar {
  margin-right: 10px;
  font-weight: bold;
}
.fa-question {
  width: 35px;
}
.timer {
  font-size: 1.75em;
  margin-top: 1.5rem;
  max-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.timer h3 {
  margin-left: 15px;
  width: 30px;
}
.warning {
  color: red;
}
</style>