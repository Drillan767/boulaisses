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