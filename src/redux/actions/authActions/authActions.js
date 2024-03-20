import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

export const signup = async (formData, move) =>{
    try {
      const response = await axios.post(`${serverUrl}/register`, {
        formData
      });
      console.log("Response",response)
      if (response.data.success) {
        
        showToast(response.data.message, "success");
        move("/");
      } else {        
        showToast(response.data.message, "error");
      }
    } 
    catch (error) {
      showToast(error.response.data.message, "error");
      console.error("Error:", error);
    }

}