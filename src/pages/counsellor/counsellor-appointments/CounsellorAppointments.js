import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {deleteAppointment, fetchAllAppointments, fetchAllCounsellorAppointments } from "../../../redux/actions/appointmentActions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/actions/adminActions/adminActions";

const CounsellorAppointments = () => {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user")) 
  const token = localStorage.getItem("token") 

  // redux states
  const counsellorAppointments = useSelector(state => state?.appointments?.counsellorAppointments)

  console.log("Counsellor Appointments", counsellorAppointments);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([])

  const availableTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  // Functions to store date & time
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleCancel = async (id) => {
    await deleteAppointment(id, token)
    await getAppointments()
  };

  // Function to make weekends unavailable to select in datepicker
  const isWeekday = (date) => {
    const day = date.getDay();
    // Return true for weekdays (Monday-Friday)
    return day > 0 && day < 6;
  };
  
  // Functions to format date and times in table
  const formatDate = (dateString, deductDays) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - deductDays)
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };
  
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    time.setHours(time.getHours() - 5)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(time);
  };

  useEffect(() => {

    if(selectedDate !== null){
      const appointmentsOnSelectedDate = counsellorAppointments?.filter((appointment) => formatDate(selectedDate,0) === formatDate(appointment.date,1))
      console.log(appointmentsOnSelectedDate)
      const availableSlot = availableTimes?.filter(
        (time) =>
          !appointmentsOnSelectedDate?.some((appointment) => (formatTime(appointment.startTime) === time))
      );
      setAvailableSlots(availableSlot);

    }
  }, [selectedDate, counsellorAppointments]);
  console.log("Counsellor Appointments", counsellorAppointments)

  const getAppointments = async () => {
    dispatch(fetchAllCounsellorAppointments(token, user._id));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user && token) {
          await getAppointments();
        }
      } catch (error) {
        console.error("Error Fetching Appointments:", error);
      }
    };
    fetchAppointments()
  }, [])

  return (
    <>
      <div className=" flex w-full bg-gray-100">
        <div className="w-full p-8 bg-white rounded-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
            Your Appointments
          </h2>
          <div className="mb-6 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex">
              <label className="block text-2xl mt-2 text-indigo-800 font-semibold text-gray-600 ">
                Select Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                filterDate={isWeekday}
                dateFormat="MMMM d, yyyy"
                className="w-[200px] h-[51px] p-3 mx-2 border rounded-lg border-2 border-gray-600 shadow-xl focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-200"
                placeholderText="Select a date"
              />
            </div>
          </div>

          {counsellorAppointments?.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                Booked Appointments:
              </h3>
              <table className="w-full border-collapse border border-gray-800">
                <thead className="text-white">
                  <tr className="bg-indigo-800">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Starting Time</th>
                    <th className="border p-2">Ending Time</th>
                    <th className="border p-2">Person</th>
                    <th className="border p-2">Contact</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellorAppointments
                  .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)) // Sort appointments by date
                  .map((appointment, index) => (
                    <tr key={index}>
                      <td className="border pl-[50px] py-[5px]">{formatDate(appointment.date, 1)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.startTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.endTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{appointment.userId.name} </td>
                      <td className="border pl-[50px] py-[5px]">{appointment.userId.contact} </td>
                      <td className="border pl-[50px] py-[5px]">
                        <button
                          onClick={() => handleCancel(appointment._id)}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-8 text-gray-600">No appointments booked yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CounsellorAppointments