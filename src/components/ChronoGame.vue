<template>
  <div class="chrono container text-center">
    <div class="display-4 my-3">
      {{ formattedTime }}
    </div>
    <!-- Alerte quand le temps est écoulé -->
    <div v-if="time === 0" class="alert alert-info mt-4" >
      Temps écoulé !
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChronoGame',
  data() {
    return {
      totalTime: 60,     // Durée initiale du compte à rebours en secondes (1 minute)
      time: 360,          // Temps restant en secondes
      timer: null,       // Référence à l'intervalle du compte à rebours
      isActive: false,   // Indicateur si le chrono est actif
    };
  },
  computed: {
    // Formate le temps restant en mm:ss
    formattedTime() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
  watch: {
    // Arrête le compte à rebours si le temps est écoulé
    time(newTime) {
      if (newTime === 0) {
        this.stopCountdown();
        this.timeIsUp();
      }
    },
  },
  methods: {
    // Démarre le compte à rebours
    startCountdown() {
      if (!this.isActive && this.time > 0) {
        this.isActive = true;
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.time--;
          } else {
            this.stopCountdown();
          }
        }, 1000);
      }
    },
    // Arrête le compte à rebours
    stopCountdown() {
      clearInterval(this.timer);
      this.isActive = false;
    },
    // emit when time is up
    timeIsUp() {
      this.$emit('timeIsUp');
    },
    // Réinitialise le compte à rebours
    resetCountdown() {
      this.stopCountdown();
      this.time = this.totalTime;
    },
  },
  mounted() {
    // Démarrer le compte à rebours lors du montage du composant
    this.startCountdown();
  },
  destroyed() {
    // Nettoyer l'intervalle si le composant est détruit
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.chrono {
  max-width: 400px;
  margin: 0 auto;
}

.display-4 {
  font-size: 3rem;
  font-weight: bold;
}

button {
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;
  margin-top: 10px;
}

.alert {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
