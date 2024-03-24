import React, { useState } from "react";
import Navbar from "../../../components/common/navbar/Navbar";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const availableTimes = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      const newAppointment = {
        date: selectedDate.toDateString(),
        time: selectedTime,
      };
      setBookedAppointments([...bookedAppointments, newAppointment]);
      setSelectedDate(null);
      setSelectedTime("09:00 AM");
    }
  };

  const handleCancel = (index) => {
    const updatedAppointments = [...bookedAppointments];
    const canceledAppointment = updatedAppointments.splice(index, 1)[0];
    setBookedAppointments(updatedAppointments);

    availableTimes.push(canceledAppointment.time);
    availableTimes.sort();
  };

  const availableSlots = availableTimes.filter(
    (time) =>
      !bookedAppointments.some((appointment) => appointment.time === time)
  );

  return (
    <>
    <div className="flex bg-gray-100">
        
          <div className="w-36 mx-5 my-8 h-96 p-4">
 
          </div>
        
      <div className="w-full p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6 w-full">
          Book an Appointment
        </h2>

        <div className="mb-6">
          <label className="block text-lg text-indigo-800 font-semibold text-gray-600 mb-2">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="w-full p-3 border rounded-lg border-2 border-gray-600 shadow-xl focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-200"
            placeholderText="Select a date"
          />
        </div>

        <div className="mb-6 ">
          <label className="block text-lg text-indigo-800 font-semibold text-gray-600 mb-2">
            Select Time:
          </label>
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            placeholder="Select time slot"
            className="w-32 py-3 relative px-3 m-3 border rounded-lg border-2 border-gray-600 shadow-xl focus:border-blue-300 hover:border-blue-200"
          >
            {availableSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-32 bg-blue-500 text-white p-3 rounded-full shadow-xl hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300"
        >
          Book!
        </button>

        {bookedAppointments.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Booked Appointments:
            </h3>
            <table className="w-full border-collapse border border-gray-800">
              <thead className="text-white">
                <tr className="bg-indigo-800">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookedAppointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="border p-2">{appointment.date}</td>
                    <td className="border p-2">{appointment.time}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleCancel(index)}
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
};

export default AppointmentPage;
