import React, {useContext} from 'react'
import {Button, Select, Form, Input, InputNumber} from 'antd';
import {PageContext} from '../../lib/PageContext';
import { useNavigate } from 'react-router-dom';


function RegisterView() {
    const {handleSubmit, contextHolder} = useContext(PageContext)
    const navigate = useNavigate()
    return (
            <div className='h-screen w-screen flex justify-center'>
                {contextHolder}
                <Form 
                    className='my-10 shadow-xl rounded-md bg-green-300 p-10'
                    labelAlign="right"
                    style={{
                        maxWidth: 600,
                      }}
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 14,
                      }}
                    initialValues={
                        {remember: true}
                    }
                    onFinish={handleSubmit}
                    
                >
                    <Form.Item label="Student ID" name="schoolId"
                        rules={
                            [{
                                    required: true,
                                    message: "Please input your Student ID"
                                },]
                        }
                        style={
                            {width: "100%"}
                    }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Year Batch" name="batch"
                   
                    style={
                        {width: "100%"}
                }>
                   <InputNumber min={2000}
                        max={2030}/>
                    </Form.Item>
                    <Form.Item label="Email" name="email"
                        rules={
                            [{
                              type: "email",
                                    required: true,
                                    message: "Please input your Email"
                                }]
                        }
                        style={
                            {width: "100%"}
                    }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="First Name" name="firstName"
                        rules={
                            [{
                                    required: true,
                                    message: "Please input your First Name"
                                }]
                        }
                        style={
                            {width: "100%"}
                    }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="MiddleName" name="middleName"

                        style={
                            {width: "100%"}
                    }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName"
                        rules={
                            [{
                                    required: true,
                                    message: "Please input your last name"
                                }]
                        }
                        style={
                            {width: "100%"}
                    }>
                        <Input/>
                    </Form.Item>
                    <div className='flex'>
                        <Form.Item label="Age" name="age"
                            rules={
                                [{
                                        required: true,
                                        message: "Please input your age"
                                    }]
                            }
                            style={
                                {width: "100%"}
                        }>
                        <InputNumber min={1} max={99} />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender"
                            rules={
                                [{
                                    required: true,
                                    message: "Please select gender"
                                }]
                            }
                            style={
                                {width: "100%"}
                            }>
                            <Select
                                style={
                                    {width: 120}
                                }
                                options={
                                    [
                                        {
                                            value: 'male',
                                            label: 'Male'
                                        }, {
                                            value: 'female',
                                            label: 'Female'
                                        },
                                    ]
                                }/>
                        </Form.Item>
                        <Form.Item label="Role" name="role"
                            rules={
                                [{
                                    required: true,
                                    message: "Please select role"
                                }]
                            }
                            style={
                                {width: "100%"}
                            }>
                            <Select
                                style={
                                    {width: 120}
                                }
                                options={
                                    [
                                        {
                                            value: 'student',
                                            label: 'Student'
                                        }, 
                                        {
                                            value: 'teacher',
                                            label: 'Teacher'
                                        },
                                    ]
                                }/>
                        </Form.Item>
                    </div>
                    <Form.Item label="Password" name="password"
                        rules={
                            [{
                                    required: true,
                                    message: "Please input your password"
                                }]
                        }
                        style={
                            {width: "100%"}
                    }>
                        <Input.Password/>
                    </Form.Item>
                    <div className='flex justify-between'>
                    <Form.Item className='mx-auto'>   
                        <Button htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item className='mx-auto'>
                        <Button onClick={() => {
                            navigate('/login')
                        }}>
                            Sign In
                        </Button>
                    </Form.Item>
                    </div>
                </Form>
            </div>
    )
}

export default RegisterView
