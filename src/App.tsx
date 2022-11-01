import { useState } from 'react'
import Form from './components/form'
import List from './components/list'
import { firebase } from './config'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();

function App() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInWithPopup(auth, provider)
        }
    })
    return (
        <div className="App">
            <h1 className='u-center'>
                DÉPENSES DU MOIS DE SEPTEMBRE
            </h1>
            <Form />
            <List />
        
    
        </div>
    )
}

export default App
