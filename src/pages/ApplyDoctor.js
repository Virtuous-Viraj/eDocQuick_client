import  Layout  from '../components/Layout'
import React from 'react'
import {Form, Input, Button, Row, Col, TimePicker} from 'antd'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading , hideLoading} from '../redux/reducers/alertsSlice'
import { useNavigate } from 'react-router-dom'
import DoctorForm from '../components/DoctorForm'
import moment from 'moment'
function ApplyDoctor() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const onFinish = async(values) =>{
        try {
            // const {name, email, password} = e
            dispatch(showLoading())
            const response = await axios.post("/api/user/apply-as-doctor", {...values, userId : user._id, timings : [
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm"),
                ]}, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
            }})
            dispatch(hideLoading())
            if(response.data.success)
            {
                
                setTimeout(() => {
                  toast.success("Applied for Doctor successfully")
                }, 1000);
                setTimeout(() => {
                  navigate("/")
                }, 2000);
            }
            else{
              
              toast.error(response.data.error)
            }
          } catch (error) {
            // console.log(error)
            dispatch(hideLoading())
              toast.error("User Already exists!")
          }
    }
  return (
        <Layout>
            <h1 className='page-title'>Apply as a Doctor</h1>
            <hr/>
             <DoctorForm onFinish={onFinish}/>
        </Layout>
  )
}

export default ApplyDoctor