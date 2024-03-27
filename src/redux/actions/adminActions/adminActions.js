import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

export const fetchUsers = (token) =>{    
    return async (dispatch) => {
      try {
        dispatch({ type: "USERS_REQUEST" });

        const response = await axios.get(`${serverUrl}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const { users } = response.data;
          dispatch({ type: "USERS_SUCCESS", payload: users });
        } 
        else 
        {
          dispatch({
            type: "USERS_FAILURE", payload: { error: response.data.message }
          });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
}


export const changePermission = (token, adminId, userId, users) =>{    
    return async (dispatch) => {
        try 
        {
            dispatch({ type: "USERS_REQUEST" });
            console.log("Admin Id:",adminId)
            // Check if the user is an admin
            let userToUpdate = users.find((obj) => obj.id === userId);
            
            if (userToUpdate && userToUpdate.role === 'admin') {
                // If the user is an admin, notify and return without making changes
                showToast('Cannot change Admin Permissions.', 'info');
                return;
            }
            // Make a request to the backend to update user permission
            
            const response = await axios.post(
                `${serverUrl}/change-permission`,
                { userId: userId },
                {
                headers: 
                    {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
     
            if (response.status === 200) 
            {
                // Now do changes in frontend also to reflect changes.
                if(userToUpdate.active){
                    userToUpdate.active = false;
                }
                else{
                    userToUpdate.active = true;
                }

                let updatedUsers = users.filter((u) => u.id !== userId)
                updatedUsers = [...updatedUsers, userToUpdate]
                dispatch({
                    type: "USERS_SUCCESS", payload: updatedUsers
                });
                showToast(response.data.message, 'success');
            } 
            else 
            {
                showToast(response.data.message, 'error');
                dispatch({
                    type: "USERS_FAILURE", payload: { error: response.data.message }
                });
            }
        } 
        catch (error) 
        {
            showToast('Error handling permission change:', 'error');
        }
    };
} 