<template>
  <div v-if="phrases.length > 0" class="wheel-of-blessings">
    <div v-if="phrasesPlayed < phrases.length">
      <h2>Catagory: {{ phrases[phrasesPlayed].catagory }}</h2>
      <div class="letter-list">
        <div v-for="(letter, i) in oranizeLetters()" v-bind:key="i">
          <div v-if="letter === ' '" class="space"></div>
          <div v-if="letter !== ' '">
            <Letter
              v-bind:letter="letter"
              v-bind:showLetter="guessed.findIndex(l => l.toLowerCase() === letter.toLowerCase()) > -1"
            />
          </div>
        </div>
      </div>
      <h2
        v-if="guessed.length > 0"
      >{{ guessed[guessed.length - 1] }}: {{ getLetterOccurrences(guessed[guessed.length -1]) }}</h2>
    </div>
    <div v-else>
      <h1 class="game-over-alert">Game Over</h1>
    </div>
  </div>
</template>

<script>
import openSocket from "socket.io-client";
import Letter from "./Letter";

export default {
  name: "LetterList",
  components: {
    Letter
  },
  props: {
    wheelOfBlessings: Object
  },
  data: function() {
    return {
      phrases: [],
      phrasesPlayed: 0,
      words: [],
      guessed: []
    };
  },
  methods: {
    oranizeLetters() {
      const maxLength = 11,
        words = this.phrases[this.phrasesPlayed].phrase.split(" ");
      let charCount = 0,
        newString = "";
      words.forEach((word, i) => {
        word = word.split("");
        word.forEach(letter => {
          newString += letter;
          charCount++;
        });
        if (i !== words.length - 1) {
          const spacesRemaining = maxLength - charCount;
          const nextWordCnt = words[i + 1].length;
          if (nextWordCnt + 1 > spacesRemaining) {
            for (let j = 0; j < spacesRemaining; j++) {
              newString += " ";
              charCount++;
            }
          } else {
            newString += " ";
            charCount++;
          }
          if (charCount >= 11) {
            charCount = 0;
          }
        }
      });
      return newString;
    },
    getLetterOccurrences(letter) {
      const phraseArr = this.phrases[this.phrasesPlayed].phrase.split("");
      return phraseArr.reduce((cnt, l) => cnt + (l === letter), 0);
    }
  },
  async created() {
    try {
      this.phrases = this.wheelOfBlessings.phrases;
      this.phrasesPlayed = this.wheelOfBlessings.phrasesPlayed;
      this.guessed = this.wheelOfBlessings.guessedLetters;
      const socket = openSocket("https://game-show.herokuapp.com");
      // const socket = openSocket("http://localhost:8000");
      socket.on("wheelOfBlessings", data => {
        const { action } = data;
        if (action === "addPhrase") {
          const { newPhrase } = data;
          this.phrases.push(newPhrase);
        }
        if (action === "addLetter") {
          const { newLetter } = data;
          this.guessed.push(newLetter);
        }
        if (action === "nextPhrase") {
          this.guessed = [];
          this.phrasesPlayed++;
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
.wheel-of-blessings {
  min-height: 500px;
  margin-bottom: 100px;
}
.letter-list {
  display: grid;
  width: 70%;
  margin: 0 15%;
  grid-template-columns: repeat(11, 1fr);
  grid-gap: 10px;
}
.game-over-alert {
  font-size: 6em;
  margin-bottom: 100px;
}
</style>