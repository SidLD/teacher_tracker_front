import { NavLink, Outlet, useNavigate} from "react-router-dom";
import {Drawer, Layout} from "antd"
import {Menu, Badge,} from "antd"
import {auth,} from '../lib/services'
import { useState, useEffect } from "react";
import {getPendingUser} from '../lib/api'
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined, 
  CloseOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
import { AppContext } from "../lib/PageContext";


const RootLayout = () => {
  const {Footer, Header} = Layout
  const navigate = useNavigate();
  const [notifactionCount, setNotificationCount] = useState()
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
      icon: 
        <>
        <Badge count={notifactionCount} className="absolute top-3"/>
        <BellOutlined />
        </>,
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
  ];

  const [open, setOpen] = useState(false);
  
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchNotificationCount = async() => {
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
  }, [])

  return (
     <div>
       <Header className="flex bg-green-900 text-gray-100 justify-between h-18 items-center">
            <div className="uppercase bold text-white">
                <h1 onClick={() => {
                  navigate("/dashboard")
                }}>{auth.getRole()}</h1>
            </div>
            <nav className="flex tablet-max:hidden">
              {items.map((item, index) => {
                return (
                  item.accounttype.includes(auth.getRole()) &&
                  <NavLink key={index} 
                    to={item.key}
                  className="p-1 h-10 flex items-center rounded-md hover:bg-green-200"
                >
                    {item.icon}
                    <p className="mx-1 ">{item.label}</p>
                  </NavLink>

                )
              })}
            </nav>
            <Drawer title="Menu" placement="right" onClose={onClose} open={open} width={200} >
              <Menu 
                onClick={({key}) => {
                    navigate(key)
                  }}
                items={items.filter((e) => e.accounttype.includes(auth.getRole()))} 
                className="absolute left-0 top-16"
              />
            </Drawer>
           <div 
            className=" tablet-min:hidden"
            onClick={() => {
            showDrawer()
            }}>
              {!open ? <MenuFoldOutlined /> : <CloseOutlined />}
           </div>
       </Header>
       <Layout style={{ margin: 0, padding: 0 }}>
          <Content style={{ margin: 0, padding: 0 }}>
            <AppContext.Provider value={{fetchNotificationCount}}>
            <Outlet />
            </AppContext.Provider>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            All Rights Reserved™ 2023
          </Footer>
        </Layout>
      
     </div>
    );
}

export default RootLayout;