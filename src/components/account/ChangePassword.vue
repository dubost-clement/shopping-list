<template>
  <div class="mt-12 flex justify-center">
    <form
      @submit.prevent="submitForm"
      class="w-full max-w-5xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 class="text-center mb-8">Changer mon mot de passe</h2>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >Nouveau mot de passe</label>
        <input
          v-model="newPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Mot de passe"
          required
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
          type="password"
          placeholder="Mot de passe"
          required
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
      newPassword: "",
      repeatPassword: "",
      error: null
    };
  },

  methods: {
    async submitForm() {
      //Récupération de l'utilisateur courant
      const user = firebase.auth().currentUser;

      //Demande de confirmation avec le mot de passe
      const { value: password } = await Swal.fire({
        title: "Mot de passe actuel",
        input: "password",
        inputPlaceholder: "Entrer votre mot de passe actuel",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        }
      });

      //Si un password a été rentré
      if (password) {
        if (this.newPassword === this.repeatPassword) {
          const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
          );

          try {
            await user.reauthenticateWithCredential(credential);
            user.updatePassword(this.newPassword).then(() => {
              Swal.fire({
                title: "Votre mot de passe a été changé avec succès",
                icon: "success",
                timer: 2000
              });

              this.actualPassword = "";
              this.newPassword = "";
              this.repeatPassword = "";
            });
          } catch (error) {
            //Mauvais mot de passe
            if (error.code === "auth/wrong-password") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Le mot de passe que vous avez entré est incorrect"
              });
            }
            console.log(error);
          }
        }
      }
    }
  }
};
</script>