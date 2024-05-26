
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Firestore modülünü içe aktarın
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAzfMHXkF19FvvU1dsa3lr3V2OtymOEMJY",
  authDomain: "login-644a8.firebaseapp.com",
  projectId: "login-644a8",
  storageBucket: "login-644a8.appspot.com",
  messagingSenderId: "302956052006",
  appId: "1:302956052006:web:b253d99286ef8eeff570e7"
};
// Initialize Firebase
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const firestore = firebase.firestore(); // Firestore'u başlatın ve firestore değişkenine atayın
const firebasedegisken = firebase.firestore;
export { auth, firestore, firebasedegisken }; // auth ve firestore'u dışa aktarın