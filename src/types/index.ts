import { Timestamp } from "@firebase/firestore"

export type Payment = {
    id: string,
    title: string,
    price: string,
    category: string,
    date: string,
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

export type Credentials = {
    email: string,
    password: string
}

export type ModalProps = {
    payment: Payment,
    showModal: boolean,
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

export type Month = {
    id: string,
    beginDate: Timestamp,
    value: string
}

export type MonthModal = {
    showModal: boolean,
    handleClose: () => void
}