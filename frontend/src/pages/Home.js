import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import {EXPENSE_TYPE, INCOME_TYPE} from "../utils/consts";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {

    const transactionList = [
        {title: 'Test', amount: 200, date: new Date(), type: INCOME_TYPE},
        {title: 'Test', amount: 200, date: new Date(), type: INCOME_TYPE},
        {title: 'Test', amount: 200, date: new Date(), type: INCOME_TYPE},
        {title: 'Test', amount: 200, date: new Date(), type: INCOME_TYPE},
        {title: 'Test', amount: 200, date: new Date(), type: EXPENSE_TYPE},
    ]

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        type: EXPENSE_TYPE
    })

    const { title, amount, date, category, type} = inputState;

    const handleInput = (fieldTitle, text) => {
        setInputState({...inputState, [fieldTitle]: text})
        // setError('')
    }

    return (
        <div>
            <div className={"container py-3 border rounded"}>
                <div className={'d-flex mb-3'}>
                    <div className={'col-3 me-3'}>
                        <div className={'input-group mb-3'}>
                            <select className={'form-select'}>
                                <option value="">Transactions History</option>
                                <option value="">Future Transactions</option>
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
                        <div className={'p-3 border rounded mt-3 w-100'}>
                            <div className={'d-flex justify-content-between'}>
                                <div className={'col-1'}>
                                    Date
                                </div>
                                <div className={'col-3'}>
                                    Description
                                </div>
                                <div className={'col-2'}>
                                    Transaction type
                                </div>
                                <div className={'col-1'}>
                                    Amount
                                </div>
                            </div>
                            {
                                transactionList.map(transaction => {
                                    return (
                                    <div className={'my-3'}>
                                        <div className={'d-flex justify-content-between'}>
                                            <div className={'col-1 fw-bold'}>
                                                {transaction.date.getDate() < 10 ? "0" + transaction.date.getDate() : transaction.date.getDate()}.{transaction.date.getMonth()+1 < 10 ? "0" + (transaction.date.getMonth()+1) : transaction.date.getMonth()+1}.{transaction.date.getFullYear()}
                                            </div>
                                            <div className={'col-3'}>
                                                {transaction.title}
                                            </div>
                                            <div className={'col-2'}>
                                                {transaction.type == 1 ? "Income" : "Expense"}
                                            </div>
                                            <div className={transaction.type == 1 ? 'col-1 fw-bold text-success text-end' : 'col-1 fw-bold text-end'}>
                                                {transaction.type == 1 ? transaction.amount : "-" + transaction.amount }
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
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
                            <select className={'form-select'} onChange={(type) => {handleInput('type', type)}}>
                                <option value={INCOME_TYPE}>Income</option>
                                <option selected value={EXPENSE_TYPE}>Expense</option>
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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
