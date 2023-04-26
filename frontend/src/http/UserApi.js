import {$host} from "./index"

export const fetchUser = async () => {
    // const data = {currentBalance: 0, monthBalance: 0, weekBalance: 123};
    const {data} = await $host.get('api/user')
    return data
}

export const changeUserData = async (userData) => {
    const {data} = await $host.put('api/user', userData)
    return data;
}
