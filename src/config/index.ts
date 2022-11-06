import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseUrl: import.meta.env.VITE_DB_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
    messagingSenderId: import.meta.env.VITE_MESSENGER_ID,
    appId: import.meta.env.VITE_APP_ID
}

const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

export { db }
