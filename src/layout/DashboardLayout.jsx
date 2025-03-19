"use client"

import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Drawer, Layout } from "antd"
import { Menu, Badge } from "antd"
import { auth } from "../lib/services"
import { useState, useEffect } from "react"
import { getPendingUser } from "../lib/api"
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  CloseOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons"
import { AppContext } from "../lib/PageContext"

const RootLayout = () => {
  const { Footer, Header } = Layout
  const navigate = useNavigate()
  const [notifactionCount, setNotificationCount] = useState()
  const [activeKey, setActiveKey] = useState("dashboard")

  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      accounttype: ["teacher", "superadmin", "student"],
    },
    {
      key: "masterlist",
      label: "Master List",
      icon: <TeamOutlined />,
      accounttype: ["teacher", "superadmin"],
    },
    {
      key: "approve",
      label: "Approval Page",
      icon: (
        <>
          <Badge count={notifactionCount} className="absolute right-0 z-10 scale-75 top-3 animate-pulse" />
          <BellOutlined />
        </>
      ),
      accounttype: ["teacher", "superadmin"],
    },
    {
      key: "setting",
      label: "Setting",
      icon: <SettingOutlined />,
      accounttype: ["student", "teacher", "superadmin"],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      accounttype: ["teacher", "superadmin", "student"],
    },
  ]

  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const fetchNotificationCount = async () => {
    try {
      const result = await getPendingUser()
      setNotificationCount(result.data.data.length)
    } catch (error) {
      console.log(error)
      setNotificationCount(0)
    }
  }

  useEffect(() => {
    fetchNotificationCount()

    // Set active key based on current path
    const path = window.location.pathname.split("/")[1] || "dashboard"
    setActiveKey(path)
  }, [])

  const handleNavClick = (key) => {
    setActiveKey(key)
    if (open) {
      onClose()
    }
  }

  return (
    <div className="root-layout">
      <header className="main-header">
        <div className="header-container">
          <div
            className="logo-container"
            onClick={() => {
              navigate("/dashboard")
              setActiveKey("dashboard")
            }}
          >
            <div className="avatar-circle">{auth.getRole().charAt(0).toUpperCase()}</div>
            <div className="logo-text">
              <h1 className="role-title">{auth.getRole()}</h1>
              <span className="role-subtitle">Portal</span>
            </div>
          </div>

          <nav className="desktop-nav">
            {items.map((item, index) => {
              if (!item.accounttype.includes(auth.getRole())) return null

              const isActive = activeKey === item.key

              return (
                <NavLink
                  key={index}
                  to={item.key}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  onClick={() => handleNavClick(item.key)}
                >
                  <span className={`nav-icon ${isActive ? "nav-icon-active" : ""}`}>{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActive && <span className="active-indicator"></span>}
                </NavLink>
              )
            })}
          </nav>

          <div className="mobile-menu-button" onClick={showDrawer}>
            {!open ? <MenuFoldOutlined /> : <CloseOutlined />}
          </div>
        </div>
      </header>

      <div className="breadcrumb-bar">
        <div className="breadcrumb-container">
          <AppstoreOutlined className="breadcrumb-icon" />
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current">{activeKey.charAt(0).toUpperCase() + activeKey.slice(1)}</span>
        </div>
      </div>

      <Drawer
        title={
          <div className="drawer-header">
            <div className="drawer-avatar">{auth.getRole().charAt(0).toUpperCase()}</div>
            <div className="drawer-title">
              <span className="drawer-role">{auth.getRole()}</span>
              <span className="drawer-menu">Menu</span>
            </div>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        width={280}
        className="mobile-drawer"
      >
        <div className="drawer-user-info">
          <UserOutlined className="drawer-user-icon" />
          <div className="drawer-user-details">
            <span className="drawer-user-role">{auth.getRole()}</span>
            <span className="drawer-user-status">Online</span>
          </div>
        </div>

        <Menu
          onClick={({ key }) => {
            navigate(key)
            setActiveKey(key)
            onClose()
          }}
          selectedKeys={[activeKey]}
          items={items.filter((e) => e.accounttype.includes(auth.getRole()))}
          className="drawer-menu"
        />
      </Drawer>

      <main className="main-content">
        <AppContext.Provider value={{ fetchNotificationCount }}>
          <div className="content-container">
            <Outlet />
          </div>
        </AppContext.Provider>
      </main>

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-content">
            <p className="copyright">© All Rights Reserved™ 2023</p>
            <p className="powered-by">Powered by {auth.getRole()} Portal</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              Help Center
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f0f5ff;
        }
        
        .root-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f0f5ff;
         
        }
        
        /* Header Styles */
        .main-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 0;
          height: auto;
        }
        
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
        
        .logo-container:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .avatar-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.8);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        
        .role-title {
          color: white;
          font-size: 1.125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1.2;
        }
        
        .role-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        /* Navigation Styles */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 0.25rem;
        }
        
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex;
          }
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.625rem 1rem;
          border-radius: 0.375rem;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .nav-link-active {
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .nav-icon {
          margin-right: 0.5rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .nav-icon-active {
          animation: bounce 2s infinite;
        }
        
        .nav-label {
          white-space: nowrap;
          font-size: 0.9375rem;
        }
        
        .active-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          border-radius: 3px 3px 0 0;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.25rem;
        }
        
        .mobile-menu-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        @media (min-width: 1024px) {
          .mobile-menu-button {
            display: none;
          }
        }
        
        /* Breadcrumb Styles */
        .breadcrumb-bar {
          background-color: white;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .breadcrumb-container {
          display: flex;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .breadcrumb-icon {
          color: #3b82f6;
          margin-right: 0.5rem;
        }
        
        .breadcrumb-divider {
          margin: 0 0.5rem;
          color: #d1d5db;
        }
        
        .breadcrumb-current {
          font-weight: 500;
          color: #1f2937;
        }
        
        /* Drawer Styles */
        .mobile-drawer .ant-drawer-content-wrapper {
          box-shadow: -8px 0 16px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-drawer .ant-drawer-header {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f8fafc;
        }
        
        .mobile-drawer .ant-drawer-body {
          padding: 0;
        }
        
        .drawer-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .drawer-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        
        .drawer-title {
          display: flex;
          flex-direction: column;
        }
        
        .drawer-role {
          font-weight: 600;
          color: #1e40af;
          text-transform: capitalize;
          font-size: 1rem;
        }
        
        .drawer-menu {
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .drawer-user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background-color: #f0f5ff;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .drawer-user-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background-color: #dbeafe;
          color: #3b82f6;
          border-radius: 50%;
          font-size: 1.25rem;
        }
        
        .drawer-user-details {
          display: flex;
          flex-direction: column;
        }
        
        .drawer-user-role {
          font-weight: 500;
          color: #1f2937;
          text-transform: capitalize;
        }
        
        .drawer-user-status {
          font-size: 0.75rem;
          color: #10b981;
          display: flex;
          align-items: center;
        }
        
        .drawer-user-status::before {
          content: "";
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #10b981;
          border-radius: 50%;
          margin-right: 0.25rem;
        }
        
        .drawer-menu {
          border-right: none !important;
        }
        
        .drawer-menu .ant-menu-item {
          margin: 0 !important;
          border-radius: 0 !important;
        }
        
        .drawer-menu .ant-menu-item-selected {
          background-color: #eff6ff !important;
          color: #3b82f6 !important;
          font-weight: 500;
        }
        
        .drawer-menu .ant-menu-item-selected::after {
          border-right: 3px solid #3b82f6 !important;
        }
        
        /* Main Content Styles */
        .main-content {
          flex: 1;
          background-color: transparent;
          margin: 0;
          padding: 0;
        }
        
        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem;
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Footer Styles */
        .main-footer {
          background-color: white;
          border-top: 1px solid #e5e7eb;
          padding: 1.5rem;
          margin-top: auto;
        }
        
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .footer-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        
        .footer-content {
          text-align: center;
        }
        
        @media (min-width: 768px) {
          .footer-content {
            text-align: left;
          }
        }
        
        .copyright {
          color: #4b5563;
          font-size: 0.875rem;
          margin: 0;
        }
        
        .powered-by {
          color: #9ca3af;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        
        .footer-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .footer-link {
          color: #6b7280;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .footer-link:hover {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Ant Design Overrides */
        .ant-badge-count {
          background-color: #ef4444 !important;
          box-shadow: 0 0 0 2px #1e3a8a !important;
        }
        
        .ant-menu-light .ant-menu-item-selected {
          background-color: #eff6ff !important;
          color: #3b82f6 !important;
        }
        
        .ant-menu-light .ant-menu-item:hover {
          color: #3b82f6 !important;
        }
        
        .ant-drawer-title {
          margin: 0 !important;
        }
      `}</style>
    </div>
  )
}

export default RootLayout

