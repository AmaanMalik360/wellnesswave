import React from 'react'
import { useLocation } from 'react-router-dom';

const MeetingLounge = () => {

  const user = JSON.parse(localStorage.getItem("user")) 
  const location = useLocation(); // Hook to access location and route state
  const { appointment } = location.state;

    const handleJoinRoom = useCallback(() => {
        // A request to backend that would set status of appointment to 

        move(`/room-page/${appointment._id}/${appointment.counsellorId._id}/${user._id}/${appointment.counsellorId.name}`, { state: {appointment}})
    },[])  

    return (
        <>
            <div>
                <button onClick={() => handleJoinRoom(appointment._id, user._id, appointment.userId._id, appointment)} className="bg-gray-300 px-2 py-1">Wait</button>
            </div>
        </>
    )
}

export default MeetingLounge