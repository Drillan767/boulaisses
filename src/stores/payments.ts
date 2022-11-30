import create from 'zustand'
import { getDocs, collection, deleteDoc, setDoc, addDoc, doc } from 'firebase/firestore'
import useMonthsStore from './months'
import type { Payment } from '../types'
import { db } from '../config'

interface PaymentSore {
    payments: Payment[],
    loadPayments: () => void,
    addPayment: (payment: Omit<Payment, 'id'>) => void,
    editPayment: (payment: Payment) => void,
    deletePayment: (id: string) => void,
}

let monthId = useMonthsStore.getState().currentMonth.id

useMonthsStore.subscribe((newMonth) => {
    monthId = newMonth.currentMonth.id
    usePaymentStore.getState().loadPayments()
})

const usePaymentStore = create<PaymentSore>((set, get) => ({
    payments: [] as Payment[],
    loadPayments: async () => {
        const paymentBuffer: Payment[] = []
        await getDocs(collection(db, 'months', monthId, 'payments'))
            .then((data) => {
                data.forEach((d) => {
                    const { title, price, category, date } = d.data()
                    const payment: Payment = {
                        title: title,
                        price: price,
                        category: category,
                        date: date,
                        id: d.id
                    }

                    if (!paymentBuffer.some((pb) => pb.id === payment.id)) {
                        paymentBuffer.push(payment)
                    }

                    set(() => ({payments: paymentBuffer}))
                })
            })
    },

    addPayment: async (payment: Omit<Payment, 'id'>) => {
        await addDoc(collection(db, 'months', monthId, 'payments'), payment)
        await get().loadPayments()
    },

    editPayment: async (payload: Payment) => {
        const docRef = doc(db, 'months', monthId, 'payments', payload.id)
        await setDoc(docRef, payload)
        await get().loadPayments()
    },

    deletePayment: async (id: string) => {
        const docRef= doc(db, 'months', monthId, 'payments', id)
        await deleteDoc(docRef)
        await get().loadPayments()
    }
}))

export default usePaymentStore