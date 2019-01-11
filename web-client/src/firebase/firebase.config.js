import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAiDl7Jp6U3ad1zzEHxofvMC8rOAQYYjOw',
  authDomain: 'mad-skillz-1839c.firebaseapp.com',
  databaseURL: 'https://mad-skillz-1839c.firebaseio.com',
  projectId: 'mad-skillz-1839c',
  storageBucket: 'mad-skillz-1839c.appspot.com',
  messagingSenderId: '523752675168'
}
firebase.initializeApp(config)

export const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
