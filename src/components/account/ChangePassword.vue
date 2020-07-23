<template>
  <div class="mt-12 flex justify-center">
    <form
      @submit.prevent="submitForm"
      class="w-full max-w-5xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 class="text-center mb-8">Changer mon mot de passe</h2>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Mot de passe actuel</label>
        <input
          v-model="actualPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="actualPassword"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >Nouveau mot de passe</label>
        <input
          v-model="newPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >Répéter mot de passe</label>
        <input
          v-model="repeatPassword"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="repeatPassword"
          type="password"
          placeholder="Mot de passe"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Confirmer</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "../../configs/firebase";
import Swal from "sweetalert2";

export default {
  name: "ChangePassword",

  data: () => {
    return {
      actualPassword: "",
      newPassword: "",
      repeatPassword: "",
      error: null
    };
  },

  methods: {
    submitForm() {
      const user = firebase.auth().currentUser;
      if (this.newPassword === this.repeatPassword) {
        console.log(user);
        user
          .updatePassword(this.newPassword)
          .then(() => {
            Swal.fire({
              title: "Votre mot de passe a été changé avec succès",
              icon: "success",
              timer: 2000
            });
          })
          .catch(error => {
            if (error.code === "auth/requires-recent-login") {
              //Voir pour reconnecter l'utilisateur afin de changer le mot de passe
              console.log("besoin de se reco");
            }
            console.log(error);
          });
      } else {
        this.error = "Les mots de passe doivent être identique";
        console.log(this.error);
      }
    }
  }
};
</script>