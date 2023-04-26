import {makeAutoObservable} from "mobx";

export default class TransactionsStore {
    constructor() {
        this._transactions = [];
        this._futureTransactionsFlag = false;
        this._loaded = true;
        this._monthSelected = new Date().getMonth();
        this._weekSelected = 0;
        this._reload = 0;
        makeAutoObservable(this);
    }

    setTransactions(transactions) {
        this._transactions = transactions;
    }

    setFutureTransactionsFlag(futureTransactionsFlag) {
        this._futureTransactionsFlag = futureTransactionsFlag;
    }

    setLoaded(flag) {
        this._loaded = flag;
    }

    setMonthSelected(month) {
        this._monthSelected = month
    }

    setWeekSelected(week) {
        this._weekSelected = week
    }

    setReload() {
        this._reload++;
    }

    get transactions() {
        return this._transactions;
    }

    get futureTransactionsFlag() {
        return this._futureTransactionsFlag
    }

    get loaded() {
        return this._loaded
    }

    get reload() {
        return this._reload;
    }

    get monthSelected() {
        return this._monthSelected;
    }

    get weekSelected() {
        return this._weekSelected;
    }

}
