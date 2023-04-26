import {useContext} from "react";
import {Context} from "../index";

export const useReloadStores = () => {
    const {transactions, user} = useContext(Context)

    user.setReload()
    transactions.setReload()
}
