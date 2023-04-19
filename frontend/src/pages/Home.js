import React, {useContext, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {
    EXPENSE_TYPE,
    FUTURE_EXPENSE_TYPE,
    FUTURE_TRANSACTIONS,
    INCOME_TYPE,
    TRANSACTIONS_HISTORY
} from "../utils/consts";
import "react-datepicker/dist/react-datepicker.css";
import TransactionsList from "../components/TransactionsList/TransactionsList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {addTransaction, fetchTransactions} from "../http/TransactionsApi";

const Home = observer(() => {

    const {transactions} = useContext(Context);

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        type: EXPENSE_TYPE
    })

    useEffect(() => {
        transactions.setLoaded(false)
        fetchTransactions(transactions.futureTransactionsFlag).then(data => {
            for (let transaction of data) {
                transaction.date = new Date(transaction.date)
            }
            transactions.setTransactions(data)
            transactions.setLoaded(true)
        }).catch(err => console.log(err))
    }, [transactions.futureTransactionsFlag])

    const { title, amount, date, type} = inputState;

    const handleInput = (fieldTitle, text) => {
        setInputState({...inputState, [fieldTitle]: text})
        // setError('')
    }

    const submitForm = () => {
        console.log('trying to send...')
        console.log(inputState)
        addTransaction(inputState).then(data => {
            console.log('after submit')
            console.log(data)
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <div className={"container py-3 border rounded"}>
                <div className={'d-flex mb-3'}>
                    <div className={'col-3 me-3'}>
                        <div className={'input-group mb-3'}>
                            <select className={'form-select'} onChange={e => {transactions.setFutureTransactionsFlag(e.target.value == FUTURE_TRANSACTIONS);}}>
                                <option value={TRANSACTIONS_HISTORY}>Transactions History</option>
                                <option value={FUTURE_TRANSACTIONS}>Future Transactions</option>
                            </select>
                        </div>
                    </div>
                    <div className={'col-3 me-3'}>
                        <div className={'input-group'}>
                            <select className={'form-select'}>
                                <option value="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                            </select>
                        </div>
                    </div>
                    <div className={'col-3 me-3'}>
                        <div className={'input-group'}>
                            <span className="input-group-text">Week</span>
                            <select className={'form-select'}>
                                <option value="0">Select week</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div className={'col-7'}>
                        <div className={"d-flex"}>
                            <div className={'col balance border rounded text-center p-3 me-3'}>
                                <p className={''}>Current balance</p>
                                <p className={'fs-4 fw-bold'}>123 zł</p>
                            </div>
                            <div className={'col incomes border rounded text-center p-3 me-3'}>
                                <p className={''}>Left for current month</p>
                                <p className={'fs-4 fw-bold text-success'}>123 zł</p>
                            </div>
                            <div className={'col incomes border rounded text-center p-3'}>
                                <p className={''}>Left for current week</p>
                                <p className={'fs-4 fw-bold text-primary'}>123 zł</p>
                            </div>
                        </div>
                        <TransactionsList />
                    </div>
                    <div className={'ms-auto col-4'}>
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
        </div>
    );
});

export default Home;
