import React, {useEffect, useState} from 'react'

import {Button, Modal, Input, Form } from "antd"
import { getStudentsCount } from '../lib/api';
export const CustomeCategory = ({name, id, deleteCategory, editCategory}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState()
  const [countStudents, setCountStudents] = useState(0)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const payload = {
      categoryId: id,
      name: categoryName,
    }
    editCategory(payload)
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const removeCategory = async () => {
    await deleteCategory(id)
  }
  const hanldeCategoryChange = (e) => {
    setCategoryName(e.target.value)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getStudentsCount({id: id})
        setCountStudents(result.data.data)
      } catch (error) {
        setCountStudents(0)
      }
    }
    getData()
  }, [])
    return (
        <tr className="border-b border-green-600">
            <td>{name}</td>
            <td>{countStudents}</td>
            <td>
            <Button onClick={showModal}>
                Edit Category
            </Button>
            {/* <Button onClick={removeCategory}>Delete
            </Button> */}
            </td>

            <Modal title="Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form>
              <Form.Item label="New Name">
                <Input onChange={hanldeCategoryChange} />
            </Form.Item>
            </Form>
          </Modal>
        </tr>
    )
}
