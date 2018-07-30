import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCv5PskVEXnR7FHNj0faz-wIOezT8OvW-I",
  authDomain: "ether-cube.firebaseapp.com",
  databaseURL: "https://ether-cube.firebaseio.com",
  projectId: "ether-cube",
  storageBucket: "ether-cube.appspot.com",
  messagingSenderId: "688509177020"
};

firebase.initializeApp(config);

export default firebase;

