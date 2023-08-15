import React, {useContext, useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchUser} from "../http/UserApi";
import TransactionsView from "../components/Transactions/TransactionsView";
import {fetchTransactions} from "../http/TransactionsApi";
import UserView from "../components/User/UserView";
import TodoView from "../components/Todo/TodoView";

const Home = observer(() => {

    const {transactions, user} = useContext(Context);

    const [view, setView] = useState(1)

    useEffect(() => {
        transactions.setLoaded(false)
        fetchTransactions(transactions.futureTransactionsFlag, transactions.monthSelected, transactions.weekSelected).then(data => {
            let summary = 0;
            for (let transaction of data) {
                if (transaction.type == 2) {
                    summary += transaction.amount
                }
                transaction.date = new Date(transaction.date)
            }
            transactions.setTransactions(data)
            user.setMoneyLeftForCurrentWeek(user.moneyAmountPerWeek - summary)
            transactions.setLoaded(true)
        }).catch(err => console.log(err))
    }, [transactions.futureTransactionsFlag, transactions.reload])

    useEffect(() => {
        fetchUser().then(data => {
            console.log(data)
            user.setId(data._id)
            user.setCurrentBalance(data.currentBalance)
            user.setMoneyAmountPerMonth(data.moneyAmountPerMonth)
            user.setMoneyAmountPerWeek(data.moneyAmountPerWeek)
        })
    }, [user.reload])

    return (
        <div>
            <div className={"container my-3 d-flex justify-content-center"}>
                <button onClick={() => setView(1)} className={"btn btn-outline-secondary me-3"}>Transactions</button>
                <button onClick={() => setView(2)} className={"btn btn-outline-secondary me-3"}>User settings</button>
                <button onClick={() => setView(3)} className={"btn btn-outline-secondary"}>Shopping list</button>
            </div>
            {
                view === 1
                ?
                <TransactionsView />
                :
                    view === 2
                    ?
                        <UserView />
                        :
                        <TodoView/>
            }
        </div>
    );
});

export default Home;
