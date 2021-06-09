import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCp9NYMgTpEyxIJspZ7jghPnpy8eGqQOE4",
    authDomain: "advance-wala-react.firebaseapp.com",
    projectId: "advance-wala-react",
    storageBucket: "advance-wala-react.appspot.com",
    messagingSenderId: "626579921671",
    appId: "1:626579921671:web:e09025c5904681a50603a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;