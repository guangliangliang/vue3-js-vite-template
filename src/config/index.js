const baseTitle = import.meta.env.VITE_APP_TITLE
const baseUrl = import.meta.env.VITE_API_BASE_URL
const prevUrl = import.meta.env.VITE_APP_PRE_URL
const IMAGE_UPLOAD = `${baseUrl}/upload/avatar`
const DEV_FLAG = import.meta.env.MODE === 'development'
export { baseTitle, IMAGE_UPLOAD, baseUrl, prevUrl, DEV_FLAG }
