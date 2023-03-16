// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore , collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAVc1xLrT6JJaxDm7eC59VzpJscKe0mq5g",
    authDomain: "simondice-game.firebaseapp.com",
    projectId: "simondice-game",
    storageBucket: "simondice-game.appspot.com",
    messagingSenderId: "116708354015",
    appId: "1:116708354015:web:5eda4cd0cfa8962282066a"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export {collection,addDoc} // for firestore