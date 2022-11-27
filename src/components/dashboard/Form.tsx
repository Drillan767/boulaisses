import { Form, Button } from 'react-bootstrap' 
import { useEffect, useState, FormEvent } from 'react'
import useCategoryStore from '../../stores/categories'
import usePaymentStore from '../../stores/payments'

const PaymentForm = () => {
    const [categories, loadCategories] = useCategoryStore((state) => [state.categories, state.loadCategories])
    const [addPayment] = usePaymentStore((state) => [state.addPayment])

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (!categories.length) {
            loadCategories()
        }
    }, [])
 
    const resetForm = () => {
        setTitle('')
        setPrice('')
        setCategory('')
        setDate('')
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addPayment({title, price, category, date})
        resetForm()
    }

    return (
        <Form className="row gx-3 gy-2 align-items-center" onSubmit={submit}>
            <Form.Group className='col-sm-2'>
                <Form.Control
                    placeholder='Title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoFocus
                />
            </Form.Group>
            <Form.Group className='col-sm-2'>
                <Form.Control
                    placeholder='Price'
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className='col-sm-2'>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value={''}>Select a category...</option>
                    {
                        categories.map((c) => (
                            <option value={c.internal} key={c.internal}>{c.title}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-sm-2'>
                <Form.Control
                    placeholder='Date'
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>

            <div className='col-auto'>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </div>
        </Form>
    )
}

export default PaymentForm