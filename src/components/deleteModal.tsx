import { db } from '../config'
import { doc, deleteDoc } from "firebase/firestore";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

type Props = {
    payment: {
        title: string,
        id: string,
        category: string,
        price: string,
        date: string,
    }
    showModal: boolean
    handleClose: () => void
}

const deleteModale = (props: Props) => {

    const handleDelete = async () => {
        triggerDelete()
        .then(() => props.handleClose())
    }

    const triggerDelete = async () => {
        await deleteDoc(doc(db, 'payments', props.payment.id))
    }

    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm the suppression of "{props.payment.title}"
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    This will delete the related collection, and cannot be undone. Confirm?
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => handleDelete()}>
                    Delete payment
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default deleteModale