import { Layout, Menu, ConfigProvider, Button, Tabs } from 'antd'
import {
  TableOutlined,
  CreditCardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  PictureOutlined
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import antdTheme from '@/theme'

const { Header, Footer, Content, Sider } = Layout

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
  paddingLeft: "15px",
  display: "flex",
  alignItems: "center",
}

const tabsContainer = {
  backgroundColor: "#fff",
  padding: "0 16px",
}

// Menu 自定义样式
const menuStyle = {
  backgroundColor: '#4b80f9', // 菜单整体背景色
  border: 'none',
}

const collapsedIcon = {
  fontSize: '18px'
}

const content = {
  padding: '20px',
  minHeight: 280,
}

const tabsStyle = {
  marginTop: '15px',
}

const footer = {
  backgroundColor: '#eee',
  textAlign: "center",
  fontSize: 14,
  color: "#555"
}

// 菜单栏
const menuItem = [{
  key: '1',  // 改为字符串，与 defaultSelectedKeys 保持一致
  icon: <TableOutlined />,
  label: 'Table',
  path: 'Table',
}, {
  key: '2',
  icon: <CreditCardOutlined />,
  label: 'Card',
  path: 'Card',
}, {
  key: '3',
  icon: <MenuOutlined />,
  label: 'Menu',
  children: [{
    key: '3-1',
    label: 'Menu',
    path: 'Menu',
  }]
}, {
  key: '4',
  icon: <PictureOutlined />,
  label: 'Carousel',
  children: [{
    key: '4-1',
    label: 'Carousel',
    path: 'Carousel',
  }]
}]


const Slide = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState(['1'])
  const [openKeys, setOpenKeys] = useState([]) // 控制展开的菜单
  const [tabs, setTabs] = useState([
    // 默认打开 Table 标签页
    { key: 'Table', label: 'Table', path: 'Table' }
  ])
  const [activeTabKey, setActiveTabKey] = useState('Table')


  // 获取所有根级父菜单的 keys（用于手风琴效果）
  const rootSubmenuKeys = menuItem
    .filter(item => item.children && item.children.length > 0)
    .map(item => item.key)

  // 递归查找菜单项（支持多级菜单）
  const findMenuItem = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item
      }
      if (item.children) {
        const found = findMenuItem(item.children, key)
        if (found) return found
      }
    }
    return null
  }

  // 根据路径查找菜单项和父级key
  const findMenuByPath = (items, path, parentKey = null) => {
    for (const item of items) {
      if (item.path === path) {
        return { item, parentKey }
      }
      if (item.children) {
        const found = findMenuByPath(item.children, path, item.key)
        if (found) return found
      }
    }
    return null
  }

  // 根据当前路由设置选中的菜单项和标签页
  useEffect(() => {
    const currentPath = location.pathname.substring(1) || 'Table' // 去掉开头的 /，默认为 Table
    const result = findMenuByPath(menuItem, currentPath)
    
    if (result) {
      setSelectedKeys([result.item.key])
      // 如果是子菜单，自动展开父菜单（仅在非折叠状态下）
      if (result.parentKey && !collapsed) {
        setOpenKeys([result.parentKey])
      }

      // 更新标签页
      setActiveTabKey(currentPath)
      const existingTab = tabs.find(tab => tab.path === currentPath)
      if (!existingTab) {
        setTabs([...tabs, {
          key: currentPath,
          label: result.item.label,
          path: currentPath
        }])
      }
    }
  }, [location.pathname, collapsed])

  // 处理侧边栏折叠状态变化
  useEffect(() => {
    if (collapsed) {
      // 折叠时清空 openKeys
      setOpenKeys([])
    } else {
      // 展开时，如果当前选中的是子菜单，恢复父菜单展开状态
      const currentPath = location.pathname.substring(1)
      const result = findMenuByPath(menuItem, currentPath)
      console.log(result)
      
      if (result && result.parentKey) {
        setOpenKeys([result.parentKey])
      }
    }
  }, [collapsed])

  // 处理菜单点击事件
  const handleMenuClick = ({ key }) => {
    const clickedItem = findMenuItem(menuItem, key)
    if (clickedItem && clickedItem.path) {
      const path = clickedItem.path
      navigate(`/${path}`)

      // 添加标签页（如果不存在）
      const existingTab = tabs.find(tab => tab.path === path)
      if (!existingTab) {
        setTabs([...tabs, {
          key: path,
          label: clickedItem.label,
          path: path
        }])
      }
      setActiveTabKey(path)

      // 如果点击的是一级菜单（不在任何父菜单下），关闭所有展开的父菜单
      const isTopLevelItem = menuItem.some(item => item.key === key && !item.children)
      if (isTopLevelItem) {
        setOpenKeys([])
      }
    }
  }

  // 处理标签页切换
  const handleTabChange = (key) => {
    setActiveTabKey(key)
    navigate(`/${key}`)
  }

  // 处理标签页关闭
  const handleTabRemove = (targetKey) => {
    const targetIndex = tabs.findIndex(tab => tab.key === targetKey)
    const newTabs = tabs.filter(tab => tab.key !== targetKey)

    // 如果关闭的是当前激活的标签页
    if (targetKey === activeTabKey) {
      // 如果还有其他标签页，激活相邻的标签页
      if (newTabs.length > 0) {
        // 优先激活右边的标签页，如果没有则激活左边的
        const newActiveTab = newTabs[targetIndex] || newTabs[targetIndex - 1]
        setActiveTabKey(newActiveTab.key)
        navigate(`/${newActiveTab.path}`)
      }
    }

    setTabs(newTabs)
  }

  // 处理标签页编辑（新增或删除）
  const handleTabEdit = (targetKey, action) => {
    if (action === 'remove') {
      handleTabRemove(targetKey)
    }
  }

  // 处理子菜单展开/收起（实现手风琴效果 - 同一时间只展开一个父菜单）
  const handleOpenChange = (keys) => {
    // 只在非折叠状态下处理展开/收起
    if (!collapsed) {
      // 找出最新打开的父菜单 key
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
      
      // 如果最新打开的是根级父菜单
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        // 不是根级菜单，直接设置
        setOpenKeys(keys)
      } else {
        // 是根级菜单，只保留最新打开的那个（手风琴效果）
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
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
          style={siderStyle}
        >
          <div style={title}>Title</div>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={collapsed ? [] : openKeys}
            onOpenChange={handleOpenChange}
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
          {/* 标签页导航 */}
          <div style={tabsContainer}>
            <Tabs
              size='small'
              type='editable-card'
              hideAdd
              activeKey={activeTabKey}
              onChange={handleTabChange}
              onEdit={handleTabEdit}
              style={tabsStyle}
              items={tabs.map(tab => ({
                key: tab.key,
                label: tab.label,
                closable: tabs.length > 1, // 至少保留一个标签页
              }))}
            />
          </div>
          <Content style={content}>
            <Outlet />
          </Content>
          <Footer style={footer}>
            React Admin©2026
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default Slide