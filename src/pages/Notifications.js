import Layout from '../components/Layout'
import React from 'react'
import {Tabs} from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../Url'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/reducers/alertsSlice'
import { toast } from 'react-hot-toast'
import { setUser } from '../redux/reducers/userSlice'
function Notifications() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const markAllasRead = async (req, res, next) =>{
        try {
            // const {name, email, password} = e
            dispatch(showLoading())
            const response = await axios.post(`${API_URL}/api/user/mark-as-seen`, {userId : user._id} , {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading())
            if(response.data.success)
            {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            }
            else{
              
              toast.error(response.data.error)
            }
          } catch (error) {
            console.log(error)
            dispatch(hideLoading())
              toast.error("User Already exists!")
          }
    }

    const deleteAll = async (req, res, next) =>{
        try {
            // const {name, email, password} = e
            dispatch(showLoading())
            const response = await axios.post(`${API_URL}/api/user/delete-all`, {userId : user._id} , {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading())
            if(response.data.success)
            {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            }
            else{
              
              toast.error(response.data.error)
            }
          } catch (error) {
            console.log(error)
            dispatch(hideLoading())
              toast.error("User Already exists!")
          }
    }
    // console.log(user)
  return (
    <Layout>
        <h1 className="page-title">Notifications</h1>
        <hr/>
        <Tabs>
            <Tabs.TabPane tab='Unseen' key={1}>
                <div className="d-flex justify-content-end">
                    <h1 className='anchor underline' onClick={()=>markAllasRead()}>Mark all read</h1>
                </div>
                {user?.unseenNotifications.map((notification, idx)=>{
                    return <div key={idx} className='card p-2 mt-2' onClick={()=> navigate(notification.onClickPath)}>
                        <div className="card-text">{notification.message}</div>
                    </div>
                })}
            </Tabs.TabPane>
            <Tabs.TabPane tab='Seen' key={2}>
            <div className="d-flex justify-content-end">
                    <h1 className='anchor underline' onClick={()=>deleteAll()}>Delete All</h1>
                </div>
                {user?.seenNotifications.map((notification, idx)=>{
                    return <div key={idx} className='card p-2 mt-2' onClick={()=> navigate(notification.onClickPath)}>
                        <div className="card-text">{notification.message}</div>
                    </div>
                })}
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notifications