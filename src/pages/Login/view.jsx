import React, {useContext} from 'react'
import {PageContext} from '../../lib/PageContext'
import {Button, Form, Input} from 'antd';
import {NavLink} from 'react-router-dom';

const LoginView = () => {
    const {handleSubmit, contextHolder} = useContext(PageContext)

    return (
        <div className='h-screen w-screen flex justify-center'>
            {contextHolder}
            <Form 
                className=' m-auto shadow-xl rounded-md bg-green-300 p-10'
                labelAlign="right"
                initialValues={
                    {remember: true}
                }
                onFinish={handleSubmit}
            >
                <Form.Item label="School ID" name="schoolId"
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
                <div className='flex-col justify-center'>
                    <Button  htmlType="submit" className='w-full border-none hover:bg-green-900 hover:text-white'>
                        Sign in
                    </Button>
                    <NavLink to={"/register"} className="flex justify-center p-2 rounded-md hover:bg-green-900 hover:text-white ">
                        <p className='bold uppercase'>No Account? Register</p>
                    </NavLink>
                </div>
            </Form>
            
        </div>

    )
}
export default LoginView
