import  Layout  from '../../components/Layout'
import React from 'react'
// import {Form, Input, Button, Row, Col, T} from 'antd'
import axios from 'axios'
import { API_URL } from '../../Url'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading , hideLoading} from '../../redux/reducers/alertsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import DoctorForm from '../../components/DoctorForm'
import { useState } from 'react'
import moment from 'moment'
function Profile() {

    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const params = useParams()

    const onFinish = async (values) => {
        try {
            // const {name, email, password} = e
            dispatch(showLoading())
            const response = await axios.post(`${API_URL}/api/doctor/update-doctor-profile`, { ...values, userId: user._id, timings : [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
            ] }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {

                setTimeout(() => {
                    toast.success("Profile updated successfully")
                }, 1000);
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }
            else {

                toast.error(response.data.error)
            }
        } catch (error) {
            // console.log(error)
            dispatch(hideLoading())
            toast.error("Something went wrong!")
        }
    }

    const getDoctorsData = async(req, res) => {
        // console.log("Hello")
        try {
            dispatch(showLoading())
            const response = await axios.post(`${API_URL}/api/doctor/get-doctor-info-by-user-id`, {
                userId : params.userId

            },{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            }) 
            dispatch(hideLoading())
            if(response.data.success)
            {
                // dispatch(setUser(response.data.data))
                setDoctor(response.data.data)
                // dispatch(reloadUserData(false))
            }
        } catch (error) {
                dispatch(hideLoading())
        }
}
useEffect(() => {
    
       getDoctorsData()
    
}, [])
  return (
    <Layout>
        <h1 className="page-title">Doctor Profile</h1>
        <hr/>
        {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />}
    </Layout>
  )
}

export default Profile