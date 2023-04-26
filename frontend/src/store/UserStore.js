import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._id = "";
        this._currentBalance = 0;
        this._moneyAmountPerMonth = [];
        this._moneyAmountPerWeek = 0;
        this._moneyLeftForCurrentWeek = 0;
        this._reload = 0;
        makeAutoObservable(this);
    }

    setId(id) {
        this._id = id;
    }

    setCurrentBalance(money) {
        this._currentBalance = money;
    }

    setMoneyAmountPerMonth(money) {
        this._moneyAmountPerMonth = money;
    }

    setMoneyAmountPerWeek(money) {
        this._moneyAmountPerWeek = money;
    }

    setMoneyLeftForCurrentWeek(money) {
        this._moneyLeftForCurrentWeek = money;
    }

    setReload() {
        this._reload++;
    }

    get id() {
        return this._id;
    }

    get currentBalance() {
        return this._currentBalance;
    }

    get moneyAmountPerMonth() {
        return this._moneyAmountPerMonth;
    }

    get moneyAmountPerWeek() {
        return this._moneyAmountPerWeek;
    }

    get reload() {
        return this._reload;
    }

    get moneyLeftForCurrentWeek() {
        return this._moneyLeftForCurrentWeek;
    }
}
