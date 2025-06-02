import { ElLoading } from 'element-plus'
import { unref } from 'vue'

const defaultOptions = {
  lock: true,
  text: '加载中...',
  immediate: true
}

export function useLoading(options) {
  let loadingInstance
  const _options = { ...defaultOptions, ...options }

  const loading = (showLoading = true) => {
    if (unref(showLoading)) {
      loadingInstance = ElLoading.service(_options)
    } else if (loadingInstance) {
      loadingInstance.close()
    }
  }

  if (_options.immediate) {
    loading(true)
  }

  return loading
}
