import axios from "axios";

export const GetLoginRequest = async () =>{
    return await axios.get('https://apismovilconstru-production-be9a.up.railway.app/login')
}

export const LoginRequest = async (creds) => {
    return await axios.post('https://apismovilconstru-production-be9a.up.railway.app/login', creds)
}