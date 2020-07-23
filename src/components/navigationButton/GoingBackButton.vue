<template>
  <div class="flex justify-center">
    <div class="w-full max-w-5xl px-8 pt-6 pb-8 mb-4">
      <router-link
        :to="pathName"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Retour</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoingBackButton",

  props: {
    pathName: {
      required: true
    }
  }
};
</script>