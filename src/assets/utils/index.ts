import type { Payment, PaymentsProps, StackedBarStruct, Category } from "../../types"
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config'

export const getCategories = async () => {
    let list = [] as Category[]
    await getDocs(collection(db, 'categories'))
        .then((data) => {
            data.forEach((d) => {
                list.push(d.data() as Category)
            })
        })

    return list
}

export const getStackedBarData = async (payments: Payment[]) => {
    let result = [] as StackedBarStruct
    let categories = await getCategories()

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

export const getPieData = async (payments: Payment[]) => {
    let categories = await getCategories()
    let data = [] as {category: string, total: number}[]
    let bgColors = [] as string[]

    categories.forEach((category) => {
        payments.forEach((payment) => {
            if (payment.category === category.internal) {
                const pi = data.find((obj) => obj.category === category.internal)
                // data[pi] = ""
                console.log(pi)
            }
        })
        bgColors.push(hexToRGba(category.color))
    })


    console.log(data, bgColors)
    
    return {
        labels: ['bl', 'bl', 'bl'],
        datasets: [{
            label: 'Label type',
            data: [1, 2, 3, 4],
            backgroundColor: ['color1', 'color2', 'color3']
        }]
    }
}

const getLineData = async (payment: Payment[]) => {

}

const hexToRGba = (hexCode: string, opacity: number = 1) => {
    let hex = hexCode.replace('#', '');
    
    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }    
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;   
    }

    return `rgba(${r},${g},${b},${opacity})`;
}