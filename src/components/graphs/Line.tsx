import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'
import usePaymentStore from '../../stores/payments';
import { Payment } from '../../types'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

const LineChart = () => {
    const [payments] = usePaymentStore((state) => [state.payments])

    const options = {
        scales: {
            x: {
                stacked: true,
                min: '2022-10-01',
            },
            y: {
                stacked: true,
            }
        }
    }

    const lineData = () => {
        const data: { x: string, y: number }[] = []

        // Group by date.
        const byDate = payments.reduce((acc, curr) => {
            (acc[curr['date']] = acc[curr['date']] || []).push(curr)
            return acc
        }, {} as { [key: string]: Payment[] })

        // Reorder dates.
        const orderedDate = Object.keys(byDate).sort().reduce((obj, key) => {
            obj[key] = byDate[key]
            return obj
        }, {} as { [key: string]: Payment[] })

        data.push({ x: '22-10-01', y: 2200 })

        for (const date in orderedDate) {
            const [{ y: lastItem }] = data.slice(-1) || 0
            const test = orderedDate[date].reduce((acc, curr) => {
                acc -= parseFloat(curr.price)
                return acc
            }, lastItem)

            data.push({
                x: date,
                y: test,
            })
        }

        return {
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data,
                }
            ]
        }

    }

    return (
        <Line
            data={lineData()}
            options={options}
        />
    )
}

export default LineChart