import { useEffect, useState } from 'react'
import useLoginStore from '../../stores/payments'
import useCategoryStore from '../../stores/categories'
import type { Payment } from '../../types'
import EditModal from '../modals/EditModal'
import DeleteModal from '../modals/DeleteModal'

const List = () => {
    const [payments, loadPayments] = useLoginStore((state) => [state.payments, state.loadPayments])
    const [categories] = useCategoryStore((state) => [state.categories])

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

    useEffect(() => {
        if (!payments.length) loadPayments()
    }, [])

    const findCategory = (internal: string) => categories.find((c) => c.internal === internal)?.title ?? 'N/A'

    return (
        <div>
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
                    {
                        payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.title}</td>
                                <td>{payment.price} €</td>
                                <td>{findCategory(payment.category)}</td>
                                <td>{payment.date}</td>
                                <td>
                                    <button className="btn btn-secondary me-2" onClick={() => handleEdit(payment)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(payment)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <EditModal 
                showModal={showEditModal}
                payment={editPayment}
                handleClose={() => setShowEditModal(false)}
            />
            <DeleteModal
                showModal={showDeleteModal}
                payment={deletePayment}
                handleClose={() => setShowDeleteModal(false)}
            />
        </div>
    )
}

export default List