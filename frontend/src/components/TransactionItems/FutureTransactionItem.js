import React, {useState} from 'react';
import "./styles.css"

const FutureTransactionItem = ({transaction, editTransaction}) => {

    return (
        <div className={transaction?.checked ? 'my-3 p-3 rounded bg-green' : 'my-3 p-3 rounded bg-yellow'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'col-1 ps-2'}>
                    <input
                        onChange={e => {
                            editTransaction(transaction)
                        }}
                        checked={transaction?.checked}
                        className={'form-check-input cursor-pointer'}
                        type="checkbox"
                    />
                </div>
                <div className={transaction?.checked ? 'col-5' : 'col-5'}>
                    {transaction.title}
                </div>
                <div className={'col-1 fw-bold text-end'}>
                    {transaction.amount} zł
                </div>
            </div>
        </div>
    );
};

export default FutureTransactionItem;
