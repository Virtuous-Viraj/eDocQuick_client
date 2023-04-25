import React from 'react'
import {Form, Input, Button} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading} from '../redux/reducers/alertsSlice'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onFinish = async (values) =>{
        // localStorage.clear()
    try {
      // const {name, email, password} = e
      dispatch(showLoading())
      const response = await axios.post("/api/user/register", values)
      dispatch(hideLoading())
      if(response.data.success)
      {
          toast.success(response.data.message)
          setTimeout(() => {
            toast("⏭ Redirecting to the Login Page")
          }, 1000);
          setTimeout(() => {
            navigate("/login")
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
    <div className='auth'> 
        <div className="register-form card p-3">
          <h1 className='card-title'>Welcome to eDocQuick</h1>
          <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input type='password' placeholder="password" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center">
            <Button className='primary-button my- width-button' htmlType='submit' block>Register</Button>
          <Link to='/login' className='anchor'>LOGIN HERE</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Register