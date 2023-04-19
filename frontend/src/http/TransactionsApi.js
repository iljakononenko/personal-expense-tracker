import {$host} from './index'
import {EXPENSE_TYPE, FUTURE_EXPENSE_TYPE, INCOME_TYPE} from "../utils/consts";

export const addTransaction = async (transaction) => {
    const {data} = await $host.post('api/transactions', transaction)
    return data
}

export const editTransaction = async (transaction) => {
    const {data} = await $host.put('api/transactions', transaction)
    return data
}

export const fetchTransactions = async (futureTransactions = false) => {
    try {
        if (futureTransactions) {
            const {data} = await $host.get('api/futureTransactions');
            return data;
        } else {
            const {data} = await $host.get('api/transactions');
            return data;
        }
    } catch (e) {
        console.error(e)
    }


}
