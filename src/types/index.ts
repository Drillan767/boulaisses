export type Payment = {
    id: string,
    title: string,
    price: string,
    category: string,
    date: string,
    reset?: boolean
}

export type Reducer = {
    name: string,
    value: string,
    refresh?: boolean,
}

export type Category = {
    title: string,
    internal: string,
    color: string
}

export type Action = {
    name: string,
    value: string
}

export type FormEvent = {
    target: Action
}

export type PaymentProps = {
    payment: Payment
}

export type PaymentsProps = {
    payments: Payment[]
}

export type ModalProps = {
    payment: Omit<Payment, 'reset'>
    showModal: boolean
    handleClose: () => void
}

export type StackedBarStruct = {
    label: string,
    backgroundColor: string,
    data: {
        x: string,
        y: string,
    }[]
}[]

export type PieStruct = {
    labels: string[],
    datasets: {
        label: string,
        backgroundColor: string[],
        data: number[]
    }[],
}