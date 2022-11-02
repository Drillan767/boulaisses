import Form from './components/form'
import List from './components/list'
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function App() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInWithRedirect(auth, provider)
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
