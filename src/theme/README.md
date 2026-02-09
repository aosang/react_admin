# 主题配置使用指南

## 📁 文件结构

```
src/theme/
├── index.js           # 完整的主题配置（推荐）
├── menu.theme.js      # Menu 组件主题配置（细粒度管理）
└── README.md          # 使用文档
```

---

## 🎨 使用方式

### 方式一：使用完整主题配置（推荐）

适合整个应用统一主题风格。

#### 1. 在根组件使用

```jsx
// src/App.jsx
import { ConfigProvider } from 'antd'
import antdTheme from '@/theme'

const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      {/* 你的应用 */}
    </ConfigProvider>
  )
}

export default App
```

#### 2. 在局部组件使用

```jsx
// src/components/sliderbar.jsx
import { Layout, Menu, ConfigProvider } from 'antd'
import antdTheme from '@/theme'

const Slide = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Layout>
        <Sider>
          <Menu items={menuItems} />
        </Sider>
      </Layout>
    </ConfigProvider>
  )
}
```

---

### 方式二：只使用 Menu 主题配置

适合只需要自定义 Menu 组件的场景。

```jsx
// src/components/sliderbar.jsx
import { Layout, Menu, ConfigProvider } from 'antd'
import { blueMenuTheme } from '@/theme/menu.theme'

const Slide = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: blueMenuTheme,
        },
      }}
    >
      <Layout>
        <Sider>
          <Menu items={menuItems} />
        </Sider>
      </Layout>
    </ConfigProvider>
  )
}
```

---

### 方式三：动态切换主题

```jsx
import { useState } from 'react'
import { ConfigProvider, Switch } from 'antd'
import { getMenuTheme } from '@/theme/menu.theme'

const Slide = () => {
  const [themeName, setThemeName] = useState('blue')
  
  return (
    <>
      <Switch 
        checkedChildren="深色" 
        unCheckedChildren="浅色"
        onChange={(checked) => setThemeName(checked ? 'dark' : 'light')}
      />
      
      <ConfigProvider
        theme={{
          components: {
            Menu: getMenuTheme(themeName),
          },
        }}
      >
        <Menu items={menuItems} />
      </ConfigProvider>
    </>
  )
}
```

---

## 🔧 修改主题配置

### 1. 修改全局变量

```js
// src/theme/index.js
const colors = {
  primary: '#4b80f9',      // 改成你的主色
  primaryDark: '#2460e8',  // 改成你的深色
  // ...
}
```

### 2. 修改 Menu 配置

```js
// src/theme/menu.theme.js
export const blueMenuTheme = {
  itemSelectedBg: '#000000',  // 修改选中背景色
  itemBorderRadius: 12,       // 修改圆角大小
  // ...
}
```

### 3. 添加新的主题

```js
// src/theme/menu.theme.js

// 添加紫色主题
export const purpleMenuTheme = {
  itemColor: '#ffffff',
  itemBg: '#722ed1',
  itemSelectedColor: '#fff',
  itemSelectedBg: '#531dab',
  itemHoverColor: '#fff',
  itemHoverBg: 'rgba(255, 255, 255, 0.1)',
  itemBorderRadius: 8,
  itemMarginBlock: 4,
  itemMarginInline: 8,
  iconSize: 16,
}

// 在 getMenuTheme 中添加
export const getMenuTheme = (themeName = 'blue') => {
  const themes = {
    blue: blueMenuTheme,
    dark: darkMenuTheme,
    light: lightMenuTheme,
    purple: purpleMenuTheme,  // 新增
  }
  return themes[themeName] || blueMenuTheme
}
```

---

## 📝 完整示例

### 示例 1：在 App.jsx 中全局使用

```jsx
// src/App.jsx
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from '@/router/router.jsx'
import antdTheme from '@/theme'

const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
```

### 示例 2：在 Sidebar 中局部使用

```jsx
// src/components/sliderbar.jsx
import { Layout, Menu, ConfigProvider } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { menuTheme } from '@/theme'

const { Sider } = Layout

const menuItems = [
  { key: '1', icon: <HomeOutlined />, label: 'Home' }
]

const Slide = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: menuTheme,
        },
      }}
    >
      <Layout>
        <Sider style={{ backgroundColor: '#4b80f9' }}>
          <Menu 
            mode="inline" 
            defaultSelectedKeys={['1']}
            items={menuItems}
            style={{ backgroundColor: '#4b80f9', border: 'none' }}
          />
        </Sider>
      </Layout>
    </ConfigProvider>
  )
}

export default Slide
```

### 示例 3：结合 Context 实现全局主题切换

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState, useContext } from 'react'
import { ConfigProvider } from 'antd'
import { getMenuTheme } from '@/theme/menu.theme'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('blue')
  
  const theme = {
    components: {
      Menu: getMenuTheme(themeName),
    },
  }
  
  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ConfigProvider theme={theme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

```jsx
// src/main.jsx
import { ThemeProvider } from '@/context/ThemeContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

```jsx
// 在任何组件中使用
import { useTheme } from '@/context/ThemeContext'

const SomeComponent = () => {
  const { themeName, setThemeName } = useTheme()
  
  return (
    <button onClick={() => setThemeName('dark')}>
      切换到深色主题
    </button>
  )
}
```

---

## 🎯 最佳实践

1. **全局主题**：在 `App.jsx` 或 `main.jsx` 中使用
2. **局部覆盖**：在特定组件中覆盖部分主题
3. **变量管理**：使用 `colors` 对象统一管理颜色
4. **模块化**：按组件拆分主题配置文件
5. **类型安全**：考虑使用 TypeScript 定义主题类型

---

## 🔗 相关文档

- [Ant Design 主题定制](https://ant.design/docs/react/customize-theme-cn)
- [Menu Design Token](https://ant.design/components/menu-cn#design-token)
- [ConfigProvider API](https://ant.design/components/config-provider-cn)
