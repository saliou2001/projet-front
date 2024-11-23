<script>
export default {
  name: "GameInput",
  props: {
    index: Number,
    nbWord: Number,
    correct: Array,
    misplaced: Array,
  },
  data() {
    return {
      letter: "",
    };
  },
  methods: {

  },
  watch: {
    letter() {
      this.letter = this.letter.toUpperCase();
    },
  },
}
</script>

<template>
  <input
      type="text"
      class="form-control"
      v-model="letter"
      maxlength="1"
  @input.prevent="null"
  >
</template>

<style scoped>
input {
  width: 3rem;
  text-align: center;
  margin: 0 5px;
  font-size: 1.5em;
  text-transform: uppercase;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  caret-color: transparent;
  cursor: pointer;
}
</style>
