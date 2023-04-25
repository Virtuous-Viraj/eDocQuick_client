import React from 'react'
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom'
// import { Navigate } from 'react-router-dom';
import '../../src/layout.css';
import { Badge } from 'antd';
function Layout({children}) {
    const [collapsed, setcollapsed] = useState(false)
    const {user} =  useSelector((state)=> state.user)
    const navigate = useNavigate()
    const location = useLocation()
    // const [user, setUser] = useState(data)
    // console.log(user._id)
    // console.log(user._id)
    // useEffect(()=>{

    // },[user?.name])
    const userMenu = [
        {
            name : 'Home',
            path : '/',
            icon : "ri-home-7-fill"
        },
        {
            name : 'Appointments',
            path : '/appointments',
            icon : "ri-calendar-fill fa-24"
        },
        {
            name : 'Apply Doctor',  
            path : '/apply-doctor',
            icon : "ri-hospital-line" 
        }
    ]

    const doctorMenu = [
        {
            name : 'Home',
            path : '/',
            icon : "ri-home-7-fill"
        },
        {
            name : 'Appointments',
            path : '/doctor/appointments',
            icon : "ri-calendar-fill"
        },
        {
            name : 'Profile',
            path : `/doctor/profile/${user?._id}`,
            icon : "ri-user-fill"
        }
    ]
  
    const adminMenu = [
        {
            name : 'Home',
            path : '/',
            icon : "ri-home-7-fill"
        },
        {
            name : 'Users List',
            path : '/admin/users-list',
            icon : 'ri-user-line'
        },
        {
            name : 'Doctors',
            path : '/admin/doctors-list ',
            icon : "ri-hospital-line"
        },
        {
            name : 'Profile',
            path : '/profile',
            icon : "ri-user-fill"
        }
    ]


    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

    return (
    <div className='main p-2'>
        <div className="d-flex layout">
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1 className='logo'>eDocQuick</h1>
                        <h1 className="role">{role}</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu, idx) =>{
                            const isActive = location.pathname === menu.path
                            return <div key={idx} className={`d-flex menu-item ${
                                isActive && "active-menu-item"
                              }`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to ={menu.path} className="mx-1">{menu.name}</Link>}
                            </div>
                        })}
                        <div className='d-flex menu-item' onClick={()=> {
                            localStorage.clear()
                            navigate("/login")
                        }} >
                                <i className='ri-logout-circle-line' ></i>
                               {!collapsed && <Link to ='/login' className=" mx-1">Logout</Link>}
                            </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        {collapsed ? <i className='ri-menu-2-fill header-action-icon' onClick={()=> setcollapsed(false)}></i> :<i className='ri-close-fill header-action-icon' onClick={()=> setcollapsed(true)}></i> }
                        <div className='d-flex align-items-center px-3'>
                        
                        {user?.name}
                        <Badge onClick={()=> navigate("/notifications")} count={user?.unseenNotifications ? user.unseenNotifications.length : ""}>
                            {/* <Avatar shape="square" size="large"/> */}
                            <i className="ri-notification-fill header-action-icon mx-2"></i>
                        </Badge>
                        </div>
                    </div>
                    <div className="body">
                        {children}
                        
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Layout