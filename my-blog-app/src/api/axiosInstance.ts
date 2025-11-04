import axios from 'axios'

/**
 * Axios 기본 설정
 * - baseURL: .env 환경변수 (VITE_API_BASE_URL)
 * - Content-Type: JSON
 * - withCredentials: false (쿠키 인증이 필요 없을 경우)
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
})

/**
 * 요청 인터셉터
 * - localStorage에서 JWT 토큰을 자동으로 읽어와 Authorization 헤더에 추가
 * - 모든 요청 시 콘솔 로깅 (디버깅용)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
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
 * - 성공 응답 시 상태코드, URL, 데이터 로깅
 * - 실패 응답 시 에러 메시지 및 응답 내용 로깅
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
