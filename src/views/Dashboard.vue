<template>
  <fragment>
    <Navigation />
    <div class="container mx-auto px-4">
      <div class="flex justify-center items-center flex-col">
        <AddItem @add="addProduct" />
        <Item @delete="deleteProduct" :products="products" />
      </div>
    </div>
  </fragment>
</template>

<script>
import Navigation from "../components/navigation/Navigation";
import AddItem from "../components/item/AddItem";
import Item from "../components/item/Item";
import { mapGetters } from "vuex";
import firebase from "../configs/firebase";

export default {
  name: "Dashboard",

  components: {
    Navigation,
    AddItem,
    Item
  },

  data: () => {
    return {
      products: []
    };
  },

  created() {
    //Voir pour améliorer la récupération du user id
    console.log(firebase.auth().currentUser.uid);
  },

  mounted() {
    this.$store.dispatch("alreadyLoggedIn").then(() => {
      this.getProducts();
    });
  },

  methods: {
    addProduct() {
      //update la liste des produit pour la distribuer a item
      this.getProducts();
    },

    getProducts() {
      const products = [];
      firebase
        .firestore()
        .collection("list")
        //.orderBy("createdAt", "desc")
        .where("author", "==", this.actualUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            products.push({
              key: doc.id,
              data: doc.data()
            });
          });
        });
      this.products = products;
    },

    async deleteProduct(productId) {
      await firebase
        .firestore()
        .collection("list")
        .doc(productId)
        .delete();
      this.getProducts();
    }
  },

  computed: {
    ...mapGetters(["actualUser"])
  }
};
</script>
