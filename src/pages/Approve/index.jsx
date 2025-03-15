import React, {useState, useEffect, useContext} from 'react'
import { PageContext, AppContext } from '../../lib/PageContext'
import { ApproveView } from './view'
import { deleteUser, getPendingUser, approveUser } from '../../lib/api'
import { Button, message } from 'antd'

export const Approve = () => {  
  const [users, setUsers] = useState([])
  
  const { fetchNotificationCount} = useContext(AppContext)
  const [messageApi, contextHolder] = message.useMessage();

  const fetchPendingUser = async () => {
    try {
      const data = await getPendingUser();
      const dataSource = data.data.data.map((user, index) => {
      return {
        key: index,
        position: <span className='uppercase'>{user.position.name}</span>,
        contact: user.contact,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        middleName: user.middleName,
        action: <div className='flex'>
          <Button className='text-red-900 ' onClick={() => {
            removePendingUser(user._id)
          }} >Delete</Button>
          <Button onClick={() => {
            admitPendingUser(user._id)
          }} >Admit</Button>
        </div>
      }
      })
      setUsers(dataSource);
    } catch (error) {
      warning("No Users")
      setUsers([])
    }
  }
  const removePendingUser = async (e) => {
    try {
      const payload = {
        userId : e
      }
      const res = await deleteUser(payload)
      if(res.data.data.acknowledged){
        fetchNotificationCount()
        success("Delete Success")
        await fetchPendingUser()
      }
    } catch (error) {
      console.log(error) 
    }
  }
  const admitPendingUser = async (e) => {
    try {
      const payload = {
        userId: e
      }
      const res = await approveUser(payload)
      if(res.data){
        
        fetchNotificationCount()
        success("Admit Success")
        await fetchPendingUser()
      }
    } catch (error) {
      console.log(error) 
    }
  }
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
  const columns = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ]
  useEffect(() => {
    fetchPendingUser()
  }, [])
  const values = {
    fetchPendingUser,
    users: users,
    columns: columns,
    contextHolder
  }
  return (
    <PageContext.Provider value={values}>
        <ApproveView />
    </PageContext.Provider>
  )
}
