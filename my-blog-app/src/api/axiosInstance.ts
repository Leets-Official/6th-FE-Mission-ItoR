import axios, { type AxiosRequestHeaders } from 'axios'

/**
 * Axios 기본 설정
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
})

/**
 * 요청 인터셉터
 * - localStorage에서 JWT 토큰을 자동으로 읽어와 Authorization 헤더에 추가
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      // config.headers가 undefined일 경우를 대비
      if (!config.headers) config.headers = {} as AxiosRequestHeaders
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('📤 [Request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    })

    return config
  },
  (error) => {
    console.error('❌ [Request Error]', error)
    return Promise.reject(error)
  },
)

/**
 * 응답 인터셉터
 */
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('📥 [Response]', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    })
    return response
  },
  (error) => {
    console.error('❌ [Response Error]', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
    })
    return Promise.reject(error)
  },
)

export default axiosInstance
