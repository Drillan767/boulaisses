import create from 'zustand'
import { getDocs, collection } from 'firebase/firestore'
import type { Category } from '../types'
import { db } from '../config'

interface CategoryStore {
    categories: Category[],
    loadCategories: () => void
}

const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [] as Category[],
    loadCategories: async () => {
        await getDocs(collection(db, 'categories'))
            .then((data) => {
                const categoriesBuffer: Category[] = []

                data.forEach((d) => set(() => {
                    const { title, internal, color } = d.data()
                    const newCategory = {title, internal, color}

                    if (!categoriesBuffer.some((cb) => cb.title === newCategory.title)) {
                        categoriesBuffer.push(newCategory)
                    }

                    return {
                        categories: categoriesBuffer
                    }
                }))
            })
    }
}))


export default useCategoryStore