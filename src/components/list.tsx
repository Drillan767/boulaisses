import { db } from "../config";
import { doc, onSnapshot, getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { Pie } from 'react-chartjs-2';

type Payment = {
    title: string,
    id: string,
    category: string,
    price: string,
    month: string,
}

const paymentList: Payment[] = []

onSnapshot(collection(db, 'payments'), (data) => addToList(data))

const addToList = (data: QuerySnapshot<DocumentData>) => {
    data.forEach((d) => {
        if (!paymentList.some((l) => l.id === d.id)) {
            const data = d.data()
            const payment = {
                id: d.id,
                ...data
            }
            paymentList.push(payment as Payment)
        }
    })
}

const list = () => {

    return (
        <div className="row">
            <div className="col-6">
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
                        {paymentList.map((p) => (
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
                
            </div>
            
        </div>
    )
}

export default list