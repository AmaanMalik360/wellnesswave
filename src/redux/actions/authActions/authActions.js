import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

export const signup = async (formData, move) => {
  try {
    const response = await axios.post(`${serverUrl}/register`, {
      formData,
    });
    console.log("Response", response);
    if (response.data.success) {
      showToast(response.data.message, "success");
      move("/");
    } else {
      showToast(response.data.message, "error");
    }
  } catch (error) {
    showToast(error.response.data.message, "error");
    console.error("Error:", error);
  }
};

export const signin = (formData, move) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });

      // Make an HTTP request to your backend
      const response = await axios.post(`${serverUrl}/login`, formData);
      // ,{
      //   headers: { Authorization: `Bearer ${token}` },
      // }
      console.log(response.status);
      console.log(response.data);
      // Assuming your backend returns a success message on successful signin
      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user, token
          },
        });
        showToast("Logged In Successfully","success")

        if(user.role === 'student' || user.role === 'staff' || user.role === 'faculty')
        {
          move('/home')
        }
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { error: response.data.message },
        });
        showToast(response.data.message,"error")
      }
    } 
    catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { error: "Error Fetching Movies" },
      });
      showToast("Error while logging in","error")
    }
  };
};

export const signout = () =>{
  return dispatch => {     
    dispatch({ type:'LOGOUT_REQUEST' })

    localStorage.clear();
    dispatch({
        type:'LOGOUT_SUCCESS'
    })
  }
}