<script>
export default {
  name: "ResultatView",
  props: {
    correct: {
      type: Array,
      required: true,
    },
    misplaced: {
      type: Array,
      required: true,
    },
    win: {
      type: Boolean,
      required: true,
    },
    tentative: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div id="resultat-view" class="text-center">
    <!-- Header -->
    <div class="header mb-5">
      <h1>Résultat</h1>
    </div>

    <!-- Résultat principal -->
    <div class="result my-4">
      <div v-if="win">
        <h2 class="text-success">🎉 Bravo, vous avez trouvé le mot !</h2>
      </div>
      <div v-else>
        <h2 class="text-danger">😢 Dommage, vous n'avez pas trouvé le mot !</h2>
      </div>
      <p>Il vous restait <strong>{{ tentative }}</strong> tentative(s).</p>
    </div>

    <!-- Résumé des lettres -->
    <div class="summary my-4">
      <h3>Lettres correctement placées :</h3>
      <ul v-if="correct.length > 0">
        <li v-for="(item, index) in correct" :key="index">
          Lettre : <strong>{{ item.letter }}</strong>, Position : <strong>{{ item.position }}</strong>
        </li>
      </ul>
      <p v-else>Aucune lettre correctement placée.</p>

      <h3>Lettres mal placées :</h3>
      <ul v-if="misplaced.length > 0">
        <li v-for="(item, index) in misplaced" :key="index">
          Lettre : <strong>{{ item.letter }}</strong>, Position : <strong>{{ item.position }}</strong>
        </li>
      </ul>
      <p v-else>Aucune lettre mal placée.</p>
    </div>

    <!-- Bouton de navigation -->
    <div class="actions my-4 d-flex space-around">
      <router-link to="/" class="btn btn-primary mx-2">Page principale</router-link>
      <button class="btn btn-secondary" @click="$emit('restart')">Recommencer</button>
    </div>
  </div>
</template>

<style scoped>
#resultat-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.header h1 {
  font-size: 2.5rem;
  color: #333;
}

.result h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.summary h3 {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #555;
}

.actions .btn {
  padding: 10px 20px;
  font-size: 1.2rem;
}
</style>
