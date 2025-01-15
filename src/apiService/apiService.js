import axios from "axios";
import { TokenHelper } from "../Helper/TokenHelper";

const BaseURL = process.env.REACT_APP_BaseURL;
console.log("baseurl:" , BaseURL);

class apiService {
    login = async (body)=>{
       return axios.post(BaseURL + '/user/login' , body);
    }

    getAllTasks = async(params)=>{
        return axios.get(BaseURL + '/task' , {
            params
        });
    }
    getMyTodo = async(params)=>{
        return axios.get(BaseURL + '/task/mytodo' ,{
            headers:{
                Authorization:TokenHelper.get()
            }
        });
    }
    getSingleTask = async(id)=>{
        return axios.get(BaseURL + '/task/'+id);
    }
    createTask  =async(body)=>{
       return axios.post(BaseURL + '/task/create' , body , {
        headers:{
            Authorization:TokenHelper.get()
        }
       })
    }
    updateTask = async(id , body)=>{
        console.log(TokenHelper.get())
        return axios.post(BaseURL+'/task/update/'+id , body, {
            headers:{
                Authorization:TokenHelper.get()
            }
          
        })
    }
    getAllUsers = async(params)=>{
        return axios.get(BaseURL + '/user/' , {
            params
        });
    }



    getLogs=async()=>{
        return axios.get(BaseURL + '/log' , {
            headers:{
                Authorization:TokenHelper.get()
            }
        });
    }
}
    

export default new apiService();