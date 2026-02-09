# ✅ Ant Design Menu 正确的自定义方式

## 🚫 错误方式（不生效）

```jsx
// ❌ styles 属性不支持 itemSelected 和 itemHover
<Menu
  styles={{
    itemSelected: {  // ❌ 这个属性不存在！
      backgroundColor: '#000',
    },
    itemHover: {     // ❌ 这个属性不存在！
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  }}
/>
```

**原因：** 根据[官方文档](https://ant.design/components/menu-cn#semantic-dom)，`styles` 属性只支持这些语义化 DOM 节点：

- `root` - 根元素
- `item` - 菜单项
- `itemIcon` - 图标
- `itemContent` - 内容
- `popup` - 弹出框
- `subMenu.*` - 子菜单相关

**没有** `itemSelected` 和 `itemHover` 这样的属性！

---

## ✅ 正确方式一：使用 ConfigProvider + theme（推荐）

### 完整示例

```jsx
import { Layout, Menu, ConfigProvider } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const { Sider } = Layout

const Slide = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            // 未选中状态
            itemColor: '#ffffff',                    // 文字颜色
            itemBg: '#4b80f9',                      // 背景色
            
            // 选中状态
            itemSelectedColor: '#fff',               // 文字颜色
            itemSelectedBg: '#000000',               // 背景色
            
            // Hover 状态
            itemHoverColor: '#fff',                  // 文字颜色
            itemHoverBg: 'rgba(255, 255, 255, 0.1)', // 背景色
            
            // 其他配置
            itemBorderRadius: 8,                     // 圆角
            itemMarginBlock: 4,                      // 上下外边距
            itemMarginInline: 8,                     // 左右外边距
            iconSize: 16,                            // 图标大小
          },
        },
      }}
    >
      <Sider style={{ backgroundColor: '#4b80f9' }}>
        <Menu 
          mode="inline" 
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Home' }
          ]}
          style={{ backgroundColor: '#4b80f9', border: 'none' }}
        />
      </Sider>
    </ConfigProvider>
  )
}
```

### 优点
- ✅ 官方推荐方式
- ✅ 支持主题变量
- ✅ 类型安全
- ✅ 易于维护

---

## ✅ 正确方式二：使用 CSS 类名覆盖

### JSX 代码

```jsx
import './custom-menu.css'

<Menu
  mode="inline"
  defaultSelectedKeys={['1']}
  items={menuItems}
  className="custom-menu"
/>
```

### CSS 代码

```css
/* custom-menu.css */

/* 菜单整体 */
.custom-menu {
  background-color: #4b80f9 !important;
  border: none !important;
}

/* 未选中的菜单项 */
.custom-menu .ant-menu-item {
  color: #ffffff !important;
  background-color: transparent !important;
  border-radius: 8px;
  margin: 4px 8px;
}

/* 选中的菜单项 */
.custom-menu .ant-menu-item-selected {
  color: #fff !important;
  background-color: #000000 !important;
  font-weight: bold;
}

/* hover 状态 */
.custom-menu .ant-menu-item:hover:not(.ant-menu-item-selected) {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 图标颜色 */
.custom-menu .ant-menu-item .anticon {
  color: #ffffff !important;
}

/* 去掉选中后的蓝色边框 */
.custom-menu .ant-menu-item::after {
  border-right: none !important;
}
```

### 优点
- ✅ 灵活度高
- ✅ 可以精确控制每个细节
- ✅ 适合复杂的自定义需求

### 缺点
- ⚠️ 需要使用 `!important`
- ⚠️ 可能被未来版本的 Ant Design 更新影响

---

## 📊 Design Token 完整列表

根据[官方文档](https://ant.design/components/menu-cn#design-token)，Menu 组件支持的 Design Token：

### 基础样式

| Token | 说明 | 示例值 |
|-------|------|--------|
| `itemColor` | 未选中文字颜色 | `#ffffff` |
| `itemBg` | 未选中背景色 | `#4b80f9` |
| `itemBorderRadius` | 圆角 | `8` |
| `itemHeight` | 菜单项高度 | `40` |
| `itemMarginBlock` | 上下外边距 | `4` |
| `itemMarginInline` | 左右外边距 | `8` |

### 选中状态

| Token | 说明 | 示例值 |
|-------|------|--------|
| `itemSelectedColor` | 选中文字颜色 | `#fff` |
| `itemSelectedBg` | 选中背景色 | `#000000` |

### Hover 状态

| Token | 说明 | 示例值 |
|-------|------|--------|
| `itemHoverColor` | hover文字颜色 | `#fff` |
| `itemHoverBg` | hover背景色 | `rgba(255,255,255,0.1)` |

### 激活状态

| Token | 说明 | 示例值 |
|-------|------|--------|
| `itemActiveBg` | 激活背景色 | `#e6f4ff` |

### 图标

| Token | 说明 | 示例值 |
|-------|------|--------|
| `iconSize` | 图标大小 | `16` |
| `iconMarginInlineEnd` | 图标与文字间距 | `10` |

### 危险项

| Token | 说明 | 示例值 |
|-------|------|--------|
| `dangerItemColor` | 危险项文字颜色 | `#ff4d4f` |
| `dangerItemSelectedBg` | 危险项选中背景 | `#fff2f0` |

---

## 🎯 最佳实践

1. **优先使用 ConfigProvider + theme**
   - 类型安全
   - 易于维护
   - 官方推荐

2. **复杂场景使用 CSS**
   - 需要精确控制时
   - 需要动态效果时

3. **避免混用**
   - 不要同时使用 theme 和大量 CSS 覆盖
   - 保持代码统一性

4. **Key 类型一致**
   - `key` 和 `defaultSelectedKeys` 类型必须一致
   - 推荐统一使用字符串

---

## 🔍 调试技巧

### 1. 检查 Key 是否匹配

```jsx
// 检查控制台
console.log('menuItem keys:', menuItems.map(item => item.key))
console.log('defaultSelectedKeys:', defaultSelectedKeys)

// 确保类型一致
items={[{ key: '1' }]}  // 字符串
defaultSelectedKeys={['1']}  // 字符串数组
```

### 2. 使用浏览器开发者工具

- F12 打开开发者工具
- 检查元素，查看是否有 `ant-menu-item-selected` 类名
- 如果没有，说明 key 没有匹配上

### 3. 检查样式优先级

```jsx
// 如果 theme 不生效，检查是否被其他 CSS 覆盖
// 在浏览器开发者工具的 Elements 面板查看 Computed 样式
```

---

## 📝 完整可运行示例

查看项目文件：
- `src/components/sliderbar.jsx` - ConfigProvider 方式（当前使用）
- `src/styles/custom-menu.css` - CSS 覆盖方式

---

## 🔗 参考资料

- [Menu 组件文档](https://ant.design/components/menu-cn)
- [Menu Design Token](https://ant.design/components/menu-cn#design-token)
- [ConfigProvider 主题定制](https://ant.design/docs/react/customize-theme-cn)
