import { useState } from "react";
import { Payment, PaymentsProps } from "../types";
import DeleteModale from './deleteModal'
import EditModale from './editModal'

const list = ({ payments }: PaymentsProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePayment, setDeletePayment] = useState({} as Payment)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editPayment, setEditPayment] = useState({} as Payment)

    const handleDelete = (payment: Payment) => {
        setShowDeleteModal(true)
        setDeletePayment(payment)
    }

    const handleEdit = (payment: Payment) => {
        setShowEditModal(true)
        setEditPayment(payment)
    }

    return (
        <div className="row">
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
                                    <button className="btn btn-secondary me-2" onClick={() => handleEdit(p)}>
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

            <DeleteModale
                payment={deletePayment}
                showModal={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
            />

            <EditModale
                payment={editPayment}
                showModal={showEditModal}
                handleClose={() => setShowEditModal(false)}
            />
        </div>
    )
}

export default list
