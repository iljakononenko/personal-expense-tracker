import React, {useState} from 'react';
import "./styles.css"
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

const FutureTransactionItem = ({transaction, editTransaction, removeTransaction}) => {

    const [isOpened, setIsOpened] = useState(false);
    const [inputState, setInputState] = useState({
        _id: transaction._id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
        checked: transaction.checked
    })

    const switchOpened = () => {
        setIsOpened(!isOpened)
    }

    return (
        <div className={transaction?.checked ? 'my-3 p-3 rounded bg-green' : 'my-3 p-3 rounded bg-yellow'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'col-2 ps-2'}>
                    <input
                        onChange={e => {
                            setInputState({...inputState, checked: !inputState.checked})
                            editTransaction({...inputState, checked: !inputState.checked})
                        }}
                        checked={inputState.checked}
                        className={'form-check-input cursor-pointer'}
                        type="checkbox"
                    />
                </div>
                <div className={'col'}>
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
                <div className={'col-2 fw-bold text-center'}>
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
                            transaction.amount + " zł"
                    }
                </div>
                <div className={"d-flex ms-auto ps-2 align-items-center justify-content-end fs-5 cursor-pointer"} onClick={switchOpened}>
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
                    <button onClick={() => removeTransaction(inputState)} type={'button'} className={'btn btn-danger me-2'}>Remove</button>
                    <button onClick={() => {editTransaction(inputState); switchOpened();}} type={'button'} className={'btn btn-warning'}>Edit</button>
                </div>
            }
        </div>
    );
};

export default FutureTransactionItem;
