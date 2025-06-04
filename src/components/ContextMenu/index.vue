<script setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { ref } from 'vue'
import { useDesign } from '@/hooks'

// 设计样式前缀
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('context-menu')

// 事件定义
const emit = defineEmits(['visibleChange'])

// 组件属性定义
const props = defineProps({
  schema: {
    type: Array,
    default: () => []
  },
  trigger: {
    type: String,
    default: 'contextmenu'
  },
  tagItem: {
    type: Object,
    default: () => ({})
  }
})

// 下拉项点击时调用对应 command 方法
const command = (item) => {
  item.command && item.command(item)
}

// 可见性改变时触发事件
const visibleChange = (visible) => {
  emit('visibleChange', visible, props.tagItem)
}

// 下拉组件引用
const elDropdownMenuRef = ref()

// 向父组件暴露属性
defineExpose({
  elDropdownMenuRef,
  tagItem: props.tagItem
})
</script>

<template>
  <ElDropdown
    ref="elDropdownMenuRef"
    :class="prefixCls"
    :trigger="trigger"
    placement="bottom-start"
    @command="command"
    @visible-change="visibleChange"
    popper-class="v-context-menu-popper"
  >
    <slot></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in schema"
          :key="`dropdown${index}`"
          :divided="item.divided"
          :disabled="item.disabled"
          :command="item"
        >
          <Icon :icon="item.icon" /> {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
