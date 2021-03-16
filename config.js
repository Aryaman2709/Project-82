import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyA1wYrvj7KNpneroiHVwg_4Cp5XLh8fyjo",
    authDomain: "barter-f5fc3.firebaseapp.com",
    databaseURL: "https://barter-f5fc3-default-rtdb.firebaseio.com",
    projectId: "barter-f5fc3",
    storageBucket: "barter-f5fc3.appspot.com",
    messagingSenderId: "142859018324",
    appId: "1:142859018324:web:90fdb201a4465875100dc1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase.firestore();
