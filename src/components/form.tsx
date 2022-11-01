import React, { useReducer, useState } from 'react'
import { db } from '../config'
import { addDoc, collection } from 'firebase/firestore'

const collectionId = '635fed3f1a5f1a8556e7'
const dbId = '635fed2c809e8b16f608'


const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const form = () => {

    const [formData, setFormData] = useReducer(formReducer, {})
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        
        await addDoc(collection(db, 'payments'), formData)
    }

    const handleChange = (e) => {
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
                        <select onChange={handleChange} name="category">
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

                {submitting &&
                <div>
                    Données sur le point d'être enregistrées :

                    <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>: {value.toString()}</li>
                        ))}
                    </ul>
                </div>
                }
        </form>
    )
}

export default form