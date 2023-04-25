import Layout from '../../components/Layout'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/reducers/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';
function UserList() {

    const [users, setusers] = useState([]);
    const dispatch = useDispatch()
    const getUsersData = async()=>{
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/admin/users-list", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
              setusers(resposne.data.data);
            }
        } catch (error) {

            dispatch(hideLoading())
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersData();
      }, []);
    
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <h1 className="anchor">Block</h1>
            </div>
          ),
        },
      ];
    
  return (
    <Layout>
        <h1 className='page-header'>Users List</h1>
        <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default UserList