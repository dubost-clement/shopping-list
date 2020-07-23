<template>
  <div class="h-screen bg-center bg-cover background">
    <div class="bg-gray-900 bg-opacity-75 h-screen flex justify-center items-center flex-col text-center text-white">
      <h1 class="text-6xl">shopping list</h1>
      <div>
        <router-link to="/connexion" class="p-3">Se connecter</router-link>
        <router-link to="/inscription" class="p-3">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
.background {
  background-image: url("../assets/images/food.jpg");
}
</style>
