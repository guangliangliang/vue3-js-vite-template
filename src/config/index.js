const baseTitle = import.meta.env.VITE_APP_TITLE
const baseUrl = import.meta.env.VITE_API_BASE_URL
const baseICP = import.meta.env.VITE_APP_ICP
const baseICPURL = import.meta.env.VITE_APP_ICP_URL
const basePSB = import.meta.env.VITE_APP_PSB
const basePSBURL = import.meta.env.VITE_APP_PSB_URL
const prevUrl = import.meta.env.VITE_APP_PRE_URL
const IMAGE_UPLOAD = `${baseUrl}/upload/avatar`
const DEV_FLAG = import.meta.env.MODE === 'development'
const RegistrationConfig = []
if (baseICP) {
  RegistrationConfig.push({
    label: baseICP,
    url: baseICPURL
  })
}
if (basePSB) {
  RegistrationConfig.push({
    label: basePSB,
    url: basePSBURL
  })
}

export { baseTitle, RegistrationConfig, baseICP, IMAGE_UPLOAD, baseUrl, prevUrl, DEV_FLAG }
