import { Layout, Menu, ConfigProvider, Button } from 'antd'
import { HomeOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import antdTheme from '@/theme'

const {Header, Footer, Content, Sider} = Layout

const siderStyle = {
  backgroundColor: "#4b80f9",
  height: "100vh",
}

const title = {
  height: '64px',
  lineHeight: '64px',
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "1px solid #93b4ff",
}

const header = {
  backgroundColor: "#eee",
  paddingLeft: "15px"  
}

// Menu 自定义样式
const menuStyle = {
  backgroundColor: '#4b80f9', // 菜单整体背景色
  border: 'none',
}

const collapsedIcon = {
  fontSize: '18px'
}

// 菜单栏
const menuItem = [{
  key: '1',  // 改为字符串，与 defaultSelectedKeys 保持一致
  icon: <HomeOutlined />,
  label: 'Home',
  path: 'home',
}, {
  key: '2',
  icon: <UserOutlined />,
  label: 'User',
  path: 'user',
}]


const Slide = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState(['1'])

  // 根据当前路由设置选中的菜单项
  useEffect(() => {
    const currentPath = location.pathname.substring(1) // 去掉开头的 /
    const currentItem = menuItem.find(item => item.path === currentPath)
    if (currentItem) {
      setSelectedKeys([currentItem.key])
    }
  }, [location.pathname])

  // 处理菜单点击事件
  const handleMenuClick = ({ key }) => {
    const clickedItem = menuItem.find(item => item.key === key)
    if (clickedItem) {
      navigate(`/${clickedItem.path}`)
    }
  }

  return (
    <ConfigProvider
      theme={antdTheme}
    >
      <Layout>
        <Sider 
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={siderStyle}>
          <div style={title}>Title</div>
          <Menu 
            mode="inline" 
            selectedKeys={selectedKeys}
            items={menuItem}
            style={menuStyle}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header style={header}>
            <Button 
              type='text' 
              icon={collapsed ? <MenuUnfoldOutlined style={collapsedIcon} /> : <MenuFoldOutlined style={collapsedIcon} />} 
              onClick={() => setCollapsed(!collapsed)} 
            />
          </Header>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React Admin ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default Slide