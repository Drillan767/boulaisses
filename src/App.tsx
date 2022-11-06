import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { onSnapshot, getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { Payment } from './types';
import { db } from './config'
import Form from './components/form'
import List from './components/list'
import Graph from './components/graph'

const provider = new GoogleAuthProvider();
const auth = getAuth()

function App() {
    const [payments, setPayment] = useState([] as Payment[]);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInWithRedirect(auth, provider)
        }
    })

    const addToList = (data: QuerySnapshot<DocumentData>) => {
        data.forEach((payment) => {
            if (!payments.some((p) => p.id === payment.id)) {
                const p = {
                    id: payment.id,
                    ...payment.data()
                }

                setPayment([...payments, p as Payment])
            }
        })
    }

    const getPayments = async () => {
        const data = await getDocs(collection(db, 'payments'))
        addToList(data)
    }

    onSnapshot(collection(db, 'payments'), (data) => {
        addToList(data)
    })

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <div className="container-fluid">
            <h1 className='u-center'>
                DÉPENSES DU MOIS DE SEPTEMBRE
            </h1>
            <Form />
            <div className="row mt-5">
                <div className="col-6">
                    <List payments={payments} />
                </div>
                <div className="col-6">
                    <Graph payments={payments} />
                </div>
            </div>
            
        </div>
    )
}

export default App
