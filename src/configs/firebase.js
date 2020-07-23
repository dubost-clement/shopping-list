import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnILiARixyNCa1-magNkLt4RBn1PLDWdY",
  authDomain: "dubost-web-creation.firebaseapp.com",
  databaseURL: "https://dubost-web-creation.firebaseio.com",
  projectId: "dubost-web-creation",
  storageBucket: "dubost-web-creation.appspot.com",
  messagingSenderId: "398776539776",
  appId: "1:398776539776:web:463112121b6a2825a4a465",
};

firebase.initializeApp(firebaseConfig);
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default firebase;
