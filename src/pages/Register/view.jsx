"use client"

import { useContext, useState } from "react"
import { Button, Select, Form, Input, InputNumber, Radio } from "antd"
import { PageContext } from "../../lib/PageContext"
import { useNavigate } from "react-router-dom"

function RegisterView() {
  const { handleSubmit, contextHolder, categories } = useContext(PageContext)
  const navigate = useNavigate()
  const [categoryType, setCategoryType] = useState("TEACHING")
  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-green-50 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our community today</p>
        </div>

        <Form
          className="p-8 mt-8 space-y-6 bg-white rounded-lg shadow-2xl"
          labelAlign="left"
          style={{
            maxWidth: 600,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <div className="pb-4 mb-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              {
                type: "contact",
                required: true,
                message: "Please input your Contact",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input className="rounded-md" />
          </Form.Item>
          <Form.Item
            label="Position Type"
            name="categoryType"
            rules={[
              {
                required: true,
                message: "Please select category type",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Radio.Group onChange={(e) => setCategoryType(e.target.value)} defaultValue="TEACHING">
              <Radio value="TEACHING">TEACHING</Radio>
              <Radio value="NON_TEACHING">NON_TEACHING</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please select Position",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Select
              style={{ width: "100%" }}
              className="rounded-md"
              options={categories
                .filter((category) => category.position === categoryType)
                .map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
            />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your First Name",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item label="Middle Name" name="middleName" style={{ width: "100%" }}>
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <div className="pb-4 mb-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Additional Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Form.Item
              label="Age"
              name="age"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your age",
                },
              ]}
            >
              <InputNumber min={1} max={99} style={{ width: "100%" }} className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please select gender",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                className="rounded-md"
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row">
            <Form.Item className="w-full m-0">
              <Button
                htmlType="submit"
                className="w-full px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-green-500 rounded-md hover:bg-green-600"
                style={{ height: "auto" }}
              >
                Register
              </Button>
            </Form.Item>
            <Form.Item className="w-full m-0">
              <Button
                onClick={() => {
                  navigate("/login")
                }}
                className="w-full px-4 py-2 font-semibold text-gray-800 transition duration-300 ease-in-out bg-gray-100 rounded-md hover:bg-gray-200"
                style={{ height: "auto" }}
              >
                Sign In
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">By registering, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default RegisterView

