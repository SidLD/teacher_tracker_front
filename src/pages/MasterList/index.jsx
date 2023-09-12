import React, { useEffect, useState } from 'react'
import { PageContext } from '../../lib/PageContext'
import { MasterListView } from './view'
import { getCategory, getUser, getUserStatus, getUsers } from '../../lib/api'
import { Button } from 'antd'
import { auth } from '../../lib/services'

export const MasterList = () => {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({})
  const [loader, setloader] = useState(true)
  const [categories, setCategories] = useState([{name: ""}])

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
  const showDrawer = async (e) => {
    const result = await getUser({userId: e})
    const data = result.data.data
    let sorted = await getUserStatus({userId: data._id})
    sorted = sorted.data.data.map((temp) => {
      temp.date = dateFormat(temp.date)
      return temp
    })
    data.status = sorted
    setUserData(data)
    setOpen(true);
  };
  const fetchCategory = async (e) => {
    try {
        const res = await getCategory()
        setCategories(res.data.data.map((c, index) => {
          return (
            {
              label: c.name,
              value: c._id,
              key: index
            }
          )
        }))
      } catch (error) {
        return null
    }
}
  const onClose = () => {
    setOpen(false);
  };
  const fetchUsers = async (query, currentStatus, start, limit) => {
    try {
      const payload = { 
        role: "student", 
        currentStatus: currentStatus, 
        search: query, 
        start, 
        limit
      }

      const result = await getUsers(payload)
      const tempUser = result.data.data.map((user, index) => {
        return {
          key: index,
          currentStatus: user.currentStatus ? user.currentStatus.name : "Not Set",
          lastName: user.lastName,
          firstName: user.firstName,
          middleName: user.middleName,
          batch: user.batch,
          action: <Button
            style={
                    {width: "50%",
                    color: 'black',
                    border: '1px solid green'
                }
            }
            className='active:text-gray-100 hover:bg-green-900 '
            onClick={() => {
              showDrawer(user._id)
            }}  
          >View Data</Button>
        }
      })
      setUsers(tempUser)
    } catch (error) {
      setUsers([])
    }
  }

  useEffect(() => {
    fetchUsers("", null, 0, 10)
    fetchCategory()
    setloader(false)
  }, [])
  const values = {
    categories,
    loader,
    users,
    open,
    userData,
    showDrawer,
    onClose,
    fetchUsers

  }
  return (
    <PageContext.Provider value={values}>
        <MasterListView />
    </PageContext.Provider>
  )
}
