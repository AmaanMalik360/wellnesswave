import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const RoomPage = () => {

  const { roomId, counsellorId, userId, name } = useParams()
  console.log(window.location.protocol + '//' + 
  window.location.host + window.location.pathname +
   '?roomID=' +
   roomId)
  // const location = useLocation(); // Hook to access location and route state
  // const { appointment } = location.state;

  const myMeeting = async(element) => {
    const appID = 1451585701
    const serverSecret = "10f138e60c3fe31fc4a6b25aa2346412" 
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), name);
    const zc = ZegoUIKitPrebuilt.create(kitToken)

    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, 
      },
      onLeaveRoom: () => {
        // Add code here to handle leaving the room
        console.log('Leaving room');
        zc.destroy() // Example: Leaving the room when the leave room event is triggered
        window.location.reload()
      },
    });
  }
  return (
    <>
      <div ref={myMeeting}/>    
    </>
  )
}

export default RoomPage