<template>
  <el-card v-if="searchList.length > 0" class="search-card">
    <el-form ref="formRef" :model="form" label-position="top" :inline="true">
      <template v-for="item in searchList" :key="item.id">
        <template v-if="item.type === 'complex'">
          <el-form-item
            v-for="(autocomplete, $index) in item.children"
            :key="autocomplete.id"
            class="complex"
            :label="item.name"
            :prop="item.id"
          >
            <o-select
              v-model="form[autocomplete.id]"
              :loading="loading"
              :placeholder="item.hint"
              :options="item.options"
            />
          </el-form-item>
        </template>

        <el-form-item v-else :label="item.name" :prop="item.id">
          <!-- 文本输入 -->
          <el-input
            v-if="item.type === 'text'"
            v-model="form[item.id]"
            clearable
            :placeholder="item.hint"
          />

          <!-- 下拉选择 -->
          <o-select
            v-else-if="item.type === 'select' || item.type === 'multi_select'"
            v-model="form[item.id]"
            :multiple="item.multi_select"
            :placeholder="item.hint"
            :collapse-tags="item.type === 'multi_select'"
            :options="item.options"
          />

          <!-- 远程搜索下拉 -->
          <o-select
            v-else-if="item.type === 'auto_complete'"
            v-model="form[item.id]"
            :multiple="item.multi_select"
            :search-key="item.id"
            :options="item.options"
            remote-show-suffix
            :placeholder="item.hint"
          />

          <!-- 日期 -->
          <el-date-picker
            v-if="item.type === 'date' || item.type === 'date_time'"
            v-model="form[item.id]"
            :type="item.type === 'date' ? 'date' : 'datetime'"
            value-format="YYYY-MM-DD"
            :placeholder="item.hint"
          />

          <!-- 日期/时间范围 -->
          <el-date-picker
            v-else-if="item.type === 'time_range' || item.type === 'date_range'"
            v-model="form[item.id]"
            :type="item.type === 'time_range' ? 'datetimerange' : 'daterange'"
            :start-placeholder="item.hint"
            :end-placeholder="item.hint"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </template>

      <div class="button-group">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">查询</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { cloneDeep, omit } from 'lodash-es'
import { useSearchStore } from '@/stores'

defineOptions({ name: 'OSearch' })

const emit = defineEmits(['search'])

defineProps({
  loading: Boolean
})

const formRef = ref(null)
const form = reactive({})
const searchStore = useSearchStore()

const searchList = computed(() => searchStore.searchList)

const submitForm = () => {
  let result = cloneDeep(form)
  Object.keys(result).forEach((key) => {
    const val = result[key]
    if (!val && val !== 0) {
      result = omit(result, key)
    }
  })
  emit('search', result)
}

const resetForm = () => {
  formRef.value?.resetFields()
  submitForm()
}
</script>

<style lang="scss" scoped>
.search-card {
  margin-bottom: 10px;
}

.button-group {
  align-items: flex-end;
  display: flex;
  margin-bottom: 10px;
}

.el-form.el-form--label-top {
  .el-form-item {
    margin-bottom: 10px;
    margin-right: 20px;
  }

  .el-form-item,
  .el-date-editor .el-input__wrapper {
    width: 255px !important;
  }
}
</style>
