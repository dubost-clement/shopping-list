<template>
  <div class="mt-12 flex justify-center">
    <div class="w-full max-w-5xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-center mb-8 text-2xl">Supprimer mon compte</h2>
      <div class="flex items-center justify-between">
        <button
          @click="deleteAccount"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../../configs/firebase";
import Swal from "sweetalert2";

export default {
  name: "DeleteAccount",

  methods: {
    async deleteAccount() {
      const user = firebase.auth().currentUser;

      //Demande de confirmation avec le mot de passe
      const { value: password } = await Swal.fire({
        title: "Mot de passe",
        input: "password",
        inputPlaceholder: "Entrer votre mot de passe",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        }
      });

      //Si un password a été rentré
      if (password) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password
        );

        try {
          await user.reauthenticateWithCredential(credential);

          user.delete().then(() => {
            Swal.fire({
              title: "Votre compte a été supprimé !",
              icon: "success",
              timer: 2000
            });

            this.$router.push("/");
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
        }
      }
    }
  }
};
</script>