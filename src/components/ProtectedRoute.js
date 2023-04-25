import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { setUser } from '../redux/reducers/userSlice'
import { hideLoading, showLoading } from '../redux/reducers/alertsSlice'
function ProtectedRoute(props) {
        const {user} = useSelector((state) => state.user)
        // console.log(user);
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const getUser = async(req, res) => {
                try {
                    dispatch(showLoading())
                    const response = await axios.post("/api/user/get-user-info-by-id", {token : localStorage.getItem('token')}, {
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem('token')}`
                        }
                    }) 
                    dispatch(hideLoading())
                    if(response.data.success)
                    {
                        dispatch(setUser(response.data.data))
                        // dispatch(reloadUserData(false))
                    }
                    else{
                        localStorage.clear()
                        navigate("/login")
                    }
                } catch (error) {
                        dispatch(hideLoading())
                        console.log("Token mistake")
                        localStorage.clear()
                        navigate("/login")
                }
        }
        useEffect(() => {
            if(!user)
            {
               getUser()
            }
        }, [user])
        
        if(localStorage.getItem("token"))
        {
            return props.children
        }   
        else{
            return <Navigate to="/login"/>
        }
  
}

export default ProtectedRoute