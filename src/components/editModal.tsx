import { db } from '../config'
import { doc, setDoc } from "firebase/firestore";
import { Modal, Button, Form } from 'react-bootstrap'
import { useEffect, useReducer } from 'react';

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

const formReducer = (state: Props['payment'], action: {name: string, value: string}) => {
    return {
        ...state,
        [action.name]: action.value
    }
}

const EditModal = (props: Props) => {

    const [formData, setFormData] = useReducer(formReducer, props.payment)

    useEffect(() => {
        let entry: keyof Props['payment']

        for (entry in props.payment) {
            setFormData({name: entry, value: props.payment[entry]})
            
            if (entry === 'category') {
                console.log(props.payment[entry])
            }
        }

        setFormData({name: 'title', value: 'Titre assigné'})
    }, [props.payment])

    const handleUpdate = () => {
        console.log(formData)
    }

    const handleChange = (e: { target: { name: string, value: string }}) => {
        if (e.target.name === 'category') {
            console.log(e.target.value)
        }

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
                    Update info
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal