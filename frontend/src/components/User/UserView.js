import React, {useContext, useEffect, useState} from 'react';
import {changeUserData} from "../../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const UserView = observer(() => {

    const {user} = useContext(Context)
    const [monthSelected, setMonthSelected] = useState(0);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        let today =  new Date();
        setMonthSelected(today.getMonth());
    }, [])

    const [newUser, setNewUser] = useState({
        _id: user.id,
        currentBalance: user.currentBalance,
        moneyAmountPerMonth: user.moneyAmountPerMonth,
        moneyAmountPerWeek: user.moneyAmountPerWeek
    })

    const submitForm = () => {
        let userToSend = JSON.parse(JSON.stringify(newUser))

        for(let amount of userToSend.moneyAmountPerMonth) {
            if (amount == null) {
                amount = 0;
            }
        }
        changeUserData(newUser).then(data => {
            console.log(data)
            user.setReload()
        }).finally((data) => {
            console.log(data)
        })
    }

    const handleMonthInput = (number) => {
        let newUserState = JSON.parse(JSON.stringify(newUser))
        newUserState.moneyAmountPerMonth[monthSelected] = number
        setNewUser(newUserState)
    }

    return (
        <div className={"container py-3 border rounded"}>
            <div className={'d-flex mb-3 flex-wrap'}>
                <div className={'col-3 me-3'}>
                    <label className={'form-label'} htmlFor="">Current balance:</label>
                    <input value={newUser.currentBalance} onChange={e => setNewUser({...newUser, currentBalance: Number(e.target.value)})} className={'form-control'} type="text"/>
                </div>
                <div className={'col-3 me-3'}>
                    <label className={'form-label'} htmlFor="">Month selected:</label>
                    <div className={'input-group'}>
                        <select value={monthSelected} onChange={(e) => setMonthSelected(Number(e.target.value))} className={'form-select'}>
                            {
                                months.map((month, index) =>
                                    <option key={month} value={index}>{month}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className={'col-3 me-3'}>
                    <label className={'form-label'} htmlFor="">Money per month:</label>
                    <input value={newUser.moneyAmountPerMonth[monthSelected]} onChange={e => handleMonthInput(Number(e.target.value))} className={'form-control'} type="text"/>
                </div>
                <div className={'col-3 me-3'}>
                    <label className={'form-label'} htmlFor="">Money per week:</label>
                    <input value={newUser.moneyAmountPerWeek} onChange={e => setNewUser({...newUser, moneyAmountPerWeek: Number(e.target.value)})} className={'form-control'} type="text"/>
                </div>
                <div className={'d-flex align-items-end'}>
                    <button onClick={submitForm} className={'btn btn-outline-success'} type={'button'}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
});

export default UserView;
