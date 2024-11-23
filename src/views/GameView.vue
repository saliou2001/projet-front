<script>
import GameInput from "@/components/GameInput.vue";
import VirtualKeyBoard from "@/components/VirtualKeyBoard.vue";
import { mapGetters, mapMutations } from "vuex";
import ChronoGame from "@/components/ChronoGame.vue";
import ResultatView from "@/views/ResultatView.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "GameView",
  components: { ResultatView, ChronoGame, VirtualKeyBoard, GameInput },
  data() {
    return {
      word: "SALUT".split(""), // Mot cible
      letters: [], // Lettres saisies par le joueur
      correct: [], // Lettres bien placées
      misplaced: [], // Lettres mal placées
      currentIndex: 0, // Position actuelle dans la saisie
      tentative: 2, // Nombre de tentatives restantes
      timeUp: false, // Temps écoulé
      win: false, // État de victoire
      validity: false, // Validité du mot
      errorMessage: "", // Message d'erreur
    };
  },
  methods: {
    ...mapMutations(["setIndexWordTyping"]),
    updateInputValue({ index, value }) {
      if (index < this.word.length && value !== "🗑️") {
        this.letters[index] = value.toUpperCase();
        this.currentIndex = index + 1;
      }
    },
    deleteInputValue(index) {
      if (index > 0) {
        this.letters[index - 1] = "";
        this.currentIndex = index - 1;
      }
    },
    goLeft() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    goRight() {
      if (this.currentIndex < this.word.length) this.currentIndex++;
    },
    updateInputScreen(i, value) {
      this.letters[i] = value.toUpperCase();
    },
    check() {
      this.correct = [];
      this.misplaced = [];
      const usedInWord = Array(this.word.length).fill(false);
      const usedInLetters = Array(this.letters.length).fill(false);

      // Identifier les lettres bien placées
      for (let i = 0; i < this.letters.length; i++) {
        if (this.letters[i] === this.word[i]) {
          this.correct.push({ letter: this.letters[i], position: i });
          usedInWord[i] = true;
          usedInLetters[i] = true;
        }
      }

      // Identifier les lettres mal placées
      for (let i = 0; i < this.letters.length; i++) {
        if (!usedInLetters[i]) {
          for (let j = 0; j < this.word.length; j++) {
            if (!usedInWord[j] && this.letters[i] === this.word[j]) {
              this.misplaced.push({ letter: this.letters[i], position: i });
              usedInWord[j] = true;
              usedInLetters[i] = true;
              break;
            }
          }
        }
      }

      console.log("Correct:", this.correct);
      console.log("Misplaced:", this.misplaced);
    },
    async onCheckForEachInput() {
      await this.checkWordValid(this.letters.join(""));
      console.log(this.tentative)
      console.log('validity ' + this.validity)
      if (!this.validity) {
        this.errorMessage = "Invalid word! Please try again.";
        this.showSwalTime()
        console.log("Invalid word! Please try again.");
      }
      else{
        this.errorMessage = "";
        this.check();
      }

      if (this.correct.length === this.word.length && this.misplaced.length === 0) {
        this.win = true;
      } else if (this.tentative <= 0 || this.timeUp) {
        this.win = false;
      } else {
        this.tentative -= 1;
      }
    },
    timeEnd() {
      this.timeUp = true;
      this.onCheckForEachInput();
    },
    updateGame() {
     this.getWord();
      this.letters = Array(this.word.length).fill("");
      this.correct = [];
      this.misplaced = [];
      this.currentIndex = 0;
      this.tentative = 2;
      this.timeUp = false;
      this.win = false;
      this.errorMessage = ""; // Reset error message on game restart
    },
    async getWord() {
      try {
        const response = await axios.get("https://vue-project-backend-eta.vercel.app/api/new-game");
        this.word = response.data.word.toUpperCase().split("");
        console.log("Word fetched:", this.word.join(""));
        this.letters = Array(this.word.length).fill("");
        console.log("Word fetched:", this.word);
      } catch (error) {
        console.error("Error while fetching word:", error);
      }
    },
    async   checkWordValid(wordCheck) {
     const response = await axios
         .post("https://vue-project-backend-eta.vercel.app/api/check-word", {
           word: wordCheck.toLowerCase(),
         })
      this.validity = response.data.isWord;
      console.log("word " + wordCheck + " is " + this.validity)
    },
    showSwalTime(message){
      Swal.fire({
        title: 'Oops...',
        text: message,
        icon: 'error',
        timer: 1000,
        confirmButtonText: 'OK'
      });
    }
  },
  mounted() {
    this.letters = Array(this.word.length).fill("");
    // appel axios pour récupérer un mot
    this.getWord();
  },
  computed: {
    ...mapGetters(["getIndexWordTyping"]),
    nbWords() {
      return this.word.length;
    },
    endGame() {
      return this.tentative <= 0 || this.timeUp || this.win;
    },
    nbTentative() {
      return  this.tentative + " tentative" + (this.tentative > 1 ? "s" : "") + " restante" + (this.tentative > 1 ? "s" : "");
    },
  },
};
</script>

<template>
  <div id="gameview">
    <div v-if="!endGame">
      <div class="header mb-5 text-center">
        <h1>Guess Me!</h1>
      </div>
      <ChronoGame @timeIsUp="timeEnd" />
     <div class="bg-primary">
      Mot à déviner =  {{word.join("")}}
     </div>
      <div class="badge-tentative">
        <span class="badge bg-primary">{{nbTentative}}</span>
      </div>
      <div class="gameInput">
        <game-input
            v-for="(input, i) in letters"
            :key="i"
            :index="i"
            :nbWord="nbWords"
            @update:value="updateInputScreen"
            :currentIndex="currentIndex"
            :value="input"
            :class="{
            'bg-primary': correct.some(c => c.position === i),
            'bg-warning': misplaced.some(m => m.position === i),
            focus: currentIndex === i,
          }"
            @click="currentIndex = i"
        />
      </div>

      <div class="d-flex justify-content-center container">
        <div class="col-12">
          <VirtualKeyBoard
              @update:value="updateInputValue"
              :currentIndex="currentIndex"
              @delete:value="deleteInputValue"
              @goLeft="goLeft"
              @goRight="goRight"
          />
        </div>
      </div>

      <div class="my-2 text-center">
        <button
            @click="onCheckForEachInput"
            :disabled="letters.includes('')"
            class="btn btn-primary"
        >
          Check
        </button>
      </div>
    </div>

    <div v-else>
      <ResultatView
          :tentative="tentative"
          :win="win"
          :misplaced="misplaced"
          :correct="correct"
          @restart="updateGame"
      />
    </div>
  </div>
</template>


<style scoped>
/* Ensure the container takes full width */
.badge-tentative{
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  height: 2rem;
}
#gameview {
  width: 100%;
  padding: 10px;
}
.gameInput{
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 5px;
  flex-wrap: nowrap;
}
.header h1 {
  font-size: 2rem;
}

button {
  font-size: 1rem;
}
</style>

