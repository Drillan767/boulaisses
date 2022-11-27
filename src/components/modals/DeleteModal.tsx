import { Modal, Button } from 'react-bootstrap'
import usePaymentStore from '../../stores/payments'
import type { ModalProps } from '../../types'

const deleteModal = (props: ModalProps) => {

    const [deletePayment] = usePaymentStore((state) => [state.deletePayment])

    const handleDelete = () => {
        deletePayment(props.payment.id)
        props.handleClose()
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

export default deleteModal