import {$host} from './index'

export const addTransaction = async (transaction) => {
    const {data} = await $host.post('api/transactions', transaction)
    return data
}

export const editTransaction = async (transaction) => {
    const {data} = await $host.put('api/transactions', transaction)
    return data
}

export const removeTransaction = async (transactionId) => {
    const {data} = await $host.delete('api/transactions/' + transactionId, {})
    return data;
}

export const fetchTransactions = async (futureTransactions = false, month = 0, week = 0) => {
    try {
        let url = 'api/transactions'
        if (futureTransactions) {
            url = 'api/futureTransactions';
        }

        const {data} = await $host.get(url, {
            params: {
                month,
                week
            }
        });
        return data;
    } catch (e) {
        console.error(e)
    }


}
