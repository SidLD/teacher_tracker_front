import React, { useContext } from 'react'
import { PageContext } from '../../lib/PageContext'
import {Button, DatePicker, Form, Modal, Input, Select } from "antd"
import { CustomeCategory } from '../../components/CustomeCategory'
import { CustomePieChart } from '../../components/CustomePieChart'
import { CustomeVerticalChart } from '../../components/CustomeVerticalChart'
import { CustomeTable } from '../../components/CustomeTable'
import { auth } from '../../lib/services'

export default function DashboardView() {
  const { handleCancel, handleOk, hanldeSubmitStudentStatus,
    showModal, isModalOpen, handleNewCategoryCancel, handleNewCategoryOk, handleNewCategoryChange, categories,
      removeCategory, editCategory, contextHolder, form, loader, userStatus, analysis, studentsData,batchData
  } = useContext(PageContext)
  
  const user = auth.getUserInfo()

  const studentColumns = [    
    {
      title: 'Category',
      index: 'category',
      isShow: true,
    },
    {
      title: 'Start Date',
      index: 'date',
      isShow: true,
    },{
      title: 'Detail',
      index: 'detail',
      isShow: true,
    },
    {
      title: 'Action',
      index: 'action',
      isShow: true,
    },
  ]


  if(user?.role === "student"){
    return (
      <>{
        !loader && 
        
      <div className='flex flex-col justify-center'>
      {contextHolder}
      
      <div className='p-auto m-2 '>
        <Button className='border-green-400 text-slate-200 bg-green-500' onClick={showModal}>
          Add Status
        </Button>
        <Modal title="Status" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>You can add Multiple Status at the same date</p>
            <Form
              form={form}
              labelCol={
                {span: 6}
              }
          wrapperCol={
              {span: 18}
          }
          labelAlign="right"
          initialValues={
              {remember: true}
          }
              onFinish={hanldeSubmitStudentStatus}>
              <Form.Item label="Start Date" name="date" 
               rules={
                [{
                    required: true,
                     message: "Please inpuy Start Date"
                }]
              }>
                <DatePicker format="YYYY-MM-DD hh:mm a"/>
              </Form.Item>
              <Form.Item label="Detail" name="detail"
               rules={
                [{
                    required: true,
                    message: "Please input detail"
                }]
              }>
                <Input />
              </Form.Item>
              <Form.Item label="Category" name="categoryId"
                rules={
                  [{
                      required: true,
                       message: "Please select Category"
                  }]
                }>
              <Select
                style={
                    {width: 120}
                }
                options={categories.map((category, index) => {
                  return (
                    {
                      value: category._id,
                      label: category.name,
                      key: index
                    }
                  )
                })}
                />
              </Form.Item>
            </Form>
        </Modal>
      </div>
      {!loader && <div className=' rounded-lg  mx-5'>
        <CustomeTable column={studentColumns}  dataSource={userStatus} />
      </div>}
    </div>
      }
      </>
    )
  }
  
  if(user?.isApprove){
    return (
      <>
      {!loader ?
        <div className=''>
        {contextHolder}
        <div className='flex-col content-center'>
          <div className='flex  h-full'>
            <div className='flex w-1/2 border-b border-green-500'>
              <div className='w-1/2'>
                  {analysis && <CustomePieChart labels={analysis.categories} dataSource={analysis.studentsData} label="# of Students" />}
              </div>
              <div className='w-1/2 text-center p-2'>
                <p className='uppercase text-2xl'> Data</p>
                <div className='flex justify-between'>  
                  <p>Total No. of Male: </p>  
                  <p>{studentsData.totalMale}</p> 
                </div>
                <div className='flex justify-between'>  
                  <p>Total No: of Female:  </p>  
                  <p>{studentsData.totalFemale} </p> 
                </div>
                <div className='flex justify-between'>  
                  <p>Total No: of Students: </p>  
                  <p>{studentsData.totalStudents}</p> 
                </div>
                <div className='flex justify-between'>  
                  <p>Total No: of Teachers: </p>  
                  <p>{studentsData.totalTeachers}</p> 
                </div>
              </div>
            </div>
            <div className='w-1/2 border-b border-l border-green-500'>
              <div className='flex justify-end '>
                <Button 
                className='border-2 border-green-900 m-2'
                onClick={showModal}>
                  Add Category
                </Button>
                <Modal title="Category" open={isModalOpen} onOk={handleNewCategoryOk} onCancel={handleNewCategoryCancel}>
                    <p className='text-red-600'>Note* You Cannot Delete Category</p>
                    <Input onChange={handleNewCategoryChange} />
                </Modal>
              </div>
              <div className='flex justify-center'>
              <table className='w-full mx-2 text-center'>
                <thead className='uppercase border-2 border-green-600'>
                  <tr>
                    <th>
                      Category
                    </th>
                    <th>
                      Students
                    </th>
                    <th colSpan="2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                {categories.length > 1 && categories.map((temp, index) => {
                return (
                    <CustomeCategory 
                      key={index} 
                      name={temp.name}
                      id={temp._id}
                      deleteCategory={removeCategory}
                      editCategory={editCategory}
                    /> 
                )
              })}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          <div className='h-1/2'>
              {batchData && <CustomeVerticalChart props={batchData}/>}
            </div>
        </div>
      </div>
      :
        <div className='items-center text-center uppercase text-2xl h-full'>
          Loading
        </div>
      }
      </>
    )
  }

  return (
    <div>
      <p>It seems you're not approved by the admin</p>
    </div>
  )

}
