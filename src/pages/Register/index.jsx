import React from 'react'
import { PageContext } from '../../lib/PageContext'
import RegisterView from './view'
import {register} from "../../lib/api"
import { message } from 'antd'

export default function Register() {
  
  const [messageApi, contextHolder] = message.useMessage();
    const handleSubmit = async(e) => {
        const payload = {
          password: e.password,
          email: e.email,
          firstName: e.firstName,
          lastName: e.lastName,
          middleName: e.middleName,
          age: e.age,
          gender: e.gender,
          role: e.role,
          batch: e.batch
        };

        try {
          const data = await register(payload)
          if(data.data){
            success("User Registered. Please Wait for Admin Approval")
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
        contextHolder
      };
  return (
    <PageContext.Provider value={values}>
    <RegisterView />
  </PageContext.Provider>
  )
}
