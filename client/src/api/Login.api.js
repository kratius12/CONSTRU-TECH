import axios from "axios";

export const GetLoginRequest = async () =>{
    return await axios.get('http://localhost:4000/login')
}

export const LoginRequest = async (creds) => {
    return await axios.post('http://localhost:4000/login', creds)
}