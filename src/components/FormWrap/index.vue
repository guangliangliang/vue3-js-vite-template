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
      <el-button v-if="showCancel" class="w-25" @click="$router.back()"> 返 回 </el-button>
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

<script>
import { ref, computed } from 'vue'
import { throttle } from 'lodash-es'
import { makeNumberProp, makeStringProp, truthProp } from '@/utils/props'
import { useLayoutStore } from '@/stores'

export default {
  name: 'OFormWrap',
  props: {
    title: makeStringProp(''),
    showFooter: truthProp,
    showCancel: truthProp,
    cancelText: makeStringProp('取消'),
    showConfirm: truthProp,
    confirmText: makeStringProp('确认'),
    showRightBtn: truthProp,
    throttleTime: makeNumberProp(1000)
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    const layoutStore = useLayoutStore()
    const loading = ref(false)

    const footerLeftStyle = computed(() => {
      return {
        left: layoutStore.isCollapse ? '74px' : '230px'
      }
    })

    const onConfirm = throttle(() => {
      if (!loading.value) {
        emit('confirm', (value = false) => {
          loading.value = value
        })
      }
    }, props.throttleTime)

    return {
      loading,
      onConfirm,
      footerLeftStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.o-form-wrap {
  margin-bottom: 0.625rem; // 2.5 * 0.25rem
  position: relative;

  &.mb-20 {
    margin-bottom: 5rem; // 20 * 0.25rem
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
  background-color: #fff;
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
    width: 6.25rem; // 25 * 0.25rem
  }

  .ml-4 {
    margin-left: 1rem; // 4 * 0.25rem
  }
}
</style>
