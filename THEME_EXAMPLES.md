# 🎨 主题配置封装示例

## 📋 已创建的文件

```
src/theme/
├── index.js           # 完整主题配置（包含所有组件）
├── menu.theme.js      # Menu 组件主题（支持多种预设）
└── README.md          # 详细使用文档
```

---

## 🚀 快速开始

### 方式 1：在 App.jsx 中全局使用（推荐）

```jsx
// src/App.jsx
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from '@/router/router.jsx'
import antdTheme from '@/theme'  // 导入主题配置

const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
```

**优点：**
- ✅ 全局生效，所有组件统一风格
- ✅ 只需配置一次
- ✅ 易于维护

---

### 方式 2：在组件中局部使用

```jsx
// src/components/sliderbar.jsx
import { Layout, Menu, ConfigProvider } from 'antd'
import { menuTheme } from '@/theme'  // 只导入 Menu 主题

const Slide = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: menuTheme,  // 只配置 Menu 组件
        },
      }}
    >
      <Sider>
        <Menu items={menuItems} />
      </Sider>
    </ConfigProvider>
  )
}
```

**优点：**
- ✅ 灵活，可以针对特定组件定制
- ✅ 不影响其他组件

---

### 方式 3：支持主题切换

```jsx
// src/components/sliderbar.jsx
import { useState } from 'react'
import { Layout, Menu, ConfigProvider, Switch } from 'antd'
import { getMenuTheme } from '@/theme/menu.theme'

const Slide = () => {
  const [currentTheme, setCurrentTheme] = useState('blue')
  
  return (
    <>
      <div style={{ padding: '10px' }}>
        <span>主题切换: </span>
        <Switch 
          checkedChildren="深色" 
          unCheckedChildren="浅色"
          onChange={(checked) => setCurrentTheme(checked ? 'dark' : 'light')}
        />
      </div>
      
      <ConfigProvider
        theme={{
          components: {
            Menu: getMenuTheme(currentTheme),
          },
        }}
      >
        <Sider>
          <Menu items={menuItems} />
        </Sider>
      </ConfigProvider>
    </>
  )
}
```

**支持的主题：**
- `blue` - 蓝色主题（默认）
- `dark` - 深色主题
- `light` - 浅色主题
- `gradient` - 渐变主题

---

## 🎨 预设主题预览

### Blue 主题（当前使用）
```js
{
  itemColor: '#ffffff',
  itemBg: '#4b80f9',
  itemSelectedBg: '#000000',
  itemHoverBg: 'rgba(255, 255, 255, 0.1)',
}
```

### Dark 主题
```js
{
  itemColor: 'rgba(255, 255, 255, 0.65)',
  itemBg: '#001529',
  itemSelectedBg: '#1677ff',
  itemHoverBg: 'rgba(255, 255, 255, 0.08)',
}
```

### Light 主题
```js
{
  itemColor: '#333333',
  itemBg: '#ffffff',
  itemSelectedBg: '#e6f7ff',
  itemHoverBg: '#f5f5f5',
}
```

---

## 🔧 自定义主题

### 1. 修改现有主题

编辑 `src/theme/menu.theme.js`：

```js
export const blueMenuTheme = {
  itemSelectedBg: '#ff0000',  // 改成红色
  itemBorderRadius: 12,       // 改成 12px 圆角
  // ...
}
```

### 2. 添加新主题

```js
// src/theme/menu.theme.js

// 添加绿色主题
export const greenMenuTheme = {
  itemColor: '#ffffff',
  itemBg: '#52c41a',
  itemSelectedColor: '#fff',
  itemSelectedBg: '#237804',
  itemHoverBg: 'rgba(255, 255, 255, 0.1)',
  itemBorderRadius: 8,
  itemMarginBlock: 4,
  itemMarginInline: 8,
  iconSize: 16,
}

// 更新 getMenuTheme 函数
export const getMenuTheme = (themeName = 'blue') => {
  const themes = {
    blue: blueMenuTheme,
    dark: darkMenuTheme,
    light: lightMenuTheme,
    green: greenMenuTheme,  // 新增
  }
  return themes[themeName] || blueMenuTheme
}
```

---

## 🌟 高级用法

### 全局主题切换（使用 Context）

#### 1. 创建 ThemeContext

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState, useContext } from 'react'
import { ConfigProvider } from 'antd'
import antdTheme from '@/theme'
import { getMenuTheme } from '@/theme/menu.theme'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [menuTheme, setMenuTheme] = useState('blue')
  
  const theme = {
    ...antdTheme,
    components: {
      ...antdTheme.components,
      Menu: getMenuTheme(menuTheme),
    },
  }
  
  return (
    <ThemeContext.Provider value={{ menuTheme, setMenuTheme }}>
      <ConfigProvider theme={theme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

#### 2. 在入口使用

```jsx
// src/main.jsx
import { ThemeProvider } from '@/context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

#### 3. 在任何组件中切换

```jsx
// src/components/ThemeSwitcher.jsx
import { useTheme } from '@/context/ThemeContext'
import { Radio } from 'antd'

const ThemeSwitcher = () => {
  const { menuTheme, setMenuTheme } = useTheme()
  
  return (
    <Radio.Group value={menuTheme} onChange={(e) => setMenuTheme(e.target.value)}>
      <Radio.Button value="blue">蓝色</Radio.Button>
      <Radio.Button value="dark">深色</Radio.Button>
      <Radio.Button value="light">浅色</Radio.Button>
      <Radio.Button value="gradient">渐变</Radio.Button>
    </Radio.Group>
  )
}
```

---

## 📊 对比：封装前 vs 封装后

### ❌ 封装前（不推荐）

```jsx
// 每个组件都要写一遍配置
const Slide = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemColor: '#ffffff',
            itemBg: '#4b80f9',
            itemSelectedColor: '#fff',
            itemSelectedBg: '#000000',
            itemHoverColor: '#fff',
            itemHoverBg: 'rgba(255, 255, 255, 0.1)',
            itemBorderRadius: 8,
            // ... 很多配置
          },
        },
      }}
    >
      <Menu />
    </ConfigProvider>
  )
}
```

**问题：**
- ❌ 代码冗余
- ❌ 难以维护
- ❌ 不易复用
- ❌ 修改麻烦

---

### ✅ 封装后（推荐）

```jsx
import antdTheme from '@/theme'

const Slide = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Menu />
    </ConfigProvider>
  )
}
```

**优点：**
- ✅ 代码简洁
- ✅ 统一管理
- ✅ 易于复用
- ✅ 修改方便（只需修改一个文件）

---

## 📝 项目结构建议

```
src/
├── theme/                    # 主题配置
│   ├── index.js             # 完整主题配置
│   ├── menu.theme.js        # Menu 主题
│   ├── button.theme.js      # Button 主题（可选）
│   ├── table.theme.js       # Table 主题（可选）
│   └── README.md            # 文档
│
├── context/                  # 上下文
│   └── ThemeContext.jsx     # 主题上下文（可选）
│
├── components/               # 组件
│   ├── sliderbar.jsx
│   └── ThemeSwitcher.jsx    # 主题切换器（可选）
│
└── App.jsx                   # 在这里使用 ConfigProvider
```

---

## 💡 最佳实践

1. **统一管理**：所有主题配置放在 `src/theme/` 目录
2. **按需导入**：只导入需要的主题配置
3. **颜色变量**：使用统一的颜色变量，便于修改
4. **模块化**：按组件拆分主题文件
5. **全局优先**：优先在 App.jsx 中全局配置
6. **文档齐全**：保持 README.md 更新

---

## 🔗 相关文档

查看 `src/theme/README.md` 获取更详细的使用说明。
