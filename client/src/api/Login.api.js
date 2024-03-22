import axios from "axios";

export const GetLoginRequest = async () =>{
    return await axios.get('apismovilconstru.onrender.com/login')
}

export const LoginRequest = async (creds) => {
    return await axios.post('apismovilconstru.onrender.com/login', creds)
}