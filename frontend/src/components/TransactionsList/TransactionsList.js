import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {editTransaction, fetchTransactions} from "../../http/TransactionsApi";
import TransactionItem from "../TransactionItems/TransactionItem";
import FutureTransactionItem from "../TransactionItems/FutureTransactionItem";

const TransactionsList = observer(() => {

    const {transactions} = useContext(Context)

    const checkTransaction = async (transaction) => {
        transaction.checked = !transaction.checked
        const data = await editTransaction(transaction)
        transactions.setTransactions(transactions.transactions.map(trans => {
            if (trans == data._id) {
                return data
            } else {
                return trans
            }
        }))
    }

    return (
        <div className={'p-3 border rounded mt-3 w-100'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'col-1 text-center'}>
                    {transactions.futureTransactionsFlag ? 'Payed' : 'Date'}
                </div>
                <div className={transactions.futureTransactionsFlag ? 'col-5' : 'col-3'}>
                    Description
                </div>
                <div className={transactions.futureTransactionsFlag ? 'd-none' : 'col-2'}>
                    Transaction type
                </div>
                <div className={'col-1'}>
                    Amount
                </div>
            </div>
            {
                transactions.transactions.map(transaction =>
                    transactions.futureTransactionsFlag ?
                        <FutureTransactionItem key={transaction._id} transaction={transaction} editTransaction={checkTransaction} />
                        :
                        <TransactionItem key={transaction._id} transaction={transaction} />
                )

            }
        </div>
    );
});

export default TransactionsList;
