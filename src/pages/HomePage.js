import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import  Layout  from '../components/Layout';
import { Row, Col } from 'antd';
import Doctor from '../components/Doctor';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/reducers/alertsSlice';
function HomePage() {

    const [doctors, setdoctors] = useState([])
    const dispatch = useDispatch()
    const getData = async () =>{
        // console.log(localStorage.getItem("token"))
        try {
            dispatch(showLoading())
            const response = await axios.get("/api/user/get-all-approved-doctors",{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });
              dispatch(hideLoading())
              if(response.data.success)
              {
                  setdoctors(response.data.data)
              }
              // console.log(response.data.data)
        } catch (error) {
          dispatch(hideLoading())
            console.log(error)
        }
    }
    useEffect(() => {
      // localStorage.clear()
        getData()
    }
    , [])
    
  return (
    <Layout>
        <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
        </Row>
    </Layout>
  )
}

export default HomePage