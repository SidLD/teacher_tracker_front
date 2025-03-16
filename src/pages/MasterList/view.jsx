"use client"

import { useContext, useState } from "react"
import { PageContext } from "../../lib/PageContext"
import { Drawer, Select, Input, Modal } from "antd"
import { CustomeTable } from "../../components/CustomeTable"
import { SearchOutlined, LeftOutlined, RightOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons"

export const MasterListView = () => {
  const {
    users,
    onClose,
    open,
    userData,
    loader,
    categories,
    fetchUsers,
    deleteUser,
    setDeleteUser,
    handleDeleteUser,
    contextHolder,
  } = useContext(PageContext)
  const options = []
  const { Search } = Input
  const [currentStatus, setCurrentStatus] = useState(null)
  const [sortField, setSortField] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")

  const onSearch = (value) =>
    fetchUsers(value, currentStatus, postsPerPage * (currentPage - 1), postsPerPage, sortField, sortOrder)

  categories.forEach((element) => {
    options.push(element)
  })

  options.push({
    label: "ALL",
    value: "all",
    key: categories.length,
  })

  const handleOptionChange = async (e) => {
    if (e === "all") {
      setCurrentStatus(null)
      await fetchUsers("", null, postsPerPage * (currentPage - 1), postsPerPage, sortField, sortOrder)
    } else {
      setCurrentStatus(e)
      await fetchUsers("", e, postsPerPage * (currentPage - 1), postsPerPage, sortField, sortOrder)
    }
  }

  const handleSort = (field) => {
    const newSortOrder = field === sortField && sortOrder === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortOrder(newSortOrder)
  }

  const submitDeleteUser = async () => {
    if (await handleDeleteUser()) {
      await fetchUsers("", currentStatus, postsPerPage * (currentPage - 1), postsPerPage, sortField, sortOrder)
    }
  }

  const columns = [
    {
      title: "LastName",
      index: "lastName",
      isShow: true,
    },
    {
      title: "First Name",
      index: "firstName",
      isShow: true,
    },
    {
      title: "Middle Name",
      index: "middleName",
      isShow: true,
    },
    {
      title: "Position",
      index: "position",
      isShow: true,
    },
    {
      title: "Contact",
      index: "contact",
      isShow: true,
    },
    {
      title: "Email",
      index: "email",
      isShow: true,
    },
    {
      title: "Action",
      index: "action",
      isShow: true,
    },
  ]

  const studentColumns = [
    {
      title: "Start Date",
      index: "date",
      isShow: true,
    },
    {
      title: "Category",
      index: "category",
      isShow: true,
    },
    {
      title: "Detail",
      index: "detail",
      isShow: true,
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  // Add client-side sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    // Handle nested fields like position.name
    if (sortField === "position.name") {
      const aValue = a.position?.name || ""
      const bValue = b.position?.name || ""
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    // Handle date fields
    if (sortField === "createdAt") {
      const aDate = new Date(a.createdAt)
      const bDate = new Date(b.createdAt)
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate
    }

    // Handle regular fields
    const aValue = a[sortField] || ""
    const bValue = b[sortField] || ""

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue
  })

  const onNextPage = async () => {
    if (users.length > postsPerPage) {
      await fetchUsers("", currentStatus, postsPerPage * currentPage, postsPerPage, sortField, sortOrder)
      setCurrentPage(currentPage + 1)
    }
  }

  const onPrevPage = async () => {
    if (currentPage > 1) {
      await fetchUsers("", currentStatus, postsPerPage * (currentPage - 2), postsPerPage, sortField, sortOrder)
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="master-list-container">
      {contextHolder}

      <div className="master-list-content">
        <div className="master-list-header">
          <h1 className="master-list-title">Applicant Master List</h1>

          <div className="search-filter-container">
            <Select
              placeholder="Filter by category"
              style={{ width: "180px" }}
              options={options}
              defaultValue={"ALL"}
              onChange={handleOptionChange}
              className="category-filter"
            />

            <Search
              placeholder="Search students..."
              allowClear
              onSearch={onSearch}
              style={{ width: "220px" }}
              className="student-search"
              prefix={<SearchOutlined className="search-icon" />}
            />
          </div>
        </div>

        {loader ? (
          <div className="loader-container">
            <div className="loader-spinner"></div>
            <p className="loader-text">Loading Applicant data...</p>
          </div>
        ) : (
          <div className="table-container">
            <div className="table-header">
              <h2 className="table-title">Applicant Records</h2>
              <p className="table-subtitle">Manage and view detailed Applicant information</p>
              <div className="sort-controls">
                <span className="sort-label">Sort by:</span>
                <button
                  className={`sort-button ${sortField === "createdAt" ? "active" : ""}`}
                  onClick={() => handleSort("createdAt")}
                >
                  Date Created {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  className={`sort-button ${sortField === "position.name" ? "active" : ""}`}
                  onClick={() => handleSort("position.name")}
                >
                  Position {sortField === "position.name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
            </div>

            <div className="table-content">
              <CustomeTable dataSource={sortedUsers} column={columns} />
            </div>

            <div className="pagination-container">
              <p className="pagination-info">
                Showing <span className="pagination-count">{users.length}</span> students
              </p>

              <div className="pagination-controls">
                <button
                  onClick={onPrevPage}
                  disabled={currentPage <= 1}
                  className={`pagination-button ${currentPage <= 1 ? "pagination-button-disabled" : ""}`}
                  title={currentPage > 1 ? "Previous Page" : "No previous page"}
                >
                  <LeftOutlined />
                </button>

                <div className="pagination-current">{currentPage}</div>

                <button
                  onClick={onNextPage}
                  disabled={users.length < postsPerPage}
                  className={`pagination-button ${users.length < postsPerPage ? "pagination-button-disabled" : ""}`}
                  title={users.length > postsPerPage ? "Next Page" : "No more pages"}
                >
                  <RightOutlined />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Drawer
        width={520}
        title={
          <div className="drawer-title">
            <UserOutlined />
            <span>Applicant Details</span>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        className="student-detail-drawer"
      >
        <div className="student-info-card">
        <div className="student-info-header">
            <h3 className="student-info-title">Personal Information</h3>
            <div className="student-badge">Applicant</div>
          </div>

          <div className="student-info-content">
            <div className="student-info-row">
              <span className="student-info-label">School ID:</span>
              <span className="student-info-value">{userData.schoolId}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">First Name:</span>
              <span className="student-info-value">{userData.firstName}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">Middle Name:</span>
              <span className="student-info-value">{userData.middleName || "-"}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">Last Name:</span>
              <span className="student-info-value">{userData.lastName}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">Position Type:</span>
              <span className="student-role-badge">{userData?.position?.position.replace('_', ' ') || 'Not Set'}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">Position:</span>
              <span className="student-role-badge">{userData?.position?.name || 'Not Set'}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">Gender:</span>
              <span className="student-role-badge">{userData.gender || 'Not Set'}</span>
            </div>

            <div className="student-info-row">
              <span className="student-info-label">Age:</span>
              <span className="student-role-badge">{userData.age || 'Not Set'}</span>
            </div>
          </div>
        </div>

        {/* <div className="student-status-card">
          <div className="student-status-header">
            <h3 className="student-status-title">Status History</h3>
            <div className="status-count-badge">{userData.status?.length || 0}</div>
          </div>

          {userData.status && userData.status.length > 0 ? (
            <div className="student-status-table">
              <CustomeTable
                column={studentColumns}
                dataSource={userData.status.map((s, index) => ({
                  key: index,
                  date: (
                    <div className="date-badge">
                      {s.date.month}, {s.date.year}
                    </div>
                  ),
                  category: <div className="category-badge">{s.category.name}</div>,
                  detail: <p className="status-detail">{s.detail}</p>,
                }))}
              />
            </div>
          ) : (
            <div className="empty-status">
              <div className="empty-status-icon">i</div>
              <p>No status records found</p>
            </div>
          )}
        </div> */}
      </Drawer>

      <Modal
        open={deleteUser}
        onCancel={() => setDeleteUser(null)}
        onOk={submitDeleteUser}
        title={
          <div className="delete-modal-title">
            <DeleteOutlined />
            <span>Confirm Deletion</span>
          </div>
        }
        okText="Delete"
        okButtonProps={{
          className: "delete-confirm-button",
        }}
        cancelButtonProps={{
          className: "delete-cancel-button",
        }}
        className="delete-confirmation-modal"
      >
        <div className="delete-warning">
          <h3 className="delete-warning-title">Are you sure you want to delete this student?</h3>
          <p className="delete-warning-message">
            This action cannot be undone. All data associated with this student will be permanently removed.
          </p>
        </div>
      </Modal>

      <style jsx global>{`
        /* Main Container */
        .master-list-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
          padding: 24px;
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Header Styles */
        .master-list-content {
          margin-bottom: 24px;
        }
        
        .master-list-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
        }
        
        @media (min-width: 768px) {
          .master-list-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        .master-list-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin-bottom: 16px;
        }
        
        @media (min-width: 768px) {
          .master-list-title {
            margin-bottom: 0;
          }
        }
        
        /* Search and Filter */
        .search-filter-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        
        @media (min-width: 640px) {
          .search-filter-container {
            flex-direction: row;
            width: auto;
          }
        }
        
        .category-filter .ant-select-selector {
          border-radius: 6px !important;
          transition: all 0.3s !important;
        }
        
        .category-filter.ant-select-focused .ant-select-selector {
          border-color: #5b6af9 !important;
          box-shadow: 0 0 0 2px rgba(91, 106, 249, 0.2) !important;
        }
        
        .student-search .ant-input-affix-wrapper {
          border-radius: 6px !important;
          transition: all 0.3s !important;
        }
        
        .student-search .ant-input-affix-wrapper-focused {
          border-color: #5b6af9 !important;
          box-shadow: 0 0 0 2px rgba(91, 106, 249, 0.2) !important;
        }
        
        .search-icon {
          color: #aaa;
        }
        
        /* Loader */
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 0;
        }
        
        .loader-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #5b6af9;
          border-radius: 50%;
          margin-bottom: 16px;
          animation: spin 1s linear infinite;
        }
        
        .loader-text {
          color: #666;
        }
        
        /* Table Container */
        .table-container {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          border: 1px solid #e0e0e0;
          animation: slideUp 0.6s ease-out;
        }
        
        .table-header {
          padding: 16px;
          background-color: #f0f4ff;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .table-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }
        
        .table-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        
        .table-content {
          overflow: hidden;
        }
        
        /* Pagination */
        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-top: 1px solid #e0e0e0;
          background-color: #f9f9f9;
        }
        
        .pagination-info {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        
        .pagination-count {
          font-weight: 600;
        }
        
        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .pagination-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #5b6af9;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(91, 106, 249, 0.3);
        }
        
        .pagination-button:hover {
          background-color: #4a59e8;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(91, 106, 249, 0.4);
        }
        
        .pagination-button-disabled {
          background-color: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .pagination-button-disabled:hover {
          background-color: #e0e0e0;
          transform: none;
          box-shadow: none;
        }
        
        .pagination-current {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          padding: 0 12px;
          border-radius: 18px;
          background-color: white;
          color: #333;
          font-weight: 600;
          border: 1px solid #e0e0e0;
        }
        
        /* Drawer Styles */
        .drawer-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5b6af9;
        }
        
        .student-detail-drawer .ant-drawer-content-wrapper {
          box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
        }
        
        .student-detail-drawer .ant-drawer-header {
          border-bottom: 2px solid #e0e0e0;
        }
        
        .student-detail-drawer .ant-drawer-body {
          padding: 16px;
          background-color: #f9fafb;
        }
        
        /* Student Info Card */
        .student-info-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          margin-bottom: 16px;
          border: 1px solid #e0e0e0;
          animation: fadeIn 0.5s ease-out;
        }
        
        .student-info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .student-info-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .student-badge {
          padding: 4px 12px;
          background-color: #5b6af9;
          color: white;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .student-info-content {
          padding: 16px;
        }
        
        .student-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .student-info-row:last-child {
          border-bottom: none;
        }
        
        .student-info-label {
          color: #666;
        }
        
        .student-info-value {
          font-weight: 500;
          color: #333;
        }
        
        .student-role-badge {
          text-transform: uppercase;
          font-weight: 600;
          padding: 4px 12px;
          background-color: #f0f4ff;
          color: #5b6af9;
          border-radius: 16px;
          font-size: 12px;
        }
        
        /* Status Card */
        .student-status-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border: 1px solid #e0e0e0;
          animation: fadeIn 0.5s ease-out;
        }
        
        .student-status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .student-status-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .status-count-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: #5b6af9;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
        }
        
        .student-status-table {
          overflow: hidden;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e0e0e0;
        }
        
        .date-badge {
          padding: 4px 8px;
          background-color: #e6f7ff;
          color: #1890ff;
          border-radius: 4px;
          font-size: 12px;
          display: inline-block;
        }
        
        .category-badge {
          padding: 4px 8px;
          background-color: #f9f0ff;
          color: #722ed1;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          display: inline-block;
        }
        
        .status-detail {
          color: #333;
          margin: 0;
        }
        
        .empty-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 0;
          color: #666;
        }
        
        .empty-status-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f0f0f0;
          color: #999;
          font-style: italic;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        /* Delete Modal */
        .delete-modal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f5222d;
        }
        
        .delete-warning {
          padding: 16px;
          background-color: #fff1f0;
          border-radius: 8px;
          border-left: 4px solid #ff4d4f;
          margin-bottom: 16px;
        }
        
        .delete-warning-title {
          font-size: 16px;
          font-weight: 600;
          color: #cf1322;
          margin: 0 0 8px 0;
        }
        
        .delete-warning-message {
          color: #f5222d;
          margin: 0;
        }
        
        .delete-confirm-button {
          background-color: #ff4d4f !important;
          border-color: #ff4d4f !important;
        }
        
        .delete-cancel-button {
          border-color: #d9d9d9 !important;
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Sort Controls */
        .sort-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
        }

        .sort-label {
          font-size: 14px;
          color: #666;
        }

        .sort-button {
          padding: 6px 12px;
          background-color: #f0f4ff;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          color: #666;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sort-button:hover {
          background-color: #e6ebff;
          color: #5b6af9;
        }

        .sort-button.active {
          background-color: #5b6af9;
          color: white;
          border-color: #5b6af9;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .view-button {
          padding: 4px 12px;
          background-color: #5b6af9;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
        }

        .view-button:hover {
          background-color: #4a59e8;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(91, 106, 249, 0.3);
        }

        .delete-button {
          padding: 4px 12px;
          background-color: #ff4d4f;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
        }

        .delete-button:hover {
          background-color: #cf1322;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(207, 19, 34, 0.3);
        }
      `}</style>
    </div>
  )
}

