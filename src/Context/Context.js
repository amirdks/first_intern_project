import {createContext} from "react";

const UserContext = createContext({
    user: null,
    isLogin: false
})
// const IsUserLogin = createContext(false)

export default UserContext