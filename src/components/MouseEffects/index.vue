<template>
  <canvas
    ref="canvasRef"
    class="colorful-trail-effect"
    :style="{
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: zIndex
    }"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

defineOptions({ name: 'MouseEffects' })

// 组件属性
const props = defineProps({
  // 粒子数量
  particleCount: {
    type: Number,
    default: 200
  },
  // 粒子颜色数组（七彩颜色）
  particleColors: {
    type: Array,
    default: () => [
      'rgba(255, 0, 0, 1)', // 红色
      'rgba(255, 127, 0, 1)', // 橙色
      'rgba(255, 255, 0, 1)', // 黄色
      'rgba(0, 255, 0, 1)', // 绿色
      'rgba(0, 0, 255, 1)', // 蓝色
      'rgba(75, 0, 130, 1)', // 靛蓝色
      'rgba(148, 0, 211, 1)' // 紫色
    ]
  },
  // 粒子大小范围（较小的点）
  minSize: {
    type: Number,
    default: 1
  },
  maxSize: {
    type: Number,
    default: 3
  },
  // 粒子生命周期（1秒后自动消失）
  particleLifetime: {
    type: Number,
    default: 1000
  },
  // 轨迹长度（星星效果，轨迹较短）
  trailLength: {
    type: Number,
    default: 20
  },
  // 粒子速度（星星效果，跟随速度适中）
  particleSpeed: {
    type: Number,
    default: 0.5
  },
  // 粒子扩散范围（星星效果，扩散较小）
  spreadRange: {
    type: Number,
    default: 10
  },
  // 层级
  zIndex: {
    type: Number,
    default: 9999
  }
})

const canvasRef = ref(null)
let canvas = null
let ctx = null
let particles = []
let animationId = null
let mouse = { x: 0, y: 0 }
let lastMouse = { x: 0, y: 0 }
let mouseTrail = []

// 粒子类
class Particle {
  constructor() {
    // 从鼠标轨迹中随机选择一个位置作为起点
    const trailPoint = mouseTrail[Math.floor(Math.random() * mouseTrail.length)] || mouse
    this.x = trailPoint.x + (Math.random() - 0.5) * props.spreadRange
    this.y = trailPoint.y + (Math.random() - 0.5) * props.spreadRange

    // 初始速度
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * props.particleSpeed
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed

    // 大小和颜色
    this.size = Math.random() * (props.maxSize - props.minSize) + props.minSize
    this.color = props.particleColors[Math.floor(Math.random() * props.particleColors.length)]

    // 生命周期
    this.life = 0
    this.maxLife = props.particleLifetime
    this.alpha = 1

    // 光晕强度
    this.glowIntensity = Math.random() * 0.5 + 0.5
  }

  update() {
    // 更新生命周期
    this.life += 16 // 假设60fps，每帧增加约16ms
    if (this.life >= this.maxLife) {
      return false // 生命周期结束
    }

    // 计算透明度衰减，使用缓动函数使衰减更自然
    const lifeRatio = this.life / this.maxLife
    this.alpha = 1 - Math.pow(lifeRatio, 2) // 二次衰减，前期保持较高透明度

    // 更新位置
    this.x += this.vx
    this.y += this.vy

    // 速度衰减
    this.vx *= 0.98
    this.vy *= 0.98

    // 边界检测，超出屏幕范围50像素后自动删除
    const margin = 50
    if (
      this.x < -margin ||
      this.x > canvas.width + margin ||
      this.y < -margin ||
      this.y > canvas.height + margin
    ) {
      return false // 超出范围，删除粒子
    }

    return true // 继续存活
  }

  draw() {
    ctx.save()

    // 设置透明度
    ctx.globalAlpha = this.alpha

    // 绘制粒子光晕
    const glowRadius = this.size * (2 + this.glowIntensity)
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius)
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(0.5, this.color.replace('1)', `${this.alpha * 0.3})`))
    gradient.addColorStop(1, this.color.replace('1)', '0)'))

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)
    ctx.fill()

    // 绘制粒子本体
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.alpha * 0.8
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

// 初始化画布
const initCanvas = () => {
  canvas = canvasRef.value
  if (!canvas) return

  // 设置画布大小
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  ctx = canvas.getContext('2d')

  // 初始化粒子和轨迹
  particles = []
  mouseTrail = []
}

// 更新鼠标位置
const updateMousePosition = (e) => {
  lastMouse.x = mouse.x
  lastMouse.y = mouse.y
  mouse.x = e.clientX
  mouse.y = e.clientY

  // 更新鼠标轨迹
  mouseTrail.push({ x: mouse.x, y: mouse.y })

  // 限制轨迹长度
  if (mouseTrail.length > props.trailLength) {
    mouseTrail.shift()
  }

  // 生成新粒子
  const particlesToAdd = Math.floor(Math.random() * 3) + 1 // 每次鼠标移动生成1-3个粒子
  for (let i = 0; i < particlesToAdd; i++) {
    if (particles.length < props.particleCount) {
      particles.push(new Particle())
    }
  }
}

// 动画循环
const animate = () => {
  // 清除画布，不影响页面背景
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles = particles.filter((particle) => {
    return particle.update()
  })

  particles.forEach((particle) => {
    particle.draw()
  })

  animationId = requestAnimationFrame(animate)
}

// 监听属性变化，重新初始化粒子
watch(
  () => [props.particleCount, props.particleColors, props.minSize, props.maxSize],
  () => {
    initCanvas()
  }
)

// 组件挂载
onMounted(() => {
  initCanvas()
  window.addEventListener('mousemove', updateMousePosition)
  animate()
})

// 组件卸载
onUnmounted(() => {
  window.removeEventListener('resize', () => {})
  window.removeEventListener('mousemove', updateMousePosition)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.colorful-trail-effect {
  display: block;
}
</style>
