import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBPtSx5flo66H1I_9X1wsq0o4ztYj1PCK0",
  authDomain: "master-quiz-77bf3.firebaseapp.com",
  databaseURL: "https://master-quiz-77bf3.firebaseio.com",
  projectId: "master-quiz-77bf3",
  storageBucket: "master-quiz-77bf3.appspot.com",
  messagingSenderId: "302679354516",
  appId: "1:302679354516:web:c77696759a9ac3813b5881",
  measurementId: "G-86K01J5FSM"
};
  // Initialize Firebase
export const base = firebase.initializeApp(firebaseConfig);
export const database = firebase.database();

export const rootCourses = database.ref('/courses');
