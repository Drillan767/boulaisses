import { db } from "../config";
import { onSnapshot, getDocs, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import DeleteModale from './deleteModal'

type Payment = {
    title: string,
    id: string,
    category: string,
    price: string,
    date: string,
}

const list = () => {
    const [payments, setPayment] = useState([] as Payment[]);
    const [showModal, setShowModal] = useState(false);
    const [deletePayment, setDeletePayment] = useState({} as Payment)

    const handleDelete = (payment: Payment) => {
        handleShow()
        setDeletePayment(payment)
    }

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

    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

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
                            <th>Date</th>
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
                                    <td>{p.date}</td>
                                    <td>
                                        <button className="btn btn-secondary me-2" onClick={handleShow}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(p)}>
                                            Delete
                                        </button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                // graphs.
            </div>

            <DeleteModale
                payment={deletePayment}
                showModal={showModal}
                handleClose={handleClose}
            />
        </div>
    )
}

export default list
