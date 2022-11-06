import { Modal, Button, Form } from 'react-bootstrap'
import { useEffect, useReducer } from 'react';
import { ModalProps, FormEvent, Action } from '../types';
import { db } from '../config'
import { doc, setDoc } from "firebase/firestore";

const formReducer = (state: ModalProps['payment'], action: Action) => {
    return {
        ...state,
        [action.name]: action.value
    }
}

const EditModal = (props: ModalProps) => {

    const [formData, setFormData] = useReducer(formReducer, props.payment)

    useEffect(() => {
        let entry: keyof ModalProps['payment']

        for (entry in props.payment) {
            setFormData({name: entry, value: props.payment[entry]})
        }

    }, [props.payment])

    const handleUpdate = async () => {
        const docRef = doc(db, 'payments', props.payment.id)
        await setDoc(docRef, formData)
        props.handleClose()
    }

    const handleChange = (e: FormEvent) => {
        setFormData({
            name: e.target.name,
            value: e.target.value,
        })
    }

    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit "{props.payment.title}"
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            defaultValue={formData.title}
                            name="title"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            defaultValue={formData.price}
                            name="price"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" defaultValue={formData.category} onChange={handleChange}>
                            <option value="">Category...</option>
                            <option value="coffee">Coffee</option>
                            <option value="groceries">Groceries</option>
                            <option value="rent">Rent</option>
                            <option value="restaurants">Restaurants</option>
                            <option value="self-treat">Self treat</option>
                            <option value="monthly bills">Monthly bills</option>
                            <option value="unexpected">Unexpected expenses</option>
                            <option value="misc">Other</option>
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
                <Button variant="primary" onClick={() => handleUpdate()}>
                    Update infos
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal