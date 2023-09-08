import React, {useState} from 'react'

import {Button, Modal, Input, Form } from "antd"
export const CustomeCategory = ({name, id, deleteCategory, editCategory}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState()

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
    return (
        <tr className="border-b border-green-600">
            <td>{name}</td>
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
