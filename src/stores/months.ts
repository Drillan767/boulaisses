import create from 'zustand'
import { getDocs, collection, addDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../config'
import type { Month } from '../types'

interface MonthStore {
    months: Month[],
    currentMonth: Month,
    initData: () => void,
    loadMonths: () => void,
    changeMonth: (id: string) => void,
    addMonth: (month: Omit<Month, 'id'>) => void,
}

const useMonthsStore = create<MonthStore>((set, get) => ({
    months: [] as Month[],
    currentMonth: {} as Month,
    initData: () => {
        if (!get().months.length) {
            get().loadMonths()
        }
    },
    loadMonths: async () => {
        const monthBuffers: Month[] = []
        const q = query(collection(db, 'months'), orderBy('beginDate', 'asc'))
        await getDocs(q)
            .then((data) => {
                data.forEach((d) => {
                    const { beginDate, value } = d.data()
                    const month = {
                        beginDate, value, id: d.id
                    }

                    monthBuffers.push(month)
                })
            })

            const designedCurrentMonth =  monthBuffers.at(-1)
            
            set({
                months: monthBuffers,
                currentMonth: designedCurrentMonth
            })
    },
    changeMonth: (id: string) => {
        const month = get().months.find((m) => m.id === id)
        set({currentMonth: month})
    },
    addMonth: async (month: Omit<Month, 'id'>) => {
        await addDoc(collection(db, 'months'), month)
        get().loadMonths()
    }
}))

export default useMonthsStore