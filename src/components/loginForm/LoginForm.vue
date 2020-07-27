<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-xs">
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
          <input
            v-model="userCredentials.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Votre email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe</label>
          <input
            v-model="userCredentials.password"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Votre mot de passe"
          />
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Se connecter</button>
          <router-link
            to="/inscription"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >S'inscrire</router-link>
        </div>
        <button @click="sendResetPassword" type="button">mot de passe oublié ?</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "../../configs/firebase";
import Swal from "sweetalert2";

export default {
  name: "LoginForm",

  data: () => {
    return {
      userCredentials: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    submitForm() {
      this.$store.dispatch("logIn", this.userCredentials);
    },

    async sendResetPassword() {
      const { value: email } = await Swal.fire({
        title: "Rénitialiser mon mot de passe",
        input: "email",
        inputPlaceholder: "Entrer votre adresse email",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        }
      });

      //Si un email a été rentré
      if (email) {
        try {
          await firebase.auth().sendPasswordResetEmail(email);

          Swal.fire({
            title: `Un email pour rénitialiser votre mot de passe a été envoyé à ${email}`,
            icon: "success",
            timer: 2000
          });
        } catch (error) {
          //Mauvaise adresse email
          console.log(error);
          if (error.code === "auth/user-not-found") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Aucun utilisateur ne correspond à cette adresse email"
            });
          }
        }
      }
    }
  }
};
</script>
