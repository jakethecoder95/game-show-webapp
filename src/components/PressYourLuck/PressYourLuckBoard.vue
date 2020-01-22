<template>
  <div>
    <SpinsDisplay
      v-bind:teams="match.pressYourLuck.teams"
      v-bind:activeTeam="match.pressYourLuck.activeTeam"
    />

    <div class="board">
      <div
        v-for="(box, i) in boxValues"
        v-bind:key="i"
        v-bind:class="`box box${i+1} ${active === i ? 'active' : ''}`"
        v-bind:style="{ background: `url(/${boxValues[i].img})`, display: i < 18 ? 'block' : 'none', 'background-position': boxValues[i].pos, 'background-size': boxValues[i].value >= 0 ? '810px 605px' : '100%' }"
      ></div>

      <div class="logo"></div>

      <!-- <button v-if="shuffling" v-on:click="endInterval">Stop</button>
      <button v-else v-on:click="play">Start</button>-->

      <audio id="timerSound">
        <source v-bind:src="timerSoundLoc" type="audio/mpeg" />
      </audio>
      <audio id="happySound">
        <source v-bind:src="happySoundLoc" type="audio/mpeg" />
      </audio>
      <audio id="sadSound">
        <source v-bind:src="sadSoundLoc" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import boxValues from "./boxValues";
import priceIcons from "../../assets/luck_board_low_res.jpg";
import timerSoundLoc from "../../assets/Ticking_Clock.mp3";
import happySoundLoc from "../../assets/cha_ching.mp3";
import sadSoundLoc from "../../assets/Sad_Trombone.mp3";
import MatchService from "../../MatchService";
import SpinsDisplay from "./SpinsDisplay";

export default {
  name: "PressYourLuckBoard",
  components: {
    SpinsDisplay
  },
  props: {
    match: Object,
    socket: Object
  },
  data: function() {
    return {
      boxValues,
      priceIcons,
      timerSoundLoc,
      happySoundLoc,
      sadSoundLoc,
      active: Math.round(Math.random() * 17),
      shuffling: false,
      boardShuffleInterval: null
    };
  },
  methods: {
    shuffle() {
      for (let i = this.boxValues.length - 1; i > 0; i--) {
        this.active !== 17 ? this.active++ : (this.active = 0);
        const j = Math.floor(Math.random() * (i + 1));
        [this.boxValues[i], this.boxValues[j]] = [
          this.boxValues[j],
          this.boxValues[i]
        ];
      }
    },
    play() {
      const timerSound = document.getElementById("timerSound");
      timerSound.loop = true;
      timerSound.play();
      this.incramentActiveInterval = setInterval(
        () => (this.active = Math.round(Math.random() * 17)),
        250
      );
      this.boardShuffleInterval = setInterval(this.shuffle, 2000);
      this.shuffling = true;
    },
    async endInterval() {
      const resultBox = this.boxValues[this.active];
      const happySound = document.getElementById("happySound");
      const sadSound = document.getElementById("sadSound");
      const timerSound = document.getElementById("timerSound");
      timerSound.pause();
      timerSound.currentTime = 0;
      clearInterval(this.incramentActiveInterval);
      clearInterval(this.boardShuffleInterval);
      this.shuffling = false;

      try {
        await MatchService.handleResults(resultBox.value, resultBox.free_spin);
        resultBox.value < 0 ? sadSound.play() : happySound.play();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  },
  async created() {
    try {
      this.socket.on("pressYourLuck", data => {
        const { action } = data;
        if (action === "start") {
          const { spins } = data;
          this.match.pressYourLuck.teams[
            this.match.pressYourLuck.activeTeam
          ].spins = spins;
          this.play();
        }
        if (action == "stop") {
          if (this.shuffling) {
            this.endInterval();
          }
        }
        if (action === "generalUpdate") {
          const { pressYourLuck } = data;
          this.match.pressYourLuck = pressYourLuck;
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
};
</script>

<style scoped>
.board {
  width: 800px;
  height: 666.6666666666666px;
  margin: 1rem auto 4rem auto;
  display: grid;
  grid-template-areas:
    "box1 box2 box3 box4 box5 box6"
    "box7 logo logo logo logo box8"
    "box9 logo logo logo logo box10"
    "box11 logo logo logo logo box12"
    "box13 box14 box15 box16 box17 box18";
  grid-template-columns: repeat(6, 1fr);
}

.logo {
  grid-area: logo;
  background: url("../../assets/press-your-luck-logo.png");
  background-size: cover;
}

.box {
  margin: 10px;
  background-size: 4.8 4.8 !important;
  background-repeat: no-repeat;
  border-radius: 1em;
  border: 0.2em solid #00000000;
  /*margin: .5em;*/
  text-align: center;
  box-sizing: border-box;
}

.active {
  border: 0.5em solid gold;
  box-shadow: 5px 5px 15px gold;
}

.box1 {
  grid-area: box1;
}
.box2 {
  grid-area: box2;
}
.box3 {
  grid-area: box3;
}
.box4 {
  grid-area: box4;
}
.box5 {
  grid-area: box5;
}
.box6 {
  grid-area: box6;
}
.box7 {
  grid-area: box7;
}
.box8 {
  grid-area: box8;
}
.box9 {
  grid-area: box9;
}
.box10 {
  grid-area: box10;
}
.box11 {
  grid-area: box11;
}
.box12 {
  grid-area: box12;
}
.box13 {
  grid-area: box13;
}
.box14 {
  grid-area: box14;
}
.box15 {
  grid-area: box15;
}
.box16 {
  grid-area: box16;
}
.box17 {
  grid-area: box17;
}
.box18 {
  grid-area: box18;
}
</style>