import { jwtDecode } from "jwt-decode";
import { TokenHelper } from "../Helper/TokenHelper";

export const   getUserRole = ()=>{
   const token = TokenHelper.get();
   if(token){
    const decode = jwtDecode(token);
    return decode;
   }
   return null;
}