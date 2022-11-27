import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import useCategoryStore from '../../stores/categories';
import usePaymentStore from '../../stores/payments';
import type { StackedBarStruct } from '../../types'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const Bars = () => {
    const [categories] = useCategoryStore((state) => [state.categories])
    const [payments] = usePaymentStore((state) => [state.payments])

    const options = {
        scales: {
            x: {
                stacked: true,
                min: '2021-11-07',
            },
            y: {
                stacked: true,
            }
        }
    }

    const stackedBarsData = () => {
        let result: StackedBarStruct = []

        categories.forEach((category) => {
            let ds = {
                label: category.title,
                backgroundColor: category.color,
                data: [] as { x: string, y: string }[]
            }

            payments.forEach((payment) => {
                if (payment.category === category.internal) {
                    ds.data.push({
                        x: payment.date,
                        y: payment.price,
                    })
                }
            })

            result.push(ds)
        })

        return result
    }

    return (
        <Bar
            data={{
                labels: categories.map((c) => c.title),
                datasets: stackedBarsData()
            }}
            options={options}
        />
    )

}

export default Bars