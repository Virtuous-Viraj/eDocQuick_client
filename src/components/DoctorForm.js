import React from 'react'
import { Form, Input, Button, Row, Col, TimePicker } from 'antd'
import moment from 'moment'

function DoctorForm({ onFinish , initivalValues}) {
return (
    <div>
        <Form layout='vertical' onFinish={onFinish} initialValues={{
            ...initivalValues,
            timings : [
                initivalValues?.timings[0] ? moment(initivalValues?.timings[0], "HH:mm") : null,
                initivalValues?.timings[1] ? moment(initivalValues?.timings[1], "HH:mm") : null,
            ]
        }}>
            <h1 className="card-title mt-3">Personal Information :</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="First Name" name="firstName" rules={[{ required: true }]}>
                        <Input placeholder="First Name" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Last Name" name="lastName" rules={[{ required: true }]}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label="Website" name="website">
                        <Input placeholder="Website" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
                        <Input placeholder="Address" />
                    </Form.Item>
                </Col>
            </Row>
            <hr />
            <h1 className="card-title mt-3">Professional Information :</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Specialization" name="specialization" rules={[{ required: true }]}>
                        <Input placeholder="Add Specialization" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Experience in Yrs" name="experience" rules={[{ required: true }]}>
                        <Input placeholder="Add Experience" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Fees Per Consultation(₹) " name="feePerCunsultation" rules={[{ required: true }]}>
                        <Input placeholder="Fees Per Consultation" type='number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label="Timings" name="timings" rules={[{ required: true }]}>
                        <TimePicker.RangePicker format='HH:mm' />
                    </Form.Item>
                </Col>
            </Row>
            <div className="flex justify-content-end">
                <Button className='primary-button' htmlType='submit'>
                    Submit
                </Button>
            </div>
        </Form>
    </div>
)
}

export default DoctorForm