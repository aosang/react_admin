/**
 * Ant Design 主题配置
 * 统一管理所有组件的主题样式
 */

// 颜色变量
const colors = {
  primary: '#4b80f9',
  primaryDark: '#2460e8',
  white: '#fff',
  activeBlue: '#2c6ff1',
  textPrimary: 'rgba(0, 0, 0, 0.88)',
  textSecondary: 'rgba(0, 0, 0, 0.65)',
  border: '#d9d9d9',
}

// Menu 组件主题配置
export const menuTheme = {
  // 未选中状态
  itemColor: colors.white,           // 文字颜色
  itemBg: colors.primary,            // 背景色
  
  // 选中状态
  itemSelectedColor: colors.white,   // 文字颜色
  itemSelectedBg: colors.activeBlue,      // 背景色
  
  // Hover 状态
  itemHoverColor: colors.white,      // 文字颜色
  itemHoverBg: 'rgba(255, 255, 255, 0.1)', // 背景色（半透明）
  
  // 激活状态
  itemActiveBg: 'rgba(255, 255, 255, 0.15)',
  
  // 布局相关
  itemBorderRadius: 8,               // 圆角
  itemHeight: 40,                    // 高度
  itemMarginBlock: 4,                // 上下外边距
  itemMarginInline: 8,               // 左右外边距
  itemPaddingInline: 16,             // 左右内边距
  
  // 图标相关
  iconSize: 16,                      // 图标大小
  iconMarginInlineEnd: 10,           // 图标与文字间距
  
  // 子菜单
  subMenuItemBg: 'rgba(0, 0, 0, 0.02)',
  
  // 禁用状态
  itemDisabledColor: 'rgba(255, 255, 255, 0.25)',
}

// Button 组件主题配置（示例）
export const buttonTheme = {
  colorPrimary: colors.primary,
  algorithm: true,
}

// 完整的主题配置对象
export const antdTheme = {
  token: {
    // 全局 Token
    colorPrimary: colors.primary,
    borderRadius: 8,
    colorBgContainer: colors.white,
  },
  components: {
    // Menu 组件
    Menu: menuTheme,
  }
}

// 导出默认配置
export default antdTheme
