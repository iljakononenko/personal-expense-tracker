import React from 'react';

const TransactionItem = ({transaction}) => {
    return (
        <div className={'my-3'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'col-1 fw-bold'}>
                    {transaction.date?.getDate() < 10 ? "0" + transaction.date?.getDate() : transaction.date?.getDate()}.{transaction.date?.getMonth()+1 < 10 ? "0" + (transaction.date?.getMonth()+1) : transaction.date?.getMonth()+1}.{transaction.date?.getFullYear()}
                </div>
                <div className={'col-3'}>
                    {transaction.title}
                </div>
                <div className={transaction.type == 1 ? 'text-success col-2 fw-bold' : 'col-2 fw-bold'}>
                    {transaction.type == 1 ? "Income" : "Expense"}
                </div>
                <div className={transaction.type == 1 ? 'col-1 fw-bold text-success text-end' : 'col-1 fw-bold text-end'}>
                    {transaction.type == 1 ? transaction.amount : "-" + transaction.amount } zł
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
