import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import useMonthsStore from '../../stores/months'
import { Timestamp } from 'firebase/firestore'
import type { MonthModal } from '../../types'

const AddMonth = (props: MonthModal) => {
    const [addMonth] = useMonthsStore((state) => [state.addMonth])
    const [monthValue, setMonthValue] = useState('')
    const [date, setDate] = useState('')

    const reset = () => {
        setDate('')
        setMonthValue('')
        props.handleClose()
    }

    const submit = () => {
        addMonth({
            value: monthValue,
            beginDate: Timestamp.fromDate(new Date(date))
        })

        reset()
    }

    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a new month
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setMonthValue(e.target.value)}
                            value={monthValue}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Beginning date</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => submit()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddMonth