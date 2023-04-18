import React from 'react';
import {NavLink} from "react-router-dom";
import {EXPENSES_ROUTE, HOME_ROUTE, INCOMES_ROUTE} from "../utils/consts";

const Header = () => {
    return (
        <header className={"d-flex justify-content-center py-3"}>
            <h1>Expenses Application</h1>
            <ul className={"nav nav-pills d-none"}>
                <li className={"nav-item"}>
                    <NavLink className="nav-link" to={HOME_ROUTE}>Home</NavLink>
                </li>
                <li className={"nav-item"}>
                    <NavLink className="nav-link" to={INCOMES_ROUTE}>Incomes</NavLink>
                </li>
                <li className={"nav-item"}>
                    <NavLink className="nav-link" to={EXPENSES_ROUTE}>Expenses</NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
