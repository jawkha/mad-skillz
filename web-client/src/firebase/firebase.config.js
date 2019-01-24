import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyAiDl7Jp6U3ad1zzEHxofvMC8rOAQYYjOw',
  authDomain: 'mad-skillz-1839c.firebaseapp.com',
  databaseURL: 'https://mad-skillz-1839c.firebaseio.com',
  projectId: 'mad-skillz-1839c',
  storageBucket: 'mad-skillz-1839c.appspot.com',
  messagingSenderId: '523752675168'
}
firebase.initializeApp(config)

if (process.env.NODE_ENV === 'development') {
  window.firebase = firebase // this is just for debugging purposes in browser console and should not be shipped in a production version.
}

export const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export const auth = firebase.auth()
export const storage = firebase.storage()

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)
export const signOut = () => auth.signOut()

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('file: firebase.js', 'Error creating a new user', error)
    }
  }
  return getUserDocument(user.uid)
}

export const getUserDocument = async uid => {
  if (!uid) return null
  try {
    const userDocument = await firestore
      .collection('users')
      .doc(uid)
      .get()
    return { uid, ...userDocument.data() }
  } catch (error) {
    console.log('Error fetching user', error)
  }
}
