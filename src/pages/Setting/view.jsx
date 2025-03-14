"use client"

import { useContext } from "react"
import { PageContext } from "../../lib/PageContext"
import { Button, Select, Form, Input, InputNumber, Spin } from "antd"

export const SettingView = () => {
  const { updateUser, loader, form } = useContext(PageContext)

  return (
    <div className="settings-container">
      {loader ? (
        <div className="loader-container">
          <Spin size="large" />
          <p className="loader-text">Loading your profile...</p>
        </div>
      ) : (
        <div className="settings-content">
          <div className="settings-header">
            <h1 className="settings-title">Account Settings</h1>
            <p className="settings-subtitle">Update your personal information</p>
          </div>

          <div className="form-container">
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="right"
              initialValues={{ remember: true }}
              onFinish={updateUser}
              form={form}
              className="settings-form"
            >
              <Form.Item label="Year Batch" name="batch" className="form-item">
                <InputNumber min={2000} max={2030} className="number-input" />
              </Form.Item>

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
                className="form-item"
              >
                <Input className="text-input" />
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
                className="form-item"
              >
                <Input className="text-input" />
              </Form.Item>

              <Form.Item label="Middle Name" name="middleName" className="form-item">
                <Input className="text-input" />
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
                className="form-item"
              >
                <Input className="text-input" />
              </Form.Item>

              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Please input your age",
                  },
                ]}
                className="form-item"
              >
                <InputNumber min={1} max={99} value={3} className="number-input" />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input your gender",
                  },
                ]}
                className="form-item"
              >
                <Select
                  value="male"
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
                  className="select-input"
                />
              </Form.Item>

              <Form.Item className="submit-item">
                <Button type="primary" htmlType="submit" className="submit-button">
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}

      <style jsx global>{`
                /* Main Container */
                .settings-container {
                    min-height: calc(100vh - 64px);
                    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
                    padding: 24px;
                    display: flex;
                    justify-content: center;
                    animation: fadeIn 0.5s ease-out;
                }
                
                /* Loading State */
                .loader-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 400px;
                }
                
                .loader-text {
                    margin-top: 16px;
                    color: #666;
                }
                
                /* Content Container */
                .settings-content {
                    width: 100%;
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                /* Header Section */
                .settings-header {
                    text-align: center;
                    margin-bottom: 32px;
                    animation: slideDown 0.6s ease-out;
                }
                
                .settings-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #333;
                    margin: 0 0 8px 0;
                }
                
                .settings-subtitle {
                    font-size: 16px;
                    color: #666;
                    margin: 0;
                }
                
                /* Form Container */
                .form-container {
                    background-color: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    padding: 32px;
                    animation: slideUp 0.7s ease-out;
                }
                
                /* Form Styling */
                .settings-form {
                    width: 100%;
                }
                
                .form-item {
                    margin-bottom: 24px;
                    transition: all 0.3s;
                }
                
                .form-item:hover {
                    transform: translateX(5px);
                }
                
                /* Input Styling */
                .text-input, .number-input, .select-input {
                    width: 100% !important;
                    border-radius: 8px !important;
                    transition: all 0.3s !important;
                }
                
                .text-input:hover, .number-input:hover, .select-input:hover {
                    border-color: #5b6af9 !important;
                }
                
                .text-input:focus, .number-input:focus, .ant-select-focused .ant-select-selector {
                    border-color: #5b6af9 !important;
                    box-shadow: 0 0 0 2px rgba(91, 106, 249, 0.2) !important;
                }
                
                .ant-select-selector {
                    border-radius: 8px !important;
                    height: 40px !important;
                    padding: 4px 11px !important;
                }
                
                .ant-select-selection-item {
                    line-height: 32px !important;
                }
                
                .ant-input, .ant-input-number {
                    height: 40px !important;
                }
                
                .ant-input-number-input {
                    height: 38px !important;
                }
                
                /* Form Labels */
                .ant-form-item-label > label {
                    color: #555 !important;
                    font-weight: 500 !important;
                }
                
                .ant-form-item-required::before {
                    color: #5b6af9 !important;
                }
                
                /* Submit Button */
                .submit-item {
                    margin-top: 32px;
                    display: flex;
                    justify-content: center;
                }
                
                .submit-button {
                    height: 48px !important;
                    padding: 0 32px !important;
                    font-size: 16px !important;
                    font-weight: 600 !important;
                    border-radius: 24px !important;
                    background: linear-gradient(to right, #5b6af9, #7579ff) !important;
                    border: none !important;
                    color: white !important;
                    box-shadow: 0 4px 12px rgba(91, 106, 249, 0.4) !important;
                    transition: all 0.3s !important;
                }
                
                .submit-button:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 16px rgba(91, 106, 249, 0.5) !important;
                    background: linear-gradient(to right, #4a59e8, #646bff) !important;
                }
                
                .submit-button:active {
                    transform: translateY(1px) !important;
                    box-shadow: 0 2px 8px rgba(91, 106, 249, 0.4) !important;
                }
                
                /* Responsive Adjustments */
                @media (max-width: 768px) {
                    .form-container {
                        padding: 24px 16px;
                    }
                    
                    .ant-form-item-label {
                        text-align: left !important;
                    }
                    
                    .ant-col-6 {
                        flex: 0 0 100% !important;
                        max-width: 100% !important;
                    }
                    
                    .ant-col-18 {
                        flex: 0 0 100% !important;
                        max-width: 100% !important;
                    }
                    
                    .form-item:hover {
                        transform: none;
                    }
                }
                
                /* Animations */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
    </div>
  )
}

