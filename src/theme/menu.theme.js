/**
 * Menu 组件主题配置（更细粒度的管理）
 * 可以根据不同场景导出不同的菜单主题
 */

// 默认蓝色主题
export const blueMenuTheme = {
  itemColor: '#ffffff',
  itemBg: '#4b80f9',
  itemSelectedColor: '#fff',
  itemSelectedBg: '#2c6ff1',
  itemHoverColor: '#fff',
  itemHoverBg: 'rgba(255, 255, 255, 0.1)',
  itemBorderRadius: 8,
  itemMarginBlock: 4,
  itemMarginInline: 8,
  iconSize: 16,
}

// 深色主题
export const darkMenuTheme = {
  itemColor: 'rgba(255, 255, 255, 0.65)',
  itemBg: '#001529',
  itemSelectedColor: '#fff',
  itemSelectedBg: '#1677ff',
  itemHoverColor: '#fff',
  itemHoverBg: 'rgba(255, 255, 255, 0.08)',
  itemBorderRadius: 8,
  itemMarginBlock: 4,
  itemMarginInline: 8,
  iconSize: 16,
}

// 浅色主题
export const lightMenuTheme = {
  itemColor: '#333333',
  itemBg: '#ffffff',
  itemSelectedColor: '#1677ff',
  itemSelectedBg: '#e6f7ff',
  itemHoverColor: '#1677ff',
  itemHoverBg: '#f5f5f5',
  itemBorderRadius: 8,
  itemMarginBlock: 4,
  itemMarginInline: 8,
  iconSize: 16,
}

// 渐变主题
export const gradientMenuTheme = {
  itemColor: '#ffffff',
  itemBg: 'transparent', // 需要在 Sider 上设置渐变背景
  itemSelectedColor: '#fff',
  itemSelectedBg: 'rgba(255, 255, 255, 0.2)',
  itemHoverColor: '#fff',
  itemHoverBg: 'rgba(255, 255, 255, 0.1)',
  itemBorderRadius: 8,
  itemMarginBlock: 4,
  itemMarginInline: 8,
  iconSize: 16,
}

// 根据主题名称获取配置
export const getMenuTheme = (themeName = 'blue') => {
  const themes = {
    blue: blueMenuTheme,
    dark: darkMenuTheme,
    light: lightMenuTheme,
    gradient: gradientMenuTheme,
  }
  return themes[themeName] || blueMenuTheme
}

export default blueMenuTheme