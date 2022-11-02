import { db } from "../config";
import { onSnapshot, getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";

type Payment = {
    title: string,
    id: string,
    category: string,
    price: string,
    month: string,
}

const list = () => {
    const [payments, setPayment] = useState([] as Payment[]);

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

    useEffect(() => {
        getPayments()
    }, [])

    onSnapshot(collection(db, 'payments'), (data) => {
        addToList(data)
    })

    return (
        <div className="row">
            <div className="col-6">
                <p>Nombre d'éléments à afficher :  {payments.length}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p) => (
                            <tr key={p.id}>
                                <td>{p.title}</td>
                                    <td>{p.price} €</td>
                                    <td>
                                        <span className="tag">{p.category}</span>
                                    </td>
                                    <td>
                                        <button className="btn--sm">Edit</button>
                                        <button className="btn-primary btn--sm">Delete</button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                // graphs.
            </div>

        </div>
    )
}

export default list
