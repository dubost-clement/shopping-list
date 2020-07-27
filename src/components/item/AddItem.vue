<template>
  <form @submit.prevent="submitForm" class="w-full max-w-5xl mt-12">
    <h1 class="text-center my-10 text-4xl">Ajouter vos produits</h1>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="product">Produit</label>
        <input
          v-model="product.name"
          value="{this.state.product}"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="product"
          placeholder="nom du produit"
          required
        />
      </div>
      <div class="w-full md:w-1/3 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="quantity"
          >quantité</label
        >
        <input
          v-model="product.quantity"
          type="number"
          name="quantity"
          min="1"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
      </div>

      <div class="w-full md:w-1/3 px-3">
        <div class="flex justify-end items-center h-full py-3 px-4 mb-3">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "../../configs/firebase";

export default {
  name: "AddItem",

  data: () => {
    return {
      product: {
        name: "",
        quantity: 1
      }
    };
  },

  methods: {
    async submitForm() {
      //Ajout du produit sur firebase
      await firebase
        .firestore()
        .collection("list")
        .add({
          name: this.product.name,
          quantity: this.product.quantity,
          author: this.actualUser.uid,
          createdAt: Date.now()
        });
      this.product.name = "";
      this.product.quantity = 1;
      this.$emit("add");
    }
  },

  computed: {
    ...mapGetters(["actualUser"])
  }
};
</script>
