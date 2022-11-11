import type { Payment, PaymentsProps, StackedBarStruct } from "../../types"

export const categories = [
    {
        title: 'Money income',
        internal: 'money-income',
        color: '#0f4f1e',
    },
    {
        title: 'Savings',
        internal: 'Savings',
        color: '#e2e2e2',
    },
    {
        title: 'Rent',
        internal: 'rent',
        color: '#76777c',
    },
    {
        title: 'Groceries',
        internal: 'groceries',
        color: '#ff0f95',
    },
    {
        title: 'Restaurants',
        internal: 'restaurants',
        color: '#efc763',
    },
    {
        title: 'Coffee',
        internal: 'coffee',
        color: '#dc9e91',
    },
    {
        title: 'Self treat',
        internal: 'self-treat',
        color: '#0557e8',
    },
    {
        title: 'Monthly bills',
        internal: 'monthly-bills',
        color: '#24436d',
    },
    {
        title: 'Unexpected spendings',
        internal: 'unexpected',
        color: '#ff0f4a',
    },
    {
        title: 'Other',
        internal: 'misc',
        color: '#793851',
    }
]

export const getStackedBarData = (payments: Payment[]) => {
    let result = [] as StackedBarStruct
    categories.forEach((category) => {
        let ds = {
            label: category.title,
            backgroundColor: category.color,
            data: [] as {x: string, y: string}[],
        }

        payments.forEach((payment) => {
            if (payment.category === category.internal) {
                ds.data.push({
                    x: payment.date,
                    y: payment.price,
                })
            }
        });

        result.push(ds)
    })

    return result
}