<script>
export default {
  name: "MainView"
}
</script>

<template>
  <div>

    <!-- <router-link to="/help" class="btn btn-primary">Aide</router-link>
    <router-link to="/stat" class="btn btn-primary">Statistique</router-link>
    <router-link to="/shop" class="btn btn-primary">Magasin</router-link>-->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Lien vers "/game" -->
        <router-link
            to="/stat"
            class="btn btn-primary ms-2">
          Statistique
        </router-link>
        <router-link
            to="/shop"
            class="btn btn-primary ms-2">
          Magasin
        </router-link>
        <router-link
            to="/help"
            class="btn btn-primary ms-2">
          Aide
        </router-link>

      </div>
    </nav>
    <router-link
        to="/game"
        class="btn btn-primary ms-2">
      Jouer
    </router-link>



  </div>
</template>

<style scoped>

</style>