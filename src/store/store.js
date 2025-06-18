import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account.js";

const storeToLocalStorage = (props) => {
    return(exe) => {
        return (action) => {
            const result = exe(action)

            localStorage.setItem("redux_store", JSON.stringify(props.getState()));

            return result
        }
    }
}

const loadFromStorage = () => {
    if(localStorage.getItem("redux_store") !== null){
         return JSON.parse(localStorage.getItem("redux_store"))
    }
       
}

const store = configureStore({
    reducer: {
       account: accountReducer,
    },
    devTools: true,
    middleware: (defaultMiddlewareFn) => {
        return [
            ...defaultMiddlewareFn(),
            storeToLocalStorage
        ]
    },
    preloadedState: loadFromStorage()
})
export default store