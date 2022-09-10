import axios from "axios";
export const fetchUser=()=>{
    return axios.get(`${process.env.REACT_APP_ApiUrl}ajax/getusers`);
}