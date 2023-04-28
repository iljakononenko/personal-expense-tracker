import React, {useState} from 'react';
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {displayDate} from "../../../utils/helpers";
import DatePicker from "react-datepicker";
import {EXPENSE_TYPE, FUTURE_EXPENSE_TYPE, INCOME_TYPE} from "../../../utils/consts";
import {addTransaction} from "../../../http/TransactionsApi";

const TransactionItem = ({transaction, editTransaction, removeTransaction}) => {

    const [isOpened, setIsOpened] = useState(false);
    const [inputState, setInputState] = useState({
        _id: transaction._id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type
    })

    const switchOpened = () => {
        setIsOpened(!isOpened)
    }

    return (
        <div className={'p-2 p-md-3 border rounded my-3'}>
            <div className={'d-flex flex-wrap justify-content-between'}>
                <div className={'col-4 col-md-2 fw-bold'}>
                    {
                        isOpened
                        ?
                            <div className={'pe-2'}>
                                <DatePicker
                                    className={'form-control cursor-pointer'}
                                    selected={transaction.date}
                                    dateFormat="dd/MM/yyyy"
                                    onChange={(date) => {
                                        setInputState({...inputState, date: date})
                                    }}
                                />
                            </div>
                        :
                            displayDate(transaction.date)
                    }
                </div>
                <div className={'col-12 col-md order-4 order-md-0 mt-3 mt-md-0'}>
                    {
                        isOpened
                            ?
                            <div className={'pe-2'}>
                                <input
                                    className={'form-control'}
                                    type="text"
                                    value={inputState.title}
                                    name={'title'}
                                    placeholder="Transaction Title"
                                    onChange={e => setInputState({...inputState, title: e.target.value} )}
                                />
                            </div>
                            :
                            transaction.title
                    }
                </div>
                <div className={transaction.type == 1 ? 'text-success col-4 col-md-2 fw-bold' : 'col-4 col-md-2 fw-bold'}>
                    {
                        isOpened
                        ?
                            <div className={'pe-2'}>
                                <select className={'form-select'} value={inputState.type}
                                        onChange={(e) => {
                                            setInputState({...inputState, type: Number(e.target.value) } ) }
                                        }
                                >
                                    <option value={INCOME_TYPE}>Income</option>
                                    <option value={EXPENSE_TYPE}>Expense</option>
                                </select>
                            </div>
                        :
                            transaction.type == 1 ? "Income" : "Expense"
                    }
                </div>
                <div className={transaction.type == 1 ? 'col-4 col-md-2 fw-bold text-success text-center' : 'col-4 col-md-2 fw-bold text-center'}>
                    {
                        isOpened
                        ?
                            <div className={'d-flex align-items-center'}>
                                <input
                                    className={'form-control'}
                                    type="text"
                                    value={inputState.amount}
                                    placeholder="Transaction Title"
                                    onChange={e => setInputState({...inputState, amount: Number(e.target.value)} )}
                                />
                                <span className={'ms-2'}>zł</span>
                            </div>
                        :
                            transaction.type == 2 ? "-" + transaction.amount + " zł" : transaction.amount + " zł"
                    }
                </div>
                <div className={"d-flex ms-auto ps-2 align-items-center justify-content-end fs-5 cursor-pointer order-5"} onClick={switchOpened}>
                    {
                        isOpened
                        ?
                            <FaCaretUp />
                        :
                            <FaCaretDown />
                    }
                </div>
            </div>
            {
                isOpened &&
                <div className={'mt-3 d-flex justify-content-end'}>
                    <button onClick={() => removeTransaction(transaction)} type={'button'} className={'btn btn-danger me-2'}>Remove</button>
                    <button onClick={() => editTransaction(inputState)} type={'button'} className={'btn btn-warning'}>Edit</button>
                </div>
            }
        </div>
    );
};

export default TransactionItem;
