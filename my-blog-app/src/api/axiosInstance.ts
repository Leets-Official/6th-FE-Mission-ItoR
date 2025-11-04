import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
})

// 요청/응답 로깅 (디버깅용)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 [Request]', config.method?.toUpperCase(), config.url, config.data)
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ [Response Error]', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default axiosInstance
