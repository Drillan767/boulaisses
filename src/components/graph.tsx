import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    ArcElement,
    Tooltip,
    Legend,

} from 'chart.js';

import type { ChartData, ChartOptions } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { useRef } from 'react';
import { PaymentsProps } from "../types"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

const graph = ({ payments }: PaymentsProps) => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    
    const dailyData = {
        datasets: []
    }

    const ref = useRef()

    return (
        <div>
            <Pie data={data} options={{responsive: true}} />
        </div>
        
    )
}

export default graph