import useMonthsStore from '../../stores/months'
import { ChangeEvent, useEffect, useState } from 'react'
import AddMonth from './AddMonth'

const MonthSelect = () => {

    const [
        currentMonth,
        months,
        changeMonth,
        loadMonths,
    ] = useMonthsStore((state) => [
        state.currentMonth,
        state.months,
        state.changeMonth,
        state.loadMonths,
    ])

    const [showModal, setSHowModal] = useState(false)

    useEffect(() => {
        if (!months.length) {
            loadMonths()
        }
    }, [])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => changeMonth(e.target.value)

    return (
        <>
            <div className="col-sm-2">
                <select className='form-control' onChange={handleChange} value={currentMonth.id}>
                    {
                        months.map((month, i) => (
                            <option key={i} value={month.id}>{month.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col-sm-2"> 
                <button onClick={() => setSHowModal(true)} className='btn btn-primary'>
                    Add month
                </button>
            </div>

            <AddMonth
                showModal={showModal}
                handleClose={() => setSHowModal(false)}
            />
        </>
    )
}

export default MonthSelect