<template>
  <div class="o-form-wrap" :class="{ 'mb-20': showFooter }">
    <el-card>
      <template v-if="title" #header>
        <div class="header-wrap">
          <span>{{ title }}</span>
          <slot name="header-right" />
        </div>
      </template>

      <slot />
    </el-card>

    <footer v-if="showFooter" class="form-btn-warp" :style="footerLeftStyle">
      <el-button v-if="showCancel" class="w-25" @click="$router.back()">返 回</el-button>
      <el-button
        v-if="showConfirm"
        class="w-25 ml-4"
        type="primary"
        :loading="loading"
        @click="onConfirm"
      >
        {{ confirmText }}
      </el-button>
      <slot name="footer-btn" />
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { throttle } from 'lodash-es'
import { useLayoutStore } from '@/stores'

// props
defineOptions({ name: 'OFormWrap' })

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  showRightBtn: {
    type: Boolean,
    default: true
  },
  throttleTime: {
    type: Number,
    default: 1000
  }
})

const emit = defineEmits(['confirm'])

const loading = ref(false)
const layoutStore = useLayoutStore()

const footerLeftStyle = computed(() => {
  return {
    left: layoutStore.mobile ? '10px' : layoutStore.collapse ? '74px' : '230px'
  }
})

const onConfirm = throttle(() => {
  if (!loading.value) {
    emit('confirm', (val = false) => {
      loading.value = val
    })
  }
}, props.throttleTime)
</script>

<style lang="scss" scoped>
.o-form-wrap {
  margin-bottom: 0.625rem;
  position: relative;

  &.mb-20 {
    margin-bottom: 5rem;
  }
}

.header-wrap {
  display: flex;
  justify-content: space-between;
}

.el-card {
  :deep(.el-card__header) {
    color: var(--el-color-primary);
    font-size: 16px;
    font-weight: 700;
    line-height: 2em;
  }
}

.form-btn-warp {
  backface-visibility: hidden;
  background-color: white;
  border-radius: 4px;
  bottom: 0;
  box-shadow: 0 1px 12px 0 rgb(0 0 0 / 5%);
  padding: 20px;
  perspective: none;
  position: fixed;
  right: 0;
  transition: 0.3s ease-in-out;
  width: 100%;
  z-index: 4;

  .w-25 {
    width: 6.25rem;
  }

  .ml-4 {
    margin-left: 1rem;
  }
}

html.dark {
  .form-btn-warp {
    background-color: var(--el-bg-color-overlay);
  }
}
</style>
