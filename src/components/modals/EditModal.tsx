import { Modal, Button, Form } from 'react-bootstrap'
import { useReducer, useEffect } from 'react'
import usePaymentStore from '../../stores/payments'
import useCategoryStore from '../../stores/categories'
import type { ModalProps, Action } from '../../types'

const formReducer = (state: ModalProps['payment'], action: Action) => {
    return {
        ...state,
        [action.name]: action.value
    }
}

const editModal = (props: ModalProps) => {
    const [formData, setFormData] = useReducer(formReducer, props.payment)
    const [editPayment] = usePaymentStore((state) => [state.editPayment])
    const [categories] = useCategoryStore((state) => [state.categories])

    useEffect(() => {
        let entry: keyof ModalProps['payment']

        for (entry in props.payment) {
            setFormData({ name: entry, value: props.payment[entry] })
        }

    }, [props.payment])

    const handleChange = (e: { target: Action }) => {
        setFormData({
            name: e.target.name,
            value: e.target.value,
        })
    }

    const submit = () => {
        editPayment(formData)
        props.handleClose()
    }

    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit "{props.payment.title}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            defaultValue={formData.title}
                            name="title"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            defaultValue={formData.price}
                            name="price"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={formData.category} name="category" onChange={handleChange} required>
                            {
                                categories.map((c) => (
                                    <option value={c.internal} key={c.internal}>{c.title}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" defaultValue={formData.date} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => submit()}>
                    Update infos
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default editModal