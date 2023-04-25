import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import { HashLoader } from "react-spinners";
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import Notifications from './pages/Notifications';
import UserList from './pages/Admin/UserList';
import DoctorList from './pages/Admin/DoctorList';
import Profile from './pages/Doctor/Profile';
import BookAppointment from './pages/BookAppointment';
import Appointment from './pages/Appointment';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
    {loading && <div className="loader-p">
    <HashLoader color="#005555" size={100}/>
    </div>}
    <Toaster position='top-center' reverseOrder={false}/>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}></Route>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>}></Route>
        <Route path='/notifications' element={<ProtectedRoute><Notifications/></ProtectedRoute>}></Route>
        <Route path='/admin/users-list' element={<ProtectedRoute><UserList/></ProtectedRoute>}></Route>
        <Route path='/admin/doctors-list' element={<ProtectedRoute><DoctorList/></ProtectedRoute>}></Route>
        <Route path='/doctor/profile/:userId' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path='/book-appointment/:doctorId' element={<ProtectedRoute><BookAppointment/></ProtectedRoute>}></Route>
        <Route path='/appointments' element={<ProtectedRoute><Appointment/></ProtectedRoute>}></Route>
        <Route path='/doctor/appointments' element={<ProtectedRoute><DoctorAppointments/></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
