import create from 'zustand'
import { getDocs, collection, deleteDoc, setDoc, addDoc, doc } from 'firebase/firestore'
import type { Payment } from '../types'
import { db } from '../config'

interface PaymentSore {
    payments: Payment[],
    loadPayments: () => void,
    addPayment: (payment: Omit<Payment, 'id'>) => void,
    editPayment: (payment: Payment) => void,
    deletePayment: (id: string) => void,
}

const usePaymentStore = create<PaymentSore>((set, get) => ({
    payments: [] as Payment[],
    loadPayments: async () => {
        const paymentBuffer: Payment[] = []
        await getDocs(collection(db, 'payments'))
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
        await addDoc(collection(db, 'payments'), payment)
        await get().loadPayments()
    },

    editPayment: async (payload: Payment) => {
        const docRef = doc(db, 'payments', payload.id)
        await setDoc(docRef, payload)
        await get().loadPayments()
    },

    deletePayment: async (id: string) => {
        const docRef= doc(db, 'payments', id)
        await deleteDoc(docRef)
        await get().loadPayments()
    }

}))

export default usePaymentStore