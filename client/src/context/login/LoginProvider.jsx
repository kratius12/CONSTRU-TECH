import { useContext, useState } from "react";
import { LoginRequest } from "../../api/Login.api";
import { LoginContext } from "./LoginContext";


export const useLogin = () => {
    const context = useContext(LoginContext)
    if (!context) {
        throw new Error("UseLogin debe estar en contexto con LoginContext Provider")
    }   
    return context
}


export const LoginContextProvider = ({children}) => {

    const [login, setLogin] = useState([])

    async function Login() {
        const response = await LoginRequest()
        console.log(response.data)  
        setLogin(response.data)          
    }
    return (
        <LoginContext.Provider value={{Login, login}}>
            {children}
        </LoginContext.Provider>
    )
}

