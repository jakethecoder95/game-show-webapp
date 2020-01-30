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

    <UnmuteBtn />
    <LetterList
      v-if="match.games[match.gamesPlayed] === 'WHEEL OF BLESSINGS'"
      v-bind:wheelOfBlessings="match.wheelOfBlessings"
    />
    <PressYourLuckBoard
      v-else-if="match.games[match.gamesPlayed] === 'Press Your Luck'"
      v-bind:match="match"
      v-bind:socket="socket"
    />
    <!-- <TheBibleIsRight
      v-else-if="match.games[match.gamesPlayed] === 'The Bible\'s Right'"
      v-bind:answers="answers"
    />-->
    <h2>{{ match.games[match.gamesPlayed].name }}</h2>
    <div class="total-scores-container">
      <h2 class="match-name">{{ match.title }} - Total Scores:</h2>
      <div class="row">
        <div class="total-score team-0">
          <h2 class="total-score-header">{{ match.teams[0].totalScore + match.teams[0].gameScore }}</h2>
        </div>
        <div class="total-score team-1">
          <h2 class="total-score-header">{{ match.teams[1].totalScore + match.teams[1].gameScore }}</h2>
        </div>
        <div class="total-score team-2">
          <h2 class="total-score-header">{{ match.teams[2].totalScore + match.teams[2].gameScore }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openSocket from "socket.io-client";

import MatchService from "../MatchService";
// import LetterList from "./WheelOfBlessings/LetterList";
import UnmuteBtn from "./UnmuteBtn";
import PressYourLuckBoard from "./PressYourLuck/PressYourLuckBoard";
// import TheBibleIsRight from "./TheBibleIsRight/TheBibleIsRight";

export default {
  name: "ScoreBoard",
  components: {
    // LetterList,
    PressYourLuckBoard,
    // TheBibleIsRight,
    UnmuteBtn
  },
  data: function() {
    return {
      match: {},
      error: "",
      answers: ["60\" 11'", "60\" 11'", "60\" 11'"],
      socket: openSocket("https://game-show.herokuapp.com")
      // socket: openSocket("http://localhost:8000")
    };
  },
  async created() {
    try {
      this.match = await MatchService.getMatch();
      // eslint-disable-next-line no-console
      console.log(this.match);
      this.socket.on("match", data => {
        const { action, teamIndex } = data;
        if (action === "updateTeamScore") {
          const { gameScore, totalScore } = data.team;
          this.match.teams[teamIndex].gameScore = gameScore;
          this.match.teams[teamIndex].totalScore = totalScore;
        }
        if (action === "updateTeamName") {
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

.game-score-row {
  height: 66vh;
}

.game-title {
  font-size: 3em;
}
.team-score-header {
  font-size: 4em;
}
</style>
