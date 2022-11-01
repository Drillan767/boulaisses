import { db } from "../config";
import { doc, onSnapshot, getDocs, collection } from "firebase/firestore";
import { Pie } from 'react-chartjs-2';

type Payment = {
    title: string,
    id: string,
    category: string,
    price: string,
    month: string,
}

const payments = await getDocs(collection(db, 'payments'))
const paymentList: Payment[] = []

payments.forEach((p) => {
    const data = p.data()
    data.id = p.id

    if (data.title !== '') {
        paymentList.push(data as Payment)
    }
})

const listener = onSnapshot(collection(db, 'payments'), (data) => {
    data.forEach((d) => console.log(d.id, '=>', d.data()))
})

const list = () => {

    console.log(paymentList)



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
                                        <button>Edit</button>
                                        <button className="btn-primary">Delete</button>

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
