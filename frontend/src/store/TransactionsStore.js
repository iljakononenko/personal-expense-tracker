import {makeAutoObservable} from "mobx";

export default class TransactionsStore {
    constructor() {
        this._transactions = [];
        this._futureTransactionsFlag = false;
        this._loaded = true;
        this._monthSelected = 0;
        this._week_selected = 0;
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

    get transactions() {
        return this._transactions;
    }

    get futureTransactionsFlag() {
        return this._futureTransactionsFlag
    }

    get loaded() {
        return this._loaded
    }

}
