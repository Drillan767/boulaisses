import { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables, ChartOptions } from 'chart.js';
import { Tabs, Tab } from 'react-bootstrap'
import { Pie, Bar } from 'react-chartjs-2'
import { getStackedBarData, getCategories } from '../assets/utils'; // getPieData
import { Category, PaymentsProps, StackedBarStruct } from "../types" // PieStruct

ChartJS.register(...registerables)

// const categories = [] as Category[]


const graph = ({ payments }: PaymentsProps) => {

    const [categories, setCategories] = useState([] as Category[])
    const [barData, SetBarData] = useState([] as StackedBarStruct)
    // const [pieData, setPieData] = useState({} as PieStruct)

    useEffect(() => {
        (async () => {
            const c = await getCategories()
            setCategories(c)
            const sb = await getStackedBarData(payments)
            SetBarData(sb)
            // const p = await getPieData(payments)
            //setPieData(p)
        })()
    }, [categories, barData]) //pieData

    return (
        <>
            <Tabs>
                <Tab eventKey={'second'} title='Per day'>
                    <Bar
                        data={{
                            labels: categories.map((c) => c.title),
                            datasets: barData
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
                    <Pie
                        data={{
                            labels: ['bl', 'bl', 'bl', 'bl'],
                            datasets: [{
                                label: 'Label type',
                                data: [1, 2, 3, 4],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 206, 86)',
                                    'rgb(75, 192, 192)',
                                ]
                            }]
                        }}
                        options={{responsive: true}}
                    />
                </Tab>
                <Tab eventKey={'third'} title='Total'>

                </Tab>
            </Tabs>
        </>
    )
}

export default graph