"use client"

import { useContext } from "react"
import { PageContext } from "../../lib/PageContext"
import { Table, Empty, Spin } from "antd"

export const ApproveView = () => {
  const { fetchPendingUser, users, columns, contextHolder } = useContext(PageContext)

  return (
    <div className="approve-container">
      {contextHolder}

      <div className="approve-header">
        <div className="approve-title-section">
          <h1 className="approve-title">Applicant Approval Dashboard</h1>
          <p className="approve-subtitle">Review and manage pending candidate approval requests</p>
        </div>

        <div className="approve-stats">
          <div className="stat-item">
            <span className="stat-value">{users?.length || 0}</span>
            <span className="stat-label">Pending Requests</span>
          </div>
        </div>
      </div>

      <div className="approve-content">
        <div className="table-container">
          {users === undefined ? (
            <div className="loading-container">
              <Spin size="large" />
              <p className="loading-text">Loading approval requests...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-container">
              <Empty description="No pending approval requests" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              <p className="empty-text">All user requests have been processed</p>
            </div>
          ) : (
            <Table
              dataSource={users}
              columns={columns}
              onChange={fetchPendingUser}
              pagination={false}
              className="approval-table"
              rowClassName="table-row"
              locale={{
                emptyText: (
                  <div className="empty-container">
                    <Empty description="No pending approval requests" />
                    <p className="empty-text">All user requests have been processed</p>
                  </div>
                ),
              }}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        /* Main Container */
        .approve-container {
          padding: 24px;
          background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
          min-height: calc(100vh - 64px);
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Header Section */
        .approve-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
        }
        
        @media (min-width: 768px) {
          .approve-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        .approve-title-section {
          margin-bottom: 16px;
        }
        
        @media (min-width: 768px) {
          .approve-title-section {
            margin-bottom: 0;
          }
        }
        
        .approve-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0 0 8px 0;
        }
        
        .approve-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        
        .approve-stats {
          display: flex;
          gap: 16px;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f0f4ff;
          padding: 12px 24px;
          border-radius: 8px;
          border-left: 4px solid #5b6af9;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #5b6af9;
        }
        
        .stat-label {
          font-size: 12px;
          color: #666;
        }
        
        /* Content Section */
        .approve-content {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #e0e0e0;
          animation: slideUp 0.6s ease-out;
        }
        
        .table-container {
          min-height: 300px;
        }
        
        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 0;
        }
        
        .loading-text {
          margin-top: 16px;
          color: #666;
        }
        
        /* Empty State */
        .empty-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 0;
        }
        
        .empty-text {
          margin-top: 16px;
          color: #666;
        }
        
        /* Table Styling */
        .approval-table {
          width: 100%;
        }
        
        .approval-table .ant-table {
          background-color: transparent;
        }
        
        .approval-table .ant-table-thead > tr > th {
          background-color: #f0f4ff;
          color: #333;
          font-weight: 600;
          border-bottom: 2px solid #5b6af9;
          padding: 16px;
        }
        
        .approval-table .ant-table-tbody > tr > td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .approval-table .ant-table-tbody > tr:hover > td {
          background-color: #f9f9ff;
        }
        
        .approval-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }
        
        .approval-table .ant-btn {
          border-radius: 6px;
          transition: all 0.3s;
        }
        
        .approval-table .ant-btn-primary {
          background-color: #5b6af9;
          border-color: #5b6af9;
        }
        
        .approval-table .ant-btn-primary:hover {
          background-color: #4a59e8;
          border-color: #4a59e8;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(91, 106, 249, 0.3);
        }
        
        .approval-table .ant-btn-default {
          border-color: #d9d9d9;
        }
        
        .approval-table .ant-btn-default:hover {
          border-color: #5b6af9;
          color: #5b6af9;
        }
        
        .approval-table .ant-btn-dangerous {
          color: #ff4d4f;
          border-color: #ff4d4f;
        }
        
        .approval-table .ant-btn-dangerous:hover {
          background-color: #ff4d4f;
          color: white;
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
      `}</style>
    </div>
  )
}

