import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import useCategoryStore from '../../stores/categories';
import usePaymentStore from '../../stores/payments';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const PieChart = () => {
    const [categories] = useCategoryStore((state) => [state.categories])
    const [payments] = usePaymentStore((state) => [state.payments])

    const pieData = () => {
        const labels: string[] = []
        const bgColors: string[] = []
        const data: number[] = []

        const total = payments.reduce((acc, curr) => {
            const { category, price} = curr
     
            if (!acc.hasOwnProperty(category)) acc[category] = 0
    
            acc[category] += parseFloat(price)
       
            return acc
        }, {} as {[key: string]: number})

        for (const category in total) {
            const c = categories.find((c) => c.internal === category)
            if (c) {
                labels.push(c.title)
                bgColors.push(c.color)
            }
    
            data.push(total[category])
        }

        return {
            labels: labels,
            datasets: [{
                backgroundColor: bgColors,
                data: data
            }],
            hoverOffset: 4,
        }
    }

    return <Pie data={pieData()} />

}

export default PieChart