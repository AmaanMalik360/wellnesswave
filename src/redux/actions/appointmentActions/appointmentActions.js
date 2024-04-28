import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

export const fetchAllAppointments = (token) =>{    
    return async (dispatch) => {
      try {
        dispatch({ type: "APPOINTMENTS_REQUEST" });

        const response = await axios.get(`${serverUrl}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("All Appointments",response.data.appointments);

        const user = JSON.parse(localStorage.getItem("user")) 
        if (response.status === 200) {
          const { appointments } = response.data;
          const userAppointments = appointments.filter((app)=> app.userId === user._id) 
          dispatch({ type: "APPOINTMENTS_SUCCESS", payload: {appointments, userAppointments } });
        } 
        else {
          dispatch({
            type: "APPOINTMENTS_FAILURE",
            payload: { error: response.data.message },
          });
        }
      } 
      catch (error) {
        console.error("Error fetching Appointments:", error);
        dispatch({
            type: "APPOINTMENTS_FAILURE",
            payload: { error: "Error fetching Appointments:" },
        });
      }
    };
}

export const createAppointment = (data, appointments,  token) =>{    
    return async (dispatch) => {
      try {
        dispatch({ type: "APPOINTMENTS_REQUEST" });

        const response = await axios.post(`${serverUrl}/appointments`, data,{
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response",response.data);
        console.log("Appointments",response.data.appointment);
        
        if (response.status === 201) {
          const { appointment } = response.data;
          // Dispatch success action if needed
          let updatedAppointments = [...appointments, appointment]
      
          dispatch({ type: "APPOINTMENTS_SUCCESS", payload: updatedAppointments });
          showToast(response.data.message, 'success');
        } 
      } 
      catch (error) 
        {
            console.error("Error fetching Appointments:", error);
            dispatch({
                type: "APPOINTMENTS_FAILURE",
                payload: { error: error.response?.data?.message || "Error fetching Appointments:" }, 
            });
            showToast(error.response?.data?.message || "Error fetching Appointments:","error")
        } 
      
    };
}

