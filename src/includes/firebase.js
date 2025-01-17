import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyDFc8geSRam2rDv-kXVgF2s19lQil_t-Kk',
  authDomain: 'music-fd17e.firebaseapp.com',
  projectId: 'music-fd17e',
  storageBucket: 'music-fd17e.appspot.com',
  messagingSenderId: '708557578232',
  appId: '1:708557578232:web:e86418a0ea36c2cad5000d',
  measurementId: 'G-RG88VG3T54'
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
db.enablePersistence().catch((error) => {
  console.log(`firebase persistence error ${error.code}`)
})
//  user in firestore db
const usersCollection = db.collection('users')
//  songs in firestore db
const songsCollection = db.collection('songs')
//  comments in firestore db
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, songsCollection, commentsCollection, storage }
