import { useState } from "react";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from './config'

const auth = getAuth(firebase)

function App() {
    const [isLoggedIn, setAuth] = useState(false)

    onAuthStateChanged(auth, (user) => {
        setAuth(user !== null)
    })

    return (
        <>
            {
            isLoggedIn
                ? <Dashboard />
                : <Login />
            }
        </>
    )
}

export default App
