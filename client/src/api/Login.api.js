import axios from "axios";

export const GetLoginRequest = async () =>{
    return await axios.get('https://apismovilconstru.onrender.com/login')
}

export const LoginRequest = async (creds) => {
    return await axios.post('https://apismovilconstru.onrender.com/login', creds)
}