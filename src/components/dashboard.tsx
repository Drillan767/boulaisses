import { useState } from "react";
import { onSnapshot, getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { Payment } from '../types';
import { db, firebase } from '../config'
import Form from './form'
import List from './list'
import Graph from './graph'

const Dashboard = () => {
    const [payments, setPayment] = useState([] as Payment[])

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

    onSnapshot(collection(db, 'payments'), (data) => {
        addToList(data)
    })

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

export default Dashboard