import { Chart as ChartJS, registerables, ChartOptions } from 'chart.js';
import { Tabs, Tab } from 'react-bootstrap'
import { Pie, Bar } from 'react-chartjs-2'
import { getStackedBarData, categories } from '../assets/utils';
import { PaymentsProps } from "../types"

ChartJS.register(...registerables)

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

    return (
        <>
            <Tabs>
                <Tab eventKey={'second'} title='Per day'>
                    <Bar
                        data={{
                            labels: categories.map((c) => c.title),
                            datasets: getStackedBarData(payments)
                        }}
                        options={{
                            scales: {
                                x: {
                                    stacked: true,
                                    min: '2021-11-07 00:00:00',
                                },
                                y: {
                                    stacked: true,
                                }
                            }
                        } as ChartOptions<'bar'>}
                    />
                </Tab>
                <Tab eventKey={'first'} title='Per category'>
                    <Pie data={data} options={{responsive: true}} />
                </Tab>
                <Tab eventKey={'third'} title='Total'>

                </Tab>
            </Tabs>
        </>
    )
}

export default graph