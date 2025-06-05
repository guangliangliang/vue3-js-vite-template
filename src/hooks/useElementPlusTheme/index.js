import { PRE, PRE_DARK, PRE_LIGHT, Levels, WHITE, BLACK } from './config'
import { onBeforeMount } from 'vue'

const html = document.documentElement

/**
 * 混合颜色
 * @param {string} color1 原色
 * @param {string} color2 混合色
 * @param {number} weight 混合比例 0~1
 */
const mix = (color1, color2, weight) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)

  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)

  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)

  const r = Math.round(r1 * (1 - weight) + r2 * weight)
  const g = Math.round(g1 * (1 - weight) + g2 * weight)
  const b = Math.round(b1 * (1 - weight) + b2 * weight)

  const _r = ('0' + r.toString(16)).slice(-2)
  const _g = ('0' + g.toString(16)).slice(-2)
  const _b = ('0' + b.toString(16)).slice(-2)

  return '#' + _r + _g + _b
}

/**
 * 更换主题颜色
 * @param {string} color 主题主色
 */
const changeTheme = (color) => {
  if (!color) {
    console.warn('未获取到颜色的值')
    return
  }

  // 设置主色
  html.style.setProperty(PRE, color)

  // 设置亮色变量
  Levels.forEach((level) => {
    html.style.setProperty(`${PRE_LIGHT}-${level}`, mix(color, WHITE, level * 0.1))
  })

  // 设置暗色变量
  const dark = mix(color, BLACK, 0.2)
  html.style.setProperty(`${PRE_DARK}-2`, dark)
}

/**
 * 使用 Element Plus 主题切换
 * @param {string} color 主色
 */
export function useElementPlusTheme(color) {
  onBeforeMount(() => {
    changeTheme(color)
  })

  return {
    changeTheme
  }
}
