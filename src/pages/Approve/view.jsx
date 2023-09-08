import React, { useContext} from 'react'
import { PageContext } from '../../lib/PageContext'
import {  Table} from "antd"

export const ApproveView = () => {
  const {fetchPendingUser, users, columns, contextHolder} = useContext(PageContext);


  return (
    <div className='m-5'>
      {contextHolder}
      <Table dataSource={users} columns={columns} onChange={fetchPendingUser} pagination={false}></Table>
    </div>
  )
}
