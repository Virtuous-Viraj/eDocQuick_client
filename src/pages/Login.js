import React from 'react'
import {Form, Input, Button} from 'antd'
import { Link , useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../Url';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/reducers/alertsSlice';
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const {loading} = useSelector(state => state.alerts)
  const onFinish = async (values) =>{
    // localStorage.clear()
    try {
      // const {name, email, password} = e
      dispatch(showLoading())
      const response = await axios.post(`${API_URL}/api/user/login`, values)
      dispatch(hideLoading())
      if(response.data.success)
      {
          toast.success(response.data.message)
          localStorage.setItem("token",response.data.data)
            toast("⏭ Redirecting to the Home Page")
            navigate("/")
            window.location.reload(true);
      }
      else{
        
        toast.error(response.data.messgae)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
        toast.error("Invalid Credentials🙂")
    }

  }
  return (

    <div className='auth'> 
        <div className="register-form card p-3">
          <h1 className='card-title'>Welcome Back!!</h1>
          <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" >
            <Input type='password' placeholder="password" />
          </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
            <Button className='primary-button my- width-button' htmlType='submit' block>Login</Button>
          <Link to='/register' className='anchor'>NEW USER ? REGISTER HERE</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Login