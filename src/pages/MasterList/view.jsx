import React, { useContext, useState } from 'react'
import { PageContext } from '../../lib/PageContext'
import { Drawer, Select, Input, Button} from "antd"
import { CustomeTable } from '../../components/CustomeTable'
export const MasterListView = () => {
  const {users, onClose, open, userData ,loader, categories, fetchUsers} = useContext(PageContext)
  let options = [];
  const { Search } = Input;
  const [currentStatus, setCurrentStatus] = useState(null)

  const onSearch = (value) =>  fetchUsers(
    value, 
    currentStatus, 
    postsPerPage * (currentPage - 1), 
    postsPerPage 
  );

  categories.forEach(element => {
    options.push(element)
  });

  options.push({
    label : "ALL",
    value: "all",
    key: categories.length
  })

  const handleOptionChange = async (e) => {
    if(e === "all"){
      setCurrentStatus(null)
      await fetchUsers("", null, postsPerPage * (currentPage - 1), postsPerPage );
    }else{
      setCurrentStatus(e)
      await fetchUsers("", e, postsPerPage * (currentPage - 1), postsPerPage );
    }
  }

  const columns = [
    {
      title: 'LastName',
      index: 'lastName',
      isShow: true,
    },
    {
      title: 'First Name',
      index: 'firstName',
      isShow: true,
    },
    {
      title: 'Middle Name',
      index: 'middleName',
      isShow: true,
    }, 
    {
      title: 'Current Status',
      index: 'currentStatus',
      isShow: true,
    },
    {
      title: 'Batch',
      index: 'batch',
      isShow: true,
    },
    {
      title: 'Action',
      index: 'action',
      isShow: true,
    },
  ]

  const studentColumns = [   
    
    {
      title: 'Start Date',
      index: 'date',
      isShow: true,
    }, 
    {
      title: 'Category',
      index: 'category',
      isShow: true,
    },
    {
      title: 'Detail',
      index: 'detail',
      isShow: true,
    },
  ]

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10) 

  const onNextPage = async () => {
    if(users.length > postsPerPage) {
      await fetchUsers("", currentStatus , postsPerPage * (currentPage-1), postsPerPage )
      setCurrentPage(currentPage + 1)
    }
  }

  const onPrevPage = async () => {
    if(currentPage > 1){
      await fetchUsers("",currentStatus, postsPerPage * (currentPage-1), postsPerPage )
        setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='content-center'>
      <div className='m-5'>
        <div className='w-full flex justify-center m-5'>
          <Select
            style={
                {width: 120}
            }
            options={options}
            defaultValue={'ALL'}
            onChange={handleOptionChange}
          />
          <Search  placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <div>
          {!loader && 
          <>
          <CustomeTable dataSource={users} column={columns} />
          <div className='flex w-full justify-end h-11 my-5'>
          <div className='rounded-full p-[1px] border-green-500 border-[1px]'>
            <Button className='h-10 border-none bg-green-500 rounded-full text-white' onClick={onPrevPage} >{`<`}</Button>
              <span className='p-2'>{currentPage}</span>
            <Button className='h-10 border-none bg-green-500 rounded-full' onClick={onNextPage}>{`>`}</Button>
          </div>
        </div>
        </>
          }
        </div>
      </div>
      <Drawer width={520} title="Student Detail" placement="right" onClose={onClose} open={open}>
        <p className='font-semibold flex justify-between'>School ID: <span>{userData.schoolId}</span></p>
        <p className='font-semibold flex justify-between'>First Name: <span>{userData.firstName}</span></p>
        <p className='font-semibold flex justify-between'>Middle Name: <span>{userData.middleName}</span></p>
        <p className='font-semibold flex justify-between'>Last Name: <span>{userData.lastName}</span></p>
        <p className='font-semibold flex justify-between'>Role: <span className='uppercase'>{userData.role}</span></p>
        <h3 className='mt-2'>Statuses</h3>
        <div className='flex my-2'>
          {userData.status && <CustomeTable 
          column={studentColumns}
          dataSource={userData.status.map((s, index) => {
            return (
              {
                key: index,
                date: <p>{s.date.month}, {s.date.year}</p>,
                category:<p className='uppercase bold'>{s.category.name}</p>,
                detail: <p>{s.detail}</p>
              }
            )
          })} />}
        </div>
      </Drawer>
    </div>
  )
}
