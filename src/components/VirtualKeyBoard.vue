<template>
  <div class="keyboard-container my-4">
    <div class="keyboard-layout" >
      <!-- Afficher les touches en fonction du format choisi -->
      <div
          class="key"
          v-for="(key, index) in currentLayout"
          :key="index"
          @click="addToInput(key)"
          :class="{ 'bg-danger': key === '🗑️' }"
      >
        {{ key }}
      </div>
    </div>
    <button @click="toggleLayout" class="toggle-layout-button">
      Switch to {{ isAzerty ? 'QWERTY' : 'AZERTY' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentIndex: Number,
  },
  data() {
    return {
      isAzerty: true, // Par défaut, on commence avec le layout AZERTY
      azertyLayout: [
        "A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P",
        "Q", "S", "D", "F", "G", "H", "J", "K", "L", "M",
        "W", "X", "C", "V", "B", "N"
      ],
      // Layout QWERTY
      qwertyLayout: [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "M",
        "Z", "X", "C", "V", "B", "N"
      ],
    };
  },
  computed: {
    // Layout AZERTY ou QWERTY selon la valeur de isAzerty
    currentLayout() {
      return this.isAzerty ? this.azertyLayout : this.qwertyLayout;
    },
  },
  methods: {
    // Fonction pour ajouter la lettre au champ de texte
    addToInput(key) {
      if (key === "🗑️") {
        this.$emit("delete:value", this.currentIndex);
      }
      else if (key === "⬅️") {
        this.$emit("goLeft", this.currentIndex - 1);
      }
      else if (key === "➡️") {
        this.$emit("goRight", this.currentIndex + 1);
      }
      else {
        this.$emit("update:value", { index: this.currentIndex, value: key });
      }
    },
    // Fonction pour basculer entre les deux layouts
    toggleLayout() {
      this.isAzerty = !this.isAzerty;
    },
  },
};
</script>

<style scoped>
.keyboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  justify-content: center;
}

.keyboard-layout {
  display: grid;
  grid-template-columns: repeat(10, 2rem);
  grid-gap: 10px;
  margin-bottom: 15px;
  text-align: center;
  padding: 10px;
  border-radius: 5px;

}

.key {
  margin:10px 10px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  appearance: none;
  user-select: none;
  transition: width 0.2s, background-color 0.2s;
}

.key:hover {
  width: 2.5rem;
  background-color: #dcdcdc;
}

.input-box {
  width: 300px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.toggle-layout-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-layout-button:hover {
  background-color: #0056b3;
}
</style>
