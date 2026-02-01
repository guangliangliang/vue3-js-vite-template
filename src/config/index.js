const baseTitle = import.meta.env.VITE_APP_TITLE
const baseUrl = import.meta.env.VITE_API_BASE_URL
const baseICP = import.meta.env.VITE_APP_ICP
const basePSB = import.meta.env.VITE_APP_PSB
const prevUrl = import.meta.env.VITE_APP_PRE_URL
const IMAGE_UPLOAD = `${baseUrl}/upload/avatar`
const DEV_FLAG = import.meta.env.MODE === 'development'
const RegistrationConfig = []
if (baseICP) {
  RegistrationConfig.push({
    label: baseICP,
    url: 'https://beian.miit.gov.cn/'
  })
}
if (basePSB) {
  RegistrationConfig.push({
    label: basePSB,
    url: `https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${basePSB}`
  })
}

export { baseTitle, RegistrationConfig, baseICP, IMAGE_UPLOAD, baseUrl, prevUrl, DEV_FLAG }
