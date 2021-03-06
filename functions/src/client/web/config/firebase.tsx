import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: 'AIzaSyAfw0820cs80QQ_f6oGvjY6-0yL9HnZIqY',
  authDomain: 'tripleearplatform.firebaseapp.com',
  databaseURL: 'https://tripleearplatform.firebaseio.com',
  projectId: 'tripleearplatform',
  storageBucket: 'tripleearplatform.appspot.com',
  messagingSenderId: '613545864525',
  appId : '1:613545864525:web:dca8c4a691e270d5',
  measurementId: "G-QCSM8998JW"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if(typeof window !== 'undefined' && navigator.cookieEnabled){
      // @ts-ignore
      require("firebase/analytics")
      firebase.analytics(); 
    }
}

const db = firebase.firestore()

const getDirectURL = (path : string) => firebase.storage().ref(path).getDownloadURL()

export { db }
export { getDirectURL }
export default firebase
