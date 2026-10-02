import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD8ylCraFQUrOxUqwPQo7i-z87LYasEr7M',
  authDomain: 'tk-mart-11943.firebaseapp.com',
  projectId: 'tk-mart-11943',
  storageBucket: 'tk-mart-11943.firebasestorage.app',
  messagingSenderId: '801085896565',
  appId: '1:801085896565:web:38a2144cc07eae9540053c',
  measurementId: 'G-LCQLR2W6JV'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
