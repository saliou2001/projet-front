<script>
export default{
  name: "ReturnHome",
};
</script>

<template>
  <router-link
      to="/"
      class="bouton">
    Retour
  </router-link>


</template>

<style scoped>
.bouton{
  background-image : url("/favicon.ico");
}
</style>