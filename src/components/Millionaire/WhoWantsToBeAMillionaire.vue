<template>
  <div class="millionair-game-board">
    <div class="left-side">
      <div class="game-info-board">
        <GameInfoBoard
          v-bind:score="millionaireData.score"
          v-bind:timeLeft="timeLeft"
          v-bind:setTime="setTime"
          v-bind:timerRunning="timerRunning"
          v-bind:teamName="teamName"
          v-bind:helpOptionsUsed="helpOptionsUsed"
        />
      </div>
      <div class="question-board">
        <QuestionBoard
          v-bind:question="!skipOptionUsed 
            ? questions[millionaireData.completed][millionaireData.activeTeam] 
            : skipOptions[millionaireData.activeTeam]"
          v-bind:completed="millionaireData.activeTeam"
          v-bind:userAnswerIndex="userAnswer"
          v-bind:hiddenOptions="hiddenOptions"
        />
      </div>
    </div>
    <div class="score-list-board">
      <ScoreListBoard
        v-bind:values="millionaireData.values"
        v-bind:active="millionaireData.completed"
      />
    </div>
  </div>
</template>

<script>
import ScoreListBoard from "./ScoreListBoard";
import GameInfoBoard from "./GameInfoBoard";
import QuestionBoard from "./QuestionBoard";
import { questions, skipOptions } from "./gameData";

export default {
  name: "WhoWantsToBeAMillionaire",
  components: { ScoreListBoard, GameInfoBoard, QuestionBoard },
  props: {
    millionaireDataProp: Object,
    socket: Object,
    teamName: String
  },
  data: function() {
    return {
      millionaireData: {},
      timerRunning: false,
      userAnswer: -1,
      timeLeft: 60,
      setTime: time => {
        this.timeLeft = time;
      },
      helpOptionsUsed: [],
      hiddenOptions: [],
      questions: questions,
      skipOptions: skipOptions,
      skipOptionUsed: false,
      moreTimeOptionUsed: () => {
        this.setTime(this.timeLeft + 60);
      },
      fiftyFiftyOptionUsed: () => {
        const correctAnswer = !this.skipOptionUsed
          ? this.questions[this.millionaireData.completed][
              this.millionaireData.activeTeam
            ].answer
          : this.skipOptions[this.millionaireData.activeTeam].answer;
        const options = !this.skipOptionUsed
          ? this.questions[this.millionaireData.completed][
              this.millionaireData.activeTeam
            ].choices
          : this.skipOptions[this.millionaireData.activeTeam].choices;

        const optionsToRemove = [];
        options.forEach(option => {
          if (option !== correctAnswer && optionsToRemove.length < 2) {
            optionsToRemove.push(option);
          }
        });
        this.hiddenOptions = options.filter(
          option => optionsToRemove.indexOf(option) > -1
        );
      }
    };
  },
  async created() {
    this.millionaireData = this.millionaireDataProp;
    try {
      this.socket.on("millionaire", data => {
        const { action } = data;
        if (action === "nextQuestion") {
          this.millionaireData = data.millionaireData;
          this.timeLeft = 60;
          this.userAnswer = -1;
          this.hiddenOptions = [];
          this.skipOptionUsed = false;
        }
        if (action === "answerSubmitted") {
          this.userAnswer = parseInt(data.answer, 10);
        }
        if (action === "nextTeam") {
          this.teamName = data.teamName;
          this.millionaireData = data.millionaireData;
          this.timeLeft = 60;
          this.userAnswer = -1;
          this.timerRunning = false;
          this.hiddenOptions = [];
          this.helpOptionsUsed = [];
          this.skipOptionUsed = false;
        }
        if (action === "toggleTimer") {
          this.timerRunning = !this.timerRunning;
        }
        if (action === "helpOptionSelected") {
          this.helpOptionsUsed.push(data.option);
          switch (parseInt(data.option, 10)) {
            case 0:
              this.moreTimeOptionUsed();
              break;
            case 1:
              this.fiftyFiftyOptionUsed();
              break;
            case 2:
              this.skipOptionUsed = true;
          }
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
.millionair-game-board {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  width: 900px;
  margin: auto;
  margin-bottom: 4rem;
}
.left-side {
  display: grid;
  grid-template-rows: 1.5fr 1fr;
  grid-gap: 20px;
}
.game-info-board {
  background: navy;
}
.question-board {
  background: navy;
}
.score-list-board {
  background: navy;
}
</style>