import firebase from "../../configs/firebase";
import router from "../../router/index";

export default {
  state: {
    isLoggedIn: false,
    actualUser: null,
    error: null,
  },

  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    actualUser: (state) => state.actualUser,
  },

  mutations: {
    logInSuccess(state, user) {
      state.isLoggedIn = true;
      state.actualUser = user;
      state.error = null;
    },

    logInError(state, error) {
      state.error = error;
    },

    logOutSuccess(state) {
      state.isLoggedIn = false;
      state.actualUser = null;
    },
  },

  actions: {
    async logIn(context, userCredentials) {
      const { email, password } = userCredentials;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        await firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit("logInSuccess", user);
            router.push("/dashboard");
          }
        });
      } catch (error) {
        const { code, message } = error;
        console.log(code, message);
        context.commit("logInError", error);
      }
    },

    alreadyLoggedIn(context) {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            context.commit("logInSuccess", user);
            console.log(user);
            resolve();
          }
        });
      });
    },

    logOut(context) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("logOutSuccess");
          router.push("/");
        });
    },
  },
};
