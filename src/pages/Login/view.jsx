"use client"

import { useContext, useState } from "react"
import { PageContext } from "../../lib/PageContext"
import { Button, Form, Input } from "antd"
import { NavLink } from "react-router-dom"
import bg from '../../assets/logoBackground.jpeg';
const LoginView = () => {
  const { handleSubmit, contextHolder } = useContext(PageContext)
  const [submit, setSubmit] = useState(true)
  const handleLogin = async (e) => {
    setSubmit(false)
    await handleSubmit(e)
    setSubmit(true)
  }

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen p-4">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={bg} alt="Background" fill priority className="object-cover" />
        {/* Overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-green-100/80" />
      </div>

      {contextHolder}
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-green-800">Welcome Back</h1>
          <p className="text-green-600">Sign in to your account</p>
        </div>

        <Form
          className="p-8 bg-white border border-green-100 rounded-lg shadow-xl"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            label={<span className="font-medium text-gray-700">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email",
              },
            ]}
          >
            <Input size="large" className="rounded-md" placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-gray-700">Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password size="large" className="rounded-md" placeholder="••••••••" />
          </Form.Item>

          <div className="mt-6 space-y-4">
            <Button
            
              disabled={!submit}
              htmlType="submit"
              size="large"
              className="w-full h-12 text-base font-medium text-white bg-green-600 border-none rounded-md hover:bg-green-700"
            >
              {submit ? "Sign in" : "Logging In..."}
            </Button>

            <div className="pt-4 text-center">
              <NavLink to={"/register"} className="font-medium text-green-600 transition-colors hover:text-green-800">
                Apply
              </NavLink>
            </div>
          </div>
        </Form>

        <div className="mt-6 text-sm text-center text-gray-500">
          <p>Protected by industry standard security</p>
        </div>
      </div>
    </div>
  )
}

export default LoginView

