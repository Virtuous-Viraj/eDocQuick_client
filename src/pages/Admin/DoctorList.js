import Layout from '../../components/Layout'
import {React,useState, useEffect} from 'react'
import {Table} from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/reducers/alertsSlice'
import { toast } from 'react-hot-toast'
import moment from 'moment'
// import { setUser } from '../../redux/reducers/userSlice'

function DoctorList() {

    const [doctors, setdoctors] = useState([]);
    const dispatch = useDispatch()
    const getDoctorsData = async()=>{
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/admin/doctors-list", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
              setdoctors(resposne.data.data);
            }
        } catch (error) {

            dispatch(hideLoading())
            console.log(error)
        }
    }

    const changeDoctorStatus = async(record, status)=>{
      try {
          dispatch(showLoading());
          const resposne = await axios.post("/api/admin/change-doctor-account-status",{
            doctorId : record._id,
            userId : record.userId,     
            status : status
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          dispatch(hideLoading());
          if (resposne.data.success) {
            toast.success(resposne.data.message)
            getDoctorsData()
          }
      } catch (error) {
          toast.error("Error chnaging the doctor status!🙂");
          dispatch(hideLoading())
          console.log(error)
      }
  }

    useEffect(() => {
        getDoctorsData();
      }, []);
    

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render : (text, record) => <h6>{record.firstName} {record.lastName}</h6>
        },
        {
          title: "Phone",
          dataIndex: "phoneNumber",
        //   render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
          },
          {
            title : "status",
            dataIndex : "status",
          },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {
                record.status === 'pending' && <h1 className="anchor" onClick={() => changeDoctorStatus(record, "approved")}>Approve</h1>
              }
              {
                record.status === 'approved' && <h1 className="anchor" onClick={() => changeDoctorStatus(record, "blocked")}>Block</h1>
              }
            </div>
          ),
        },
      ];
    
    
  return (
    <Layout>
        <h1 className='page-header'>Doctors List</h1>
        <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default DoctorList