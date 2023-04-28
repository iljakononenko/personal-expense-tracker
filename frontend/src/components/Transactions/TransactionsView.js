import React, {useContext, useEffect, useState} from 'react';
import {
    EXPENSE_TYPE,
    FUTURE_EXPENSE_TYPE,
    FUTURE_TRANSACTIONS,
    INCOME_TYPE,
    TRANSACTIONS_HISTORY
} from "../../utils/consts";
import TransactionsList from "./TransactionsList/TransactionsList";
import DatePicker from "react-datepicker";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {addTransaction, fetchTransactions} from "../../http/TransactionsApi";

const TransactionsView = observer(() => {

    const {transactions, user} = useContext(Context);

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        type: EXPENSE_TYPE
    })

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const { title, amount, date, type} = inputState;

    const handleInput = (fieldTitle, text) => {
        setInputState({...inputState, [fieldTitle]: text})
        // setError('')
    }

    const submitForm = () => {
        addTransaction(inputState).then(data => {
            user.setReload()
            transactions.setReload()
        }).catch(err => {
            console.error(err)
        })
    }

    const selectMonth = (e) => {
        transactions.setMonthSelected(e.target.value)
        transactions.setReload()
        user.setReload()
    }

    const selectWeek = (e) => {
        transactions.setWeekSelected(e.target.value)

        transactions.setReload()
        user.setReload()
    }

    return (
        <div className={"container py-3 border rounded px-2"}>
            <div className={'d-flex flex-wrap mb-3'}>
                <div className={'col-6 col-md-3 me-3'}>
                    <div className={'input-group mb-3'}>
                        <select className={'form-select'} onChange={e => {transactions.setFutureTransactionsFlag(e.target.value == FUTURE_TRANSACTIONS);}}>
                            <option value={TRANSACTIONS_HISTORY}>Transactions History</option>
                            <option value={FUTURE_TRANSACTIONS}>Future Transactions</option>
                        </select>
                    </div>
                </div>
                <div className={'col-5 col-md-3 me-3'}>
                    <div className={'input-group'}>
                        <select value={transactions.monthSelected} onChange={(e) => selectMonth(e)} className={'form-select'}>
                            {
                                months.map((month, index) =>
                                    <option key={month} value={index}>{month}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className={'col-6 col-md-3 me-3'}>
                    <div className={'input-group'}>
                        <span className="input-group-text">Week</span>
                        <select value={transactions.weekSelected} onChange={e => selectWeek(e)} className={'form-select'}>
                            <option value="0">Select week</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={'d-flex flex-wrap'}>
                <div className={'col-12 col-md order-1 order-md-0'}>
                    <div className={"d-flex"}>
                        <div className={'col balance border rounded text-center p-3 me-3'}>
                            <p className={''}>Current balance</p>
                            <p className={'fs-4 fw-bold'}>{user.currentBalance} zł</p>
                        </div>
                        <div className={transactions.weekSelected == 0 ? 'col incomes border rounded text-center p-3' : 'col incomes border rounded text-center p-3 me-3'}>
                            <p className={''}>Left for current month</p>
                            <p className={'fs-4 fw-bold text-success'}>{user.moneyAmountPerMonth[transactions.monthSelected]} zł</p>
                        </div>
                        {
                            transactions.weekSelected == 0
                            ? ""
                            :
                                <div className={'col incomes border rounded text-center p-3'}>
                                    <p className={''}>Left for current week</p>
                                    <p className={'fs-4 fw-bold text-primary'}>{user.moneyLeftForCurrentWeek} zł</p>
                                </div>
                        }
                    </div>
                    <TransactionsList />
                </div>
                <div className={'col col-md-4 ms-md-3 order-0 order-md-1 mb-3 mb-md-0'}>
                    <h5 className={'my-2 fs-4 text-center'}>Add transaction</h5>
                    <div className={'input-group cursor-pointer mb-3'}>
                        <DatePicker
                            className={'form-control cursor-pointer'}
                            selected={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                setInputState({...inputState, date: date})
                            }}
                        />
                    </div>
                    <div className={'input-group mb-3'}>
                        <select className={'form-select'} value={type} onChange={(e) => {handleInput('type', e.target.value)}}>
                            <option value={INCOME_TYPE}>Income</option>
                            <option value={EXPENSE_TYPE}>Expense</option>
                            <option value={FUTURE_EXPENSE_TYPE}>Future expense</option>
                        </select>
                    </div>
                    <div className={'input-group mb-3'}>
                        <input
                            className={'form-control'}
                            type="text"
                            value={title}
                            name={'title'}
                            placeholder="Transaction Title"
                            onChange={e => handleInput('title', e.target.value)}
                        />
                    </div>
                    <div className={'input-group mb-3'}>
                        <input
                            className={'form-control'}
                            value={amount}
                            type="text"
                            name={'amount'}
                            placeholder={'Amount'}
                            onChange={e => handleInput('amount', e.target.value)}
                        />
                    </div>
                    <div className={'text-end'}>
                        <button className={'btn btn-outline-success'} onClick={submitForm}>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default TransactionsView;
