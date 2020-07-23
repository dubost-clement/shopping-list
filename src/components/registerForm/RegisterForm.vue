<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-xs">
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            v-model="$v.email.$model"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="text"
            placeholder="Votre email"
          />
          <p class="text-red-500 text-xs italic" v-if="!$v.email.email">Votre addresse email doit être valide</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe</label>
          <input
            v-model="$v.password.$model"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Votre mot de passe"
          />
          <p v-if="!$v.password.minLength" class="text-red-500 text-xs italic">
            Le mot de passe doit faire minimun 6 charactères
          </p>
          <p class="text-red-500 text-xs italic" v-if="!$v.password.required">Password is required.</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="repeat-password">Répéter mot de passe</label>
          <input
            v-model="$v.repeatPassword.$model"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="repeatPassword"
            type="password"
            placeholder="Votre mot de passe"
          />
          <p v-if="!$v.repeatPassword.sameAsPassword" class="text-red-500 text-xs italic">
            Les mots de passe doivent être identique
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            S'inscrire
          </button>

          <router-link to="/" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >Retour</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  name: "RegisterForm",

  data: () => {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  },

  methods: {
    submitForm() {
      //Inscription de l'utilisateur sur firebase
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        console.log("ok");
      }
    },
  },

  validations: {
    email: {
      required,
      email,
    },

    password: {
      required,
      minLength: minLength(6),
    },

    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>
