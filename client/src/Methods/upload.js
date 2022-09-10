import axios from "axios";
export const uploadCSV=(file)=>{
    let formData = new FormData();
    formData.append("csv", file);
    return axios.post(`${process.env.REACT_APP_ApiUrl}/ajax/import`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })   
}