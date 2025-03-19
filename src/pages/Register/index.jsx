import React, { useEffect, useState } from 'react'
import { PageContext } from '../../lib/PageContext'
import RegisterView from './view'
import {getCategory, register} from "../../lib/api"
import { message } from 'antd'

export default function Register() {
      useEffect(() => {
        fetchCategory()
      }, [])
      const [messageApi, contextHolder] = message.useMessage();
      const [categories, setCategories] = useState([{name: "", position: ""}])
      const fetchCategory = async (e) => {
          try {
              const res = await getCategory()
              setCategories(res.data.data)
            } catch (error) {
              return null
          }
      }
    const handleSubmit = async(e) => {
        const payload = {
          password: e.password,
          email: e.email,
          contact: e.contact,
          firstName: e.firstName,
          lastName: e.lastName,
          middleName: e.middleName,
          age: e.age,
          gender: e.gender,
          role: e.role,
          batch: e.batch,
          position: e.position,
          birthDate: e.birthDate
        };

        try {
          const data = await register(payload)
          if(data.data){
            success("User Registered")
            setTimeout(() => {
              window.location.href = "/login"
            }, 2000)

          }else{
            warning("User Already Exist")
          }
        } catch (error) { 
          warning("User Already Exist")
        }
      };
      
      const warning = (data) => {
        messageApi.open({
          type: 'warning',
          content: data,
        });
      };
      const success = (data) => {
        messageApi.open({
          type: 'success',
          content: data,
        });
      };
      const values = {
        handleSubmit,
        contextHolder,
        categories
      };
  return (
    <PageContext.Provider value={values}>
    <RegisterView />
  </PageContext.Provider>
  )
}
