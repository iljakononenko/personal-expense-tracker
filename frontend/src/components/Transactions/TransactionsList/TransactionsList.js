import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {editTransaction, fetchTransactions, removeTransaction} from "../../../http/TransactionsApi";
import TransactionItem from "../TransactionItems/TransactionItem";
import FutureTransactionItem from "../TransactionItems/FutureTransactionItem";

const TransactionsList = observer(() => {

    const {transactions, user} = useContext(Context)

    const reload = async () => {
        user.setReload()
        transactions.setReload()
    }

    const checkTransaction = async (transaction) => {
        transaction.checked = !transaction.checked
        await editLocalTransaction(transaction)
        reload()
    }

    const editLocalTransaction = async (transaction) => {
        const data = await editTransaction(transaction)
        reload()
    }

    const removeLocalTransaction = async (transaction) => {
        await removeTransaction(transaction._id)
        reload()
    }

    return (
        <div className={'p-3 border rounded mt-3 w-100'}>
            <div className={'d-flex'}>
                <div className={'col-2 ps-3'}>
                    {transactions.futureTransactionsFlag ? 'Payed' : 'Date'}
                </div>
                <div className={'col ms-2'}>
                    Description
                </div>
                <div className={transactions.futureTransactionsFlag ? 'd-none' : 'col-2 me-2'}>
                    Transaction type
                </div>
                <div className={'col-2 text-center'}>
                    Amount
                </div>
                <div className={'ms-auto'} style={{width: 30}}>
                </div>
            </div>
            {
                transactions.transactions.map(transaction =>
                    transactions.futureTransactionsFlag ?
                        <FutureTransactionItem key={transaction._id} transaction={transaction} editTransaction={editLocalTransaction} removeTransaction={removeLocalTransaction} />
                        :
                        <TransactionItem key={transaction._id} transaction={transaction} editTransaction={editLocalTransaction} removeTransaction={removeLocalTransaction} />
                )

            }
        </div>
    );
});

export default TransactionsList;
