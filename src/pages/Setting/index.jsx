import React, { useEffect, useState } from 'react'
import { PageContext } from '../../lib/PageContext'
import { SettingView } from './view'
import { auth } from '../../lib/services'
import { getUser, updateUserData } from '../../lib/api'

import {
  Form,
} from 'antd';

export const Setting = () => {
    const user = auth.getUserInfo()
    const [loader, setloader] = useState(true)
    const [ form ] = Form.useForm()
    const updateUser = async (e) => {
      try {
        const payload = {
          userId: user.id,
          firstName : e.firstName,
          middleName: e.middleName,
          lastName : e.lastName,
          gender: e.gender,
          email: e.email,
          batch: e.batch,
          age: e.age
        }
        const res = await updateUserData(payload)
        return res;
      } catch (error) {
        alert(error.message)
        return null
      }
      

    }
    const fetchUser = async (e) => {
      try {
        const res = await getUser({userId: user.id})
        return res.data.data
      } catch (error) {
        alert(error.response.data.data)
        return null
      }
    }
    const renderData = async () => {
      const res =  await fetchUser()
          if(res){
              form.setFieldsValue({
                  firstName: res.firstName ? res.firstName : "",
                  lastName: res.lastName  ? res.lastName : "",
                  middleName: res.middleName ?  res.middleName : "",
                  gender: res.gender ?  res.gender : "",
                  age: res.age ?  res.age : "",
                  batch: res.batch ?  res.batch : "",
                  email: res.email ?  res.email : ""
              })
          }
      }
    useEffect( () => {
        renderData()
        
        setloader(false)
  }, [form, fetchUser]);
    const values = {
        id: user.id,
        updateUser,
        fetchUser,
        loader,
        form
    }
  return (
    <PageContext.Provider value={values}>
        <SettingView />
    </PageContext.Provider>
  )
}
