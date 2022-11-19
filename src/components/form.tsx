import React, { useReducer, useState } from 'react'
import { db } from '../config'
import { addDoc, collection } from 'firebase/firestore'

type FormData = {
    title: string,
    price: string,
    category: string,
    date: string,
    reset?: boolean
}

type Reducer = {
    name: string,
    value: string,
    refresh?: boolean,
}

const initialPayload: FormData = {
    title: '',
    price: '',
    category: '',
    date: '',
}

const formReducer = (state: FormData, event: Reducer) => {
    if (event.refresh) {
        return {
            title: '',
            price: '',
            category: '',
            date: ''
        }
    } 
    
    return {
        ...state,
        [event.name]: event.value
    }
}

const form = () => {
    const [formData, setFormData] = useReducer(formReducer, initialPayload)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await addDoc(collection(db, 'payments'), formData)

        setFormData({
            name: '',
            value: '',
            refresh: true,
        })
    }

    const handleChange = (e: { target: { name: string, value: string }}) => {
        setFormData({
            name: e.target.name,
            value: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
            <div className="col-sm-2">
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />       
            </div>

            <div className="col-sm-2">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <div className="input-group-text">€</div>
                </div>
            </div>

            <div className="col-sm-2">
                <input
                    type="date"
                    name="date"
                    className="form-control"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />       
            </div>

            <div className="col-sm-2">
                <select onChange={handleChange} name="category" className="form-select" value={formData.category} required>
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

            <div className="col-auto">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default form
