import React, { useReducer, useState } from 'react'
import { db } from '../config'
import { addDoc, collection } from 'firebase/firestore'

type FormData = {
    title: string,
    price: string,
    category: string,
    month: string,
};

const initialPayload: FormData = {
    title: '',
    price: '',
    category: '',
    month: '',
}

const formReducer = (state: FormData, event: {name: string, value: string}) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const form = () => {

    const [formData, setFormData] = useReducer(formReducer, initialPayload)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)

        const date = new Date()
        formData.month = date.toLocaleDateString('default', {month: 'long'})

        await addDoc(collection(db, 'payments'), formData)
    }

    const handleChange = (e: { target: { name: string, value: string }}) => {
        setFormData({
            name: e.target.name,
            value: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
             <div className="row">
                    <div className="col-3 input-control">
                        <label>Title</label>
                        <input type="text" name="title" required onChange={handleChange} />
                    </div>

                    <div className="col-3 input-control">
                        <label>Price</label>
                        <input type="text" required name="price" onChange={handleChange} />
                    </div>

                    <div className="col-3 input-control">
                        <label>Category</label>
                        <select onChange={handleChange} name="category" required>
                            <option value="">Category...</option>
                            <option value="coffee">Coffee</option>
                            <option value="groceries">Groceries</option>
                            <option value="rent">Rent</option>
                            <option value="restaurants">Restaurants</option>
                            <option value="self-treat">Self treat</option>
                            <option value="monthly bills">Monthly bills</option>
                            <option value="unexpected">Unexpected expenses</option>
                            <option value="misc">Other</option>
                        </select>
                    </div>

                    <div className="col-3 u-flex u-justify-center u-items-flex-end">
                        <div>
                            <button className="btn-primary" type="submit">Save</button>
                        </div>
                    </div>

                </div>
        </form>
    )
}

export default form
