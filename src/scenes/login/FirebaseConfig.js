//WARNING: DONT SIMPLY MODIFY THIS FILE

// import * as firebase from "firebase";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD46EBpiM2HNqXnfzjC5OqvPX06ygmg380",
  authDomain: "reactnative-restaurantapp.firebaseapp.com",
  projectId: "reactnative-restaurantapp",
  storageBucket: "reactnative-restaurantapp.appspot.com",
  messagingSenderId: "223149599788",
  appId: "1:223149599788:web:9c51bdad742e0b04963589",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

firebase.initializeApp(firebaseConfig);

export default firebase;
