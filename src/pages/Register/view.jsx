"use client"

import { useContext, useState } from "react"
import { Button, Select, Form, Input, InputNumber, Radio, DatePicker, Checkbox, Divider, Typography, Space } from "antd"
import { PageContext } from "../../lib/PageContext"
import { useNavigate } from "react-router-dom"
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

function RegisterView() {
  const { handleSubmit, contextHolder, categories } = useContext(PageContext)
  const navigate = useNavigate()
  const [categoryType, setCategoryType] = useState("TEACHING")

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-12 bg-gradient-to-br from-blue-100 to-green-100 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Submit Your Application</h2>
          <p className="mt-2 text-sm text-gray-600">Join our community and start your journey with us</p>
        </div>

        <Form
          className="p-8 mt-8 space-y-6 bg-white shadow-2xl rounded-xl"
          labelAlign="left"
          style={{
            maxWidth: 800,
          }}
          labelCol={{
            span: 24,
            sm: 8,
          }}
          wrapperCol={{
            span: 24,
            sm: 16,
          }}
          initialValues={{
            remember: true,
            categoryType: "TEACHING",
          }}
          onFinish={handleSubmit}
          layout="horizontal"
          requiredMark="optional"
        >
          <div className="pb-2">
            <Title level={4} className="text-primary">
              Personal Information
            </Title>
            <Divider className="mt-2 mb-4" />
          </div>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              className="rounded-md"
              placeholder="your.email@example.com"
            />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[
              {
                required: true,
                message: "Please enter your contact number",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-gray-400" />}
              className="rounded-md"
              placeholder="Your phone number"
            />
          </Form.Item>

          <Form.Item
            label="Position Type"
            name="categoryType"
            rules={[
              {
                required: true,
                message: "Please select position type",
              },
            ]}
          >
            <Radio.Group onChange={(e) => setCategoryType(e.target.value)} buttonStyle="solid" className="w-full">
              <Space direction="horizontal" className="flex flex-wrap w-full gap-2">
                <Radio.Button value="TEACHING" className="flex-1 text-center">
                  Teaching
                </Radio.Button>
                <Radio.Button value="NON_TEACHING" className="flex-1 text-center">
                  Non-Teaching
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please select a position",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a position"
              optionFilterProp="children"
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
                message: "Please enter your first name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              className="rounded-md"
              placeholder="Your first name"
            />
          </Form.Item>

          <Form.Item label="Middle Name" name="middleName">
            <Input className="rounded-md" placeholder="Your middle name (optional)" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
            ]}
          >
            <Input className="rounded-md" placeholder="Your last name" />
          </Form.Item>

          <div className="pt-4 pb-2">
            <Title level={4} className="text-primary">
              Additional Details
            </Title>
            <Divider className="mt-2 mb-4" />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Form.Item
              label="Age"
              name="age"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please enter your age",
                },
              ]}
            >
              <InputNumber min={18} max={99} style={{ width: "100%" }} className="rounded-md" placeholder="Your age" />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please select your gender",
                },
              ]}
            >
              <Select
                placeholder="Select gender"
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
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[
              {
                required: true,
                message: "Please select your birth date",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              className="rounded-md"
              format="MM/DD/YYYY"
              placeholder="Select birth date"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <div className="pt-4 pb-2">
            <Title level={4} className="text-primary">
              Terms & Conditions
            </Title>
            <Divider className="mt-2 mb-4" />

            <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
              <Text className="block mb-3 text-sm text-gray-700">
                By submitting this application, you agree to the following:
              </Text>
              <ul className="pl-5 space-y-1 text-sm text-gray-600 list-disc">
                <li>All information provided is accurate and complete</li>
                <li>We may contact you regarding your application</li>
                <li>Your data will be processed according to our Privacy Policy</li>
                <li>You meet the minimum requirements for the position</li>
              </ul>
            </div>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("You must accept the terms and conditions to proceed")),
                },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox className="font-medium">
                I have read and agree to the{" "}
                <a href="#" className="font-semibold text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </Checkbox>
            </Form.Item>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-6 sm:flex-row">
            <Form.Item className="w-full m-0">
              <Button
                htmlType="submit"
                className="w-full px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-green-600 rounded-md hover:bg-green-700"
                style={{ height: "auto" }}
                size="large"
              >
                Submit Application
              </Button>
            </Form.Item>
            <Form.Item className="w-full m-0">
              <Button
                onClick={() => {
                  navigate("/login")
                }}
                className="w-full px-4 py-2 font-semibold text-gray-800 transition duration-300 ease-in-out bg-gray-100 rounded-md hover:bg-gray-200"
                style={{ height: "auto" }}
                size="large"
              >
                Already Registered? Sign In
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Need help? Contact our support team at support@example.com</p>
        </div>
      </div>
    </div>
  )
}

export default RegisterView

