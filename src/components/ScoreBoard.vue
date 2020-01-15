<template>
  <div class="score-board">
    <h1 class="game-title">{{ match.games[match.gamesPlayed] }}</h1>
    <div class="row game-score-row">
      <div class="team-column team-0">
        <h1>{{ match.teams[0].name }}</h1>
        <h2 class="team-score-header">{{ match.teams[0].gameScore }}</h2>
      </div>
      <div class="team-column team-1">
        <h1>{{ match.teams[1].name }}</h1>
        <h2 class="team-score-header">{{ match.teams[1].gameScore }}</h2>
      </div>
      <div class="team-column team-2">
        <h1>{{ match.teams[2].name }}</h1>
        <h2 class="team-score-header">{{ match.teams[2].gameScore }}</h2>
      </div>
    </div>

    <LetterList v-bind:wheelOfBlessings="match.wheelOfBlessings" />

    <div class="total-scores-container">
      <h2 class="match-name">{{ match.title }} - Total Scores:</h2>
      <div class="row">
        <div class="total-score team-0">
          <h2 class="total-score-header">{{ match.teams[0].totalScore }}</h2>
        </div>
        <div class="total-score team-1">
          <h2 class="total-score-header">{{ match.teams[1].totalScore }}</h2>
        </div>
        <div class="total-score team-2">
          <h2 class="total-score-header">{{ match.teams[2].totalScore }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchService from "../MatchService";
import LetterList from "./WheelOfBlessings/LetterList";
import openSocket from "socket.io-client";

export default {
  name: "ScoreBoard",
  components: {
    LetterList
  },
  data: function() {
    return {
      match: {},
      error: ""
    };
  },
  async created() {
    try {
      this.match = await MatchService.getMatch();
      const socket = openSocket("https://game-show.herokuapp.com");
      // const socket = openSocket("http://localhost:8000");
      socket.on("match", data => {
        const { action, teamIndex } = data;
        if (action === "updateTeamScore") {
          const { gameScore, totalScore } = data.team;
          this.match.teams[teamIndex].gameScore = gameScore;
          this.match.teams[teamIndex].totalScore = totalScore;
        }
        if (action == "updateTeamName") {
          const { name } = data.team;
          this.match.teams[teamIndex].name = name;
        }
        if (action === "newGame") {
          const { updatedMatch } = data;
          this.match = { ...updatedMatch };
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.score-board {
  padding-top: 50px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
}

.game-score-row {
  /* height: 66vh; */
}

.game-title {
  font-size: 3em;
}
.team-score-header {
  font-size: 4em;
}
</style>
