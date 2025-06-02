<template>
  <o-form-wrap title="用户管理" @confirm="onConfirm">
    <el-form
      ref="ruleForm"
      class="form-w-70"
      :model="formData"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :disabled="isEditing" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item v-if="!isEditing" label="默认密码" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入默认密码" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属角色：" prop="role_ids">
        <o-select
          v-model="formData.role_ids"
          multiple
          :options="roleOptions"
          option-key="role_option"
          placeholder="请选择所属角色"
        />
      </el-form-item>
      <el-form-item label="用户头像：">
        <el-upload
          ref="upload"
          class="upload-wrapper"
          :action="`${baseURL}/file/upload`"
          :headers="headers"
          :limit="1"
          :show-file-list="false"
          :on-success="onAvatarSuccess"
          :on-exceed="onExceed"
        >
          <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
          <el-icon v-else><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
  </o-form-wrap>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { createUser, getUserInfo, updateUser } from '@/api/system/user'
import { getToken } from '@/utils/auth'
import { elv } from '@/utils/elValidation'
import { roleOptions } from '@/views/system/user/config'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const usestore = useUserStore()

    const avatar = ref('')
    const isEditing = ref(false)

    const id = route.params.id
    const headers = {
      'X-TOKEN': getToken()
    }

    isEditing.value = id ? true : false

    const upload = ref(null)
    const ruleForm = ref(null)
    const formData = reactive({
      sex: '男',
      name: '',
      avatar: '',
      mobile: '',
      password: '',
      role_ids: []
    })
    const formRules = reactive({
      name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
      mobile: [{ required: true, validator: elv.isMobile(), trigger: 'blur' }],
      password: [{ required: true, message: '请输入默认密码', trigger: 'blur' }],
      role_ids: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
    })

    const userInfo = async () => {
      const info = await getUserInfo(+id)
      Object.assign(formData, info)
    }

    const onAvatarSuccess = (response, uploadFile) => {
      formData.avatar = response.data.url
      avatar.value = URL.createObjectURL(uploadFile.raw)
    }

    const onExceed = (files, uploadFiles) => {
      upload.value.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      upload.value.handleStart(file)

      const fileRaw = uploadFiles[0].raw
      avatar.value = URL.createObjectURL(fileRaw)

      upload.value.submit()
    }

    const onConfirm = () => {
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          if (isEditing.value) {
            await updateUser(formData)
            ElMessage.success('编辑成功')
            if (usestore.user.id === formData.id) {
              usestore.getUser()
            }
          } else {
            await createUser(formData)
            ElMessage.success('添加成功')
          }

          router.back()
        } else {
          return false
        }
      })
    }

    onBeforeMount(() => {
      if (isEditing.value) userInfo()
    })

    return {
      upload,
      roleOptions,
      ruleForm,
      formData,
      formRules,
      isEditing,
      headers,
      onAvatarSuccess,
      onExceed,
      onConfirm,
      baseURL
    }
  }
}
</script>

<style lang="scss" scoped>
.form-w-70 {
  width: 70%;
}

.upload-wrapper {
  align-items: center;
  border: 1px dashed var(--el-color-border);
  border-radius: 0.375rem; /* 1.5 * 0.25rem */
  box-sizing: border-box;
  display: flex;
  height: 8.75rem;
  justify-content: center;
  width: 8.75rem; /* 35 * 0.25rem */
}

.avatar {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
}
</style>
