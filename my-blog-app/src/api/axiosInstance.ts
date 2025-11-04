import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://blog.leets.land',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json', // 추가
  },
  withCredentials: false, // 세션 쿠키 사용 안 할 경우 false
})

// 요청/응답 로깅 (디버깅용, 필요 시 제거 가능)
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
