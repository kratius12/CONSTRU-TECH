import axios from "axios";

export const GetDashboardRequest = async () =>{
    return await axios.get('http://localhost:4000/dashboard/')
}