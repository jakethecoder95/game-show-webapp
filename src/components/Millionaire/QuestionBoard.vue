<template>
  <div>
    <div class="question-box">{{ question.question }}</div>
    <div class="choices-list">
      <div
        v-for="(choice, i) in question.choices"
        v-bind:key="i"
        v-bind:class="'choice-box ' +  
            (userAnswer && choice === correctAnswer ? 'success ' : '') + 
            (userAnswer && userAnswer === choice && userAnswer !== correctAnswer ? 'incorrect': '') +
            (hiddenOptions.indexOf(choice) >= 0 ? 'hidden' : '')"
      >{{ String.fromCharCode(65 + i) + ") " + choice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionBoard",
  components: {},
  props: {
    question: Object,
    completed: Number,
    userAnswerIndex: Number,
    hiddenOptions: Array
  },
  data: function() {
    return {
      correctAnswer: "",
      userAnswer: ""
    };
  },
  methods: {
    initQuestion() {
      this.userAnswer = this.question.choices[this.userAnswerIndex];
      this.correctAnswer = this.question.answer;
    }
  },
  created() {
    this.initQuestion();
  },
  watch: {
    question: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initQuestion();
      }
    },
    userAnswerIndex: function(newVal) {
      this.userAnswer = this.question.choices[newVal];
    }
  }
};
</script>

<style scoped>
.question-box {
  height: 80px;
  width: 80%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(1, 1, 88);
  padding: 10px;
}
.choices-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: left;
}
.choice-box {
  min-height: 50px;
  padding-left: 15px;
  margin-bottom: 15px;
}
.success {
  color: green;
}
.incorrect {
  color: red;
}
.hidden {
  visibility: hidden;
}
</style>