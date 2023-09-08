import { PageContext } from '../../lib/PageContext'
import DashboardView from './view'
import { auth } from '../../lib/services'
import {getCategory, addCategory, deleteCategory, updateCategory, addUserStatus, getUserStatus, removeUserStatus, getAnalysis, getStudentsData, getBatchData} from '../../lib/api'
import React, { useEffect, useState } from 'react'
import { Button, Form, message } from 'antd'
function Dashboard() {
    const user = auth.getUserInfo()
    const [messageApi, contextHolder] = message.useMessage();
    const [loader, setloader] = useState(true)
    
    //Admin Functions
    const [newCategory, setCategory] = useState()
    const [categories, setCategories] = useState([{name: ""}])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userStatus, setUserStatus] = useState([])
    const [analysis, setAnalysis] = useState()
    const [studentsData, setStudentsData] = useState({})
    const [batchData, setBatchData] = useState(null)

    const dateFormat = (date) => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const newDate = new Date(date)
      const data = {
        day: newDate.getDay(),
        month: monthNames[newDate.getMonth()],  
        year: newDate.getFullYear()
      }
      return data
    }
    const handleNewCategoryChange = (e) => {
      setCategory(e.target.value)
    }
    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleNewCategoryOk = async () => {
      try {
        const payload = {
          category : newCategory
        }
        const res = await addCategory(payload)
        if(res) {
          success("Adding New Category")
          await fetchCategory()
          await fetchAnalysis()
          setIsModalOpen(false);
        }else{
          success("Something Went Wrong")
        }
      } catch (error) {
        console.log(error)
      }
    };
    const handleNewCategoryCancel = () => {
      setIsModalOpen(false);
    };
    const fetchCategory = async (e) => {
        try {
            const res = await getCategory()
            setCategories(res.data.data)
          } catch (error) {
            return null
        }
    }
    const removeCategory = async (e) => {
      try {
        const res = await deleteCategory({categoryId: e})
        if(res.data.data.deletedCount > 0){
          success("Delete Success")
          await fetchCategory()
          await fetchAnalysis()
        }
      } catch (error) {
        console.log(error)
      }
    }
    const editCategory = async (e) => {
      try {
        const res = await updateCategory(e)
        if(res.data.data){
          await fetchCategory()
          await fetchAnalysis()
        }
      } catch (error) {
        console.log(error)
      }
    }

    //Student Functions
    const [form] = Form.useForm()
    const handleOk = async () => {
      setloader(true)
      try {
        const data = form.getFieldValue()
        const payload = {
          categoryId : data.categoryId,
          date: new Date(data.date.$d),
          detail: data.detail,
          userId: user.id
        }
        await addUserStatus(payload);
        await fetchUserStatus()
      } catch (error) {
        message("Something Went Wrong")
      }
      setIsModalOpen(false)
      setloader(false)
    }
    const handleCancel = () => {
      setIsModalOpen(false)
    }
    const hanldeSubmitStudentStatus = async (e) => {
      console.log(e)
      message("Success")
    }
    const fetchUserStatus = async () => {
      try {
        const result = await getUserStatus({userId: user.id})
        const status = result.data.data.map((c, index) => {
          return {
            key: index,
            category: c.category.name,
            date: dateFormat(c.date).month+ "-" + dateFormat(c.date).year,
            detail: c.detail,
            action: <Button
            onClick={() => {
              deleteUserStatus(c._id)
            }}>
              Delete
            </Button>
          }
        })
        setUserStatus(status)
      } catch (error) {
        console.log(error)
      }
    }
    const deleteUserStatus = async (data) => {
      try {
        const payload = {
          userId: user.id,
          statusId: data
        }
        const result = await removeUserStatus(payload)
        console.log(result.data.data.acknowledge)
        if(result.data.data.acknowledge){
            success("Success")
        }
        await fetchUserStatus()
      } catch (error) {
        console.log(error)
      }
    }

    //Analysis
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysis()
        setAnalysis(data.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getStudentsCountData = async () => {
      try {
        const result = await getStudentsData()
        setStudentsData(result.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchBatchData = async () => {
      try {
        const result = await getBatchData()
        setBatchData(result.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    
    const success = (data) => {
      messageApi.open({
        type: 'success',
        content: data,
      });
    };
   
    useEffect(() => {
      fetchCategory()
      fetchAnalysis()
      getStudentsCountData()
      fetchBatchData()
      if(user.role === "student"){
        fetchUserStatus()
      }
      setloader(false)
    },[])
    const values = {
      analysis,
      studentsData,
      batchData,
      dateFormat,
      userStatus: userStatus,
      role: user.role,
      hanldeSubmitStudentStatus,
      showModal, 
      form,
      isModalOpen, 
      handleNewCategoryCancel, 
      handleNewCategoryOk, 
      newCategory, handleNewCategoryChange, categories,
      removeCategory, editCategory,
      handleCancel,
      handleOk,
      contextHolder,
      loader,
    }
    return (
        <PageContext.Provider value={values}>
            <DashboardView />
        </PageContext.Provider>
  )
}

export default Dashboard