import React, {useContext, useEffect, useState} from 'react';
import {changeUserData} from "../../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import * as uuid from "uuid";
import {FUTURE_TRANSACTIONS, TRANSACTIONS_HISTORY} from "../../utils/consts";

const TodoView = observer(() => {

    const {user} = useContext(Context)
    const [monthSelected, setMonthSelected] = useState(0);
    const [text, setText] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [showAllTodos, setShowAllTodos] = useState(
        localStorage.getItem("showAllTodos") === "true"
    );

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        let savedList = localStorage.getItem("todoList");
        if (savedList != null) {
            let todoList = JSON.parse(savedList)
            setTodoList(todoList)
        }
        // if (localStorage.getItem("showAllTodos") != null) {
        //     console.log('showAllTodos is not null')
        //     console.log(localStorage.getItem("showAllTodos") === "true")
        //     setShowAllTodos(localStorage.getItem("showAllTodos") === "true")
        // }
    }, [])

    const submitTodo = () => {
        let updatedItems = [...todoList, {id: uuid.v4(),checked: false, text: text, createdAt: new Date()}];
        setTodoList(updatedItems)
        setText("")
        localStorage.setItem("todoList", JSON.stringify(updatedItems))
    }

    const checkTodo = (itemId) => {
        // Create a new array with the edited item
        const updatedItems = todoList.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
        );

        // Update the state with the new array
        setTodoList(updatedItems);
        localStorage.setItem("todoList", JSON.stringify(updatedItems))
    }

    const switchVisibility = (newValue) => {
        setShowAllTodos(newValue === "true")
        localStorage.setItem("showAllTodos", newValue)
    }

    const removeTodo = (id) => {
        const updatedItems = todoList.filter(todo => todo.id != id);
        setTodoList(updatedItems)
        localStorage.setItem("todoList", JSON.stringify(updatedItems))
    }

    return (
        <div className={"container py-3 border rounded"}>
            <div className={'input-group mb-3'}>
                <select className={'form-select'} value={showAllTodos.toString()} onChange={e => switchVisibility(e.target.value)}>
                    <option value={"true"}>Show all</option>
                    <option value={"false"}>Show not done</option>
                </select>
            </div>
            <div className={''}>
                {
                    todoList.map(({id, checked, text, createdAt}) =>
                        showAllTodos || !checked
                        ?
                            <div key={id} className={'d-flex align-items-center cursor-pointer mb-3'}>
                                <div className={'ps-2'}>
                                    <input
                                        id={id}
                                        onChange={e => checkTodo(id)}
                                        checked={checked}
                                        className={'form-check-input cursor-pointer p-2 me-3'}
                                        type="checkbox"
                                    />
                                </div>
                                <label className={'cursor-pointer'} htmlFor={id}>
                                    {text}
                                </label>
                                <button className={'btn btn-outline-danger ms-auto'} onClick={() => removeTodo(id)}>
                                    X
                                </button>
                            </div>
                            :
                            ""

                    )
                }
            </div>
            <div className={'d-flex flex-wrap'}>
                <div className={'col-3 me-3'}>
                    <label className={'form-label'} htmlFor="">New todo:</label>
                    <input value={text} onChange={e => setText(e.target.value)} className={'form-control'} type="text"/>
                </div>
                <div className={'d-flex align-items-end'}>
                    <button onClick={submitTodo} className={'btn btn-outline-success'} type={'button'}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
});

export default TodoView;
