import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import Home from "./pages/user/home/Home";
import AppointmentBooking from "./pages/user/appointment-booking/AppointmentBooking";
import Indicators from "./pages/user/indicators/Indicators";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/indicators" element={<Indicators />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
