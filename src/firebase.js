import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const configOptions = {
    apiKey: "AIzaSyCl4b5xk8SXi306GVFag28KkyvYOoAQK8s",
    authDomain: "androscrusade.firebaseapp.com",
    databaseURL: "https://androscrusade.firebaseio.com",
    projectId: "androscrusade",
    storageBucket: "",
    messagingSenderId: "webApp",
    appId: "1:764160676061:web:c950c6a84a08a48640cb34"
  };
  
  firebase.initializeApp(configOptions);

  
// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}