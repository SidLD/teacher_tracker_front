import React, { useEffect, useState } from 'react'
import { PageContext } from '../../lib/PageContext'
import { MasterListView } from './view'
import { getCategory, getUser, getUserStatus, getUsers , deleteUser as deleteUserAPI} from '../../lib/api'
import { Button, message } from 'antd'

export const MasterList = () => {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({})
  const [deleteUser, setDeleteUser] = useState(null)
  const [loader, setloader] = useState(true)
  const [categories, setCategories] = useState([{name: ""}])
  const [messageApi, contextHolder] = message.useMessage();

  const alert = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };


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
    setUserData(e)
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

  const fetchUsers = async (query, currentStatus, start, limit, sortField = null, sortOrder = null)=> {
    try {
      const payload = { 
        role: "TEACHER", 
        currentStatus: currentStatus, 
        search: query, 
        start, 
        limit,
        sortField,
        sortOrder
      }

      const result = await getUsers(payload)
      const tempUser = result.data.data.map((user, index) => {
        return {
          key: index,
          employeeId: user.employeeId,
          position: user.position ? user.position.name : "Not Set",
          lastName: user.lastName,
          firstName: user.firstName,
          middleName: user.middleName,
          contact: user.contact,
          email: user.email,
          birthDate: user.birthDate,
          action: <div className='flex flex-row justify-center gap-3 mx-2'>
          <Button
            style={
                    {width: "100%",
                    color: 'black',
                    border: '1px solid green'
                }
            }
            className='active:text-gray-100 hover:bg-green-900 '
            onClick={() => {
              showDrawer(user)
            }}  
          >View Data</Button>
          <Button
            style={
                    {width: "100%",
                    color: 'black',
                }
            }
            className='bg-red-500 active:text-gray-100 '
            onClick={() => {
              setDeleteUser(user)
            }}  
          >Delete User</Button>
          </div>
        }
      })
      setUsers(tempUser)
    } catch (error) {
      setUsers([])
    }
  }

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUserAPI(deleteUser)
      
      setDeleteUser(null)
      if(result.data.data) {
        alert('success', 'Success')
        return true
      }else{
        alert('warning', 'Access Denied')
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    fetchUsers("", null, 0, 10, 'createdAt', 'desc')
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
    fetchUsers,
    deleteUser,
    setDeleteUser,
    handleDeleteUser,
    contextHolder
  }
  return (
    <PageContext.Provider value={values}>
        <MasterListView />
    </PageContext.Provider>
  )
}
