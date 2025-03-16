"use client"

import { useContext, useState } from "react"
import { PageContext } from "../../lib/PageContext"
import { Button, DatePicker, Form, Modal, Input, Select } from "antd"
import { CustomePieChart } from "../../components/CustomePieChart"
import { CustomeTable } from "../../components/CustomeTable"
import { auth } from "../../lib/services"

export default function DashboardView() {
  const {
    handleCancel,
    handleOk,
    hanldeSubmitStudentStatus,
    showModal,
    isModalOpen,
    handleNewCategoryCancel,
    handleNewCategoryOk,
    handleNewCategoryChange,
    handlePoisitonCategoryChange,
    removeCategory,
    editCategory,
    contextHolder,
    form,
    loader,
    userStatus,
    analysis,
    studentsData,
    fetchCategory,
    categories,
  } = useContext(PageContext)

  const [selectedPosition, setSelectedPosition] = useState("TEACHING")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editPosition, setEditPosition] = useState("")
  const [editName, setEditName] = useState("")

  const handlePositionChange = (value) => {
    setSelectedPosition(value)
    handlePoisitonCategoryChange(value)
  }

  const handleEditPositionChange = (value) => {
    setEditPosition(value)
  }

  const handleEditNameChange = (e) => {
    setEditName(e.target.value)
  }

  const handleEditCategory = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId)
    if (category) {
      setEditingCategory(category)
      setEditPosition(category.position)
      setEditName(category.name)
      setIsEditModalOpen(true)
    }
  }

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false)
    setEditingCategory(null)
  }

  const handleEditModalOk = async () => {
    if (editingCategory && editPosition && editName.trim()) {
      await editCategory({ ...editingCategory, name: editName, position: editPosition })
      await fetchCategory()
      // Close the modal
      setIsEditModalOpen(false)
      setEditingCategory(null)
    }
  }

  const user = auth.getUserInfo()

  const studentColumns = [
    {
      title: "Category",
      index: "category",
      isShow: true,
    },
    {
      title: "Start Date",
      index: "date",
      isShow: true,
    },
    {
      title: "Detail",
      index: "detail",
      isShow: true,
    },
    {
      title: "Action",
      index: "action",
      isShow: true,
    },
  ]

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block w-16 h-16 mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-2xl font-semibold tracking-wider text-gray-700 uppercase">Loading Dashboard</p>
        </div>
      </div>
    )
  }

  if (user?.role === "student") {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100 animate-fadeIn">
        {contextHolder}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
            <Button
              onClick={showModal}
              className="flex items-center h-auto gap-2 px-4 py-2 text-white transition-all duration-300 transform bg-blue-500 border-none rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Status
            </Button>
          </div>

          <div className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl animate-slideUp">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h2 className="text-lg font-semibold text-gray-700">Your Status Entries</h2>
              <p className="text-sm text-gray-500">Track your progress and activities</p>
            </div>
            <CustomeTable column={studentColumns} dataSource={userStatus} />
          </div>
        </div>

        <Modal
          title={
            <div className="flex items-center gap-2 text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Status
            </div>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            style: { backgroundColor: "#10b981", borderColor: "#10b981" },
          }}
          className="animate-fadeIn"
        >
          <div className="p-2 mb-4 border-l-4 border-blue-400 rounded-md bg-blue-50">
            <p className="text-sm text-blue-700">You can add multiple status entries for the same date</p>
          </div>

          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign="right"
            initialValues={{ remember: true }}
            onFinish={hanldeSubmitStudentStatus}
            className="mt-4"
          >
            <Form.Item label="Start Date" name="date" rules={[{ required: true, message: "Please input Start Date" }]}>
              <DatePicker format="YYYY-MM-DD hh:mm a" className="w-full border-gray-300 rounded-md" />
            </Form.Item>

            <Form.Item label="Detail" name="detail" rules={[{ required: true, message: "Please input detail" }]}>
              <Input className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: "Please select Category" }]}
            >
              <Select
                style={{ width: "100%" }}
                className="rounded-md"
                options={categories.map((category, index) => ({
                  value: category._id,
                  label: category.name,
                  key: index,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  if (user?.isApprove) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100 animate-fadeIn">
        {contextHolder}

        <div className="mb-6">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Admin Dashboard</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Analytics Section */}
            <div className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl animate-slideRight">
              <div className="p-4 border-b border-gray-200 bg-blue-50">
                <h2 className="text-lg font-semibold text-gray-700">Analytics Overview</h2>
                <p className="text-sm text-gray-500">Candidate distribution by position</p>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full p-4 md:w-1/2">
                  {analysis && (
                    <div className="px-[30%] transition-transform duration-500 transform hover:scale-105">
                      <CustomePieChart
                        labels={analysis.categories}
                        dataSource={analysis.studentsData}
                        label="# of Teachers"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full p-6 md:w-1/2">
                  <h3 className="mb-4 text-xl font-semibold text-center text-gray-700 uppercase">Statistics</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 transition-all duration-300 rounded-lg bg-blue-50 hover:shadow-md">
                      <p className="font-medium text-gray-700">Total Male Teachers:</p>
                      <p className="text-lg font-bold text-blue-600">{studentsData.totalMale}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 transition-all duration-300 rounded-lg bg-pink-50 hover:shadow-md">
                      <p className="font-medium text-gray-700">Total Female Teachers:</p>
                      <p className="text-lg font-bold text-pink-600">{studentsData.totalFemale}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 transition-all duration-300 rounded-lg bg-purple-50 hover:shadow-md">
                      <p className="font-medium text-gray-700">Total Teachers:</p>
                      <p className="text-lg font-bold text-purple-600">{studentsData.totalTeachers}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl animate-slideLeft">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Position Management</h2>
                  <p className="text-sm text-gray-500">Manage Teacher Positions</p>
                </div>

                <Button
                  onClick={showModal}
                  className="flex items-center h-auto gap-1 px-3 py-1 text-white transition-all duration-300 transform bg-blue-500 border-none rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Category
                </Button>
              </div>

              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase border-b-2 border-blue-500">
                          Category
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase border-b-2 border-blue-500">
                          Position
                        </th>
                        <th
                          className="px-4 py-3 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase border-b-2 border-blue-500"
                          colSpan="2"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 &&
                        categories.map((category, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3">{category.name}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${category.position === "TEACHING" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {category.position}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleEditCategory(category._id)}
                                className="p-1 mr-2 text-blue-600 transition-colors duration-200 rounded hover:bg-blue-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => removeCategory(category._id)}
                                className="p-1 text-red-600 transition-colors duration-200 rounded hover:bg-red-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Category Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Category
            </div>
          }
          open={isModalOpen}
          onOk={handleNewCategoryOk}
          onCancel={handleNewCategoryCancel}
          okButtonProps={{
            style: { backgroundColor: "#10b981", borderColor: "#10b981" },
          }}
          className="animate-fadeIn"
        >
          <div className="p-2 mb-4 border-l-4 border-red-400 rounded-md bg-red-50">
            <p className="text-sm text-red-700">Note: You cannot delete categories once created</p>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Position Type</label>
            <Select
              style={{ width: "100%" }}
              className="mb-4 rounded-md"
              value={selectedPosition}
              onChange={handlePositionChange}
            >
              <Select.Option value="TEACHING">TEACHING</Select.Option>
              <Select.Option value="NON_TEACHING">NON_TEACHING</Select.Option>
            </Select>

            <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
            <Input onChange={handleNewCategoryChange} placeholder="Enter new category name" className="rounded-md" />
          </div>
        </Modal>

        {/* Edit Position Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Category
            </div>
          }
          open={isEditModalOpen}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          okButtonProps={{
            style: { backgroundColor: "#10b981", borderColor: "#10b981" },
          }}
          className="animate-fadeIn"
        >
          {editingCategory && (
            <div className="mt-4">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
                <Input
                  value={editName}
                  onChange={handleEditNameChange}
                  placeholder="Enter category name"
                  className="rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Position</label>
                <Select
                  style={{ width: "100%" }}
                  className="rounded-md"
                  value={editPosition}
                  onChange={handleEditPositionChange}
                >
                  <Select.Option value="TEACHING">TEACHING</Select.Option>
                  <Select.Option value="NON_TEACHING">NON_TEACHING</Select.Option>
                </Select>
              </div>
            </div>
          )}
        </Modal>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 animate-fadeIn">
      <div className="w-full max-w-md p-8 text-center bg-white border-t-4 border-yellow-500 shadow-lg rounded-xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Pending Approval</h2>
        <p className="mb-6 text-gray-600">Your account is currently pending approval from an administrator.</p>
        <p className="text-sm text-gray-500">Please check back later or contact support for assistance.</p>
      </div>
    </div>
  )
}

