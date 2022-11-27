import {getAuth, onAuthStateChanged } from 'firebase/auth'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import useAuthStore from './stores/auth'
import { firebase } from './config'

const auth = getAuth(firebase)

function App() {
    const [isLoggedIn, setAuthStatus] = useAuthStore((state) => [state.isLoggedIn, state.setAuthStatus])

    onAuthStateChanged(auth, (user) => {
        if (user && isLoggedIn === false) {
            setAuthStatus(true)
        }
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
